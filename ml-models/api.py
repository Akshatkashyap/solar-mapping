from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import numpy as np
import pandas as pd
import os
import sys
from datetime import datetime, timedelta
import json

# Add the models directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from random_forest_model import SolarRandomForestModel
    from lstm_model import SolarLSTMModel
except ImportError as e:
    print(f"Model import error: {e}")
    SolarRandomForestModel = None
    SolarLSTMModel = None

app = Flask(__name__)
CORS(app)

# Initialize models
rf_model = None
lstm_model = None

def initialize_models():
    """Initialize and load trained models"""
    global rf_model, lstm_model
    
    try:
        # Initialize Random Forest model
        if SolarRandomForestModel:
            rf_model = SolarRandomForestModel()
            if os.path.exists('models/random_forest_solar.joblib'):
                rf_model.load_model()
            else:
                print("Training Random Forest model...")
                rf_model.train()
                rf_model.save_model()
        
        # Initialize LSTM model
        if SolarLSTMModel:
            lstm_model = SolarLSTMModel()
            if os.path.exists('models/lstm_solar.h5'):
                lstm_model.load_model()
            else:
                print("Training LSTM model...")
                lstm_model.train(epochs=10)  # Reduced for faster startup
                lstm_model.save_model()
                
        print("Models initialized successfully!")
        
    except Exception as e:
        print(f"Model initialization error: {e}")

@app.route('/', methods=['GET'])
def home():
    """API home endpoint"""
    return jsonify({
        'message': 'Solar Mapping ML API',
        'version': '1.0.0',
        'endpoints': {
            '/predict/random-forest': 'Random Forest predictions',
            '/predict/lstm': 'LSTM predictions',
            '/predict/combined': 'Combined model predictions',
            '/model/status': 'Model status',
            '/model/retrain': 'Retrain models'
        }
    })

@app.route('/model/status', methods=['GET'])
def model_status():
    """Get model status"""
    return jsonify({
        'random_forest': {
            'loaded': rf_model is not None and rf_model.is_trained,
            'features': rf_model.feature_names if rf_model else None
        },
        'lstm': {
            'loaded': lstm_model is not None and lstm_model.is_trained,
            'sequence_length': lstm_model.sequence_length if lstm_model else None
        }
    })

@app.route('/predict/random-forest', methods=['POST'])
def predict_random_forest():
    """Random Forest prediction endpoint"""
    if not rf_model or not rf_model.is_trained:
        return jsonify({'error': 'Random Forest model not available'}), 500
    
    try:
        data = request.get_json()
        
        # Validate input
        required_features = rf_model.feature_names
        missing_features = [f for f in required_features if f not in data]
        
        if missing_features:
            return jsonify({
                'error': 'Missing features',
                'missing': missing_features,
                'required': required_features
            }), 400
        
        # Make prediction
        prediction = rf_model.predict(data)
        
        return jsonify({
            'prediction': float(prediction[0]),
            'model': 'random_forest',
            'unit': 'W/m²',
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict/lstm', methods=['POST'])
def predict_lstm():
    """LSTM prediction endpoint"""
    if not lstm_model or not lstm_model.is_trained:
        return jsonify({'error': 'LSTM model not available'}), 500
    
    try:
        data = request.get_json()
        
        # Expect sequence of weather data
        if 'sequence' not in data:
            return jsonify({'error': 'Weather sequence required'}), 400
        
        sequence = data['sequence']
        
        # Validate sequence length
        if len(sequence) != lstm_model.sequence_length:
            return jsonify({
                'error': f'Sequence must have {lstm_model.sequence_length} time steps'
            }), 400
        
        # Convert to numpy array
        sequence_array = np.array([[item[f] for f in lstm_model.feature_names] 
                                  for item in sequence])
        
        # Make prediction
        prediction = lstm_model.predict_sequence(sequence_array)
        
        # Multi-step prediction if requested
        steps = data.get('steps', 1)
        if steps > 1:
            multi_predictions = lstm_model.predict_multi_step(sequence_array, steps)
            return jsonify({
                'predictions': [float(p) for p in multi_predictions],
                'model': 'lstm',
                'unit': 'W/m²',
                'steps': steps,
                'timestamp': datetime.now().isoformat()
            })
        
        return jsonify({
            'prediction': float(prediction),
            'model': 'lstm',
            'unit': 'W/m²',
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict/combined', methods=['POST'])
def predict_combined():
    """Combined model prediction (ensemble)"""
    if not rf_model or not lstm_model or not rf_model.is_trained or not lstm_model.is_trained:
        return jsonify({'error': 'Both models required for combined prediction'}), 500
    
    try:
        data = request.get_json()
        
        # Get Random Forest prediction
        rf_prediction = rf_model.predict(data)[0]
        
        # For LSTM, we need a sequence - use current data point repeated
        # (In practice, you'd have historical sequence)
        current_point = [data[f] for f in lstm_model.feature_names]
        mock_sequence = np.array([current_point] * lstm_model.sequence_length)
        lstm_prediction = lstm_model.predict_sequence(mock_sequence)
        
        # Ensemble prediction (weighted average)
        rf_weight = 0.6
        lstm_weight = 0.4
        combined_prediction = rf_weight * rf_prediction + lstm_weight * lstm_prediction
        
        return jsonify({
            'prediction': float(combined_prediction),
            'individual_predictions': {
                'random_forest': float(rf_prediction),
                'lstm': float(lstm_prediction)
            },
            'weights': {
                'random_forest': rf_weight,
                'lstm': lstm_weight
            },
            'model': 'ensemble',
            'unit': 'W/m²',
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/model/retrain', methods=['POST'])
def retrain_models():
    """Retrain models with new data"""
    try:
        # In production, this would use real data
        data = request.get_json()
        retrain_type = data.get('model', 'both')
        
        results = {}
        
        if retrain_type in ['random_forest', 'both']:
            if rf_model:
                print("Retraining Random Forest model...")
                rf_results = rf_model.train()
                rf_model.save_model()
                results['random_forest'] = rf_results
        
        if retrain_type in ['lstm', 'both']:
            if lstm_model:
                print("Retraining LSTM model...")
                lstm_results = lstm_model.train(epochs=10)
                lstm_model.save_model()
                results['lstm'] = {
                    'val_loss': lstm_results['val_loss'],
                    'val_mae': lstm_results['val_mae']
                }
        
        return jsonify({
            'message': f'Model(s) retrained successfully',
            'results': results,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/data/generate-sample', methods=['GET'])
def generate_sample_data():
    """Generate sample weather data for testing"""
    try:
        # Generate sample data point
        sample_data = {
            'temperature': 28.5 + np.random.normal(0, 2),
            'humidity': 65.0 + np.random.normal(0, 10),
            'pressure': 1015.0 + np.random.normal(0, 5),
            'wind_speed': 2.5 + np.random.exponential(1),
            'cloud_cover': 20.0 + np.random.uniform(-10, 30),
            'uv_index': 8.0 + np.random.uniform(-2, 2),
            'hour': datetime.now().hour,
            'day_of_year': datetime.now().timetuple().tm_yday,
            'latitude': 28.6139,  # Delhi
            'longitude': 77.2090
        }
        
        # Ensure valid ranges
        sample_data['humidity'] = np.clip(sample_data['humidity'], 0, 100)
        sample_data['cloud_cover'] = np.clip(sample_data['cloud_cover'], 0, 100)
        sample_data['uv_index'] = np.clip(sample_data['uv_index'], 0, 11)
        sample_data['wind_speed'] = max(0, sample_data['wind_speed'])
        
        return jsonify({
            'sample_data': sample_data,
            'description': 'Sample weather data for Delhi',
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Solar Mapping ML API...")
    
    # Create models directory
    os.makedirs('models', exist_ok=True)
    
    # Initialize models
    initialize_models()
    
    # Start Flask app
    app.run(host='0.0.0.0', port=5001, debug=True)
