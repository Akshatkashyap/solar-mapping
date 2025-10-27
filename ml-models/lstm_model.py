import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os
from datetime import datetime, timedelta
import json

class SolarLSTMModel:
    def __init__(self, sequence_length=24, features=10):
        self.sequence_length = sequence_length  # Hours of historical data
        self.features = features
        self.model = None
        self.scaler_X = MinMaxScaler()
        self.scaler_y = MinMaxScaler()
        self.is_trained = False
        
        self.feature_names = [
            'temperature', 'humidity', 'pressure', 'wind_speed',
            'cloud_cover', 'uv_index', 'hour', 'day_of_year',
            'latitude', 'longitude'
        ]
    
    def create_model(self):
        """Create LSTM model architecture"""
        model = tf.keras.Sequential([
            tf.keras.layers.LSTM(
                50, 
                return_sequences=True, 
                input_shape=(self.sequence_length, self.features)
            ),
            tf.keras.layers.Dropout(0.2),
            
            tf.keras.layers.LSTM(50, return_sequences=True),
            tf.keras.layers.Dropout(0.2),
            
            tf.keras.layers.LSTM(25),
            tf.keras.layers.Dropout(0.2),
            
            tf.keras.layers.Dense(25, activation='relu'),
            tf.keras.layers.Dense(1)
        ])
        
        model.compile(
            optimizer='adam',
            loss='mse',
            metrics=['mae']
        )
        
        return model
    
    def generate_time_series_data(self, n_days=365):
        """Generate synthetic time series data"""
        np.random.seed(42)
        
        # Generate hourly data for n_days
        hours = n_days * 24
        
        # Time features
        time_series = pd.date_range(
            start='2023-01-01', 
            periods=hours, 
            freq='H'
        )
        
        data = []
        for i, timestamp in enumerate(time_series):
            hour = timestamp.hour
            day_of_year = timestamp.dayofyear
            
            # Simulate weather patterns with some seasonal variation
            base_temp = 25 + 10 * np.sin(2 * np.pi * day_of_year / 365)
            temperature = base_temp + 5 * np.sin(2 * np.pi * hour / 24) + np.random.normal(0, 2)
            
            humidity = 50 + 30 * np.sin(2 * np.pi * day_of_year / 365) + np.random.normal(0, 10)
            humidity = np.clip(humidity, 20, 90)
            
            pressure = 1013 + np.random.normal(0, 10)
            wind_speed = np.abs(np.random.normal(3, 2))
            
            cloud_cover = 30 + 40 * np.sin(2 * np.pi * day_of_year / 365) + np.random.normal(0, 20)
            cloud_cover = np.clip(cloud_cover, 0, 100)
            
            uv_index = max(0, 8 * np.sin(np.pi * hour / 24) + np.random.normal(0, 1))
            
            # Indian coordinates (example: Delhi region)
            latitude = 28.6139 + np.random.normal(0, 0.1)
            longitude = 77.2090 + np.random.normal(0, 0.1)
            
            # Calculate solar irradiance
            if 6 <= hour <= 18:  # Daylight hours
                base_irradiance = 1000 * np.sin(np.pi * (hour - 6) / 12)
                cloud_reduction = (100 - cloud_cover) / 100
                seasonal_factor = 0.7 + 0.6 * np.sin(2 * np.pi * day_of_year / 365)
                irradiance = base_irradiance * cloud_reduction * seasonal_factor
                irradiance += np.random.normal(0, 50)  # Add noise
            else:
                irradiance = 0
            
            irradiance = max(0, irradiance)
            
            data.append({
                'timestamp': timestamp,
                'temperature': temperature,
                'humidity': humidity,
                'pressure': pressure,
                'wind_speed': wind_speed,
                'cloud_cover': cloud_cover,
                'uv_index': uv_index,
                'hour': hour,
                'day_of_year': day_of_year,
                'latitude': latitude,
                'longitude': longitude,
                'solar_irradiance': irradiance
            })
        
        return pd.DataFrame(data)
    
    def prepare_sequences(self, data, target_col='solar_irradiance'):
        """Prepare sequences for LSTM training"""
        # Scale features and target
        feature_data = data[self.feature_names].values
        target_data = data[target_col].values.reshape(-1, 1)
        
        scaled_features = self.scaler_X.fit_transform(feature_data)
        scaled_target = self.scaler_y.fit_transform(target_data)
        
        # Create sequences
        X, y = [], []
        for i in range(self.sequence_length, len(scaled_features)):
            X.append(scaled_features[i-self.sequence_length:i])
            y.append(scaled_target[i])
        
        return np.array(X), np.array(y)
    
    def train(self, data=None, epochs=50, batch_size=32, validation_split=0.2):
        """Train the LSTM model"""
        if data is None:
            print("Generating synthetic time series data...")
            data = self.generate_time_series_data()
        
        # Prepare sequences
        print("Preparing sequences...")
        X, y = self.prepare_sequences(data)
        
        # Create model
        self.model = self.create_model()
        
        # Callbacks
        early_stopping = tf.keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=10,
            restore_best_weights=True
        )
        
        reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.2,
            patience=5,
            min_lr=0.001
        )
        
        # Train model
        print("Training LSTM model...")
        history = self.model.fit(
            X, y,
            epochs=epochs,
            batch_size=batch_size,
            validation_split=validation_split,
            callbacks=[early_stopping, reduce_lr],
            verbose=1
        )
        
        self.is_trained = True
        
        # Evaluate on validation data
        val_loss = min(history.history['val_loss'])
        val_mae = min(history.history['val_mae'])
        
        print(f"Training completed!")
        print(f"Best validation loss: {val_loss:.4f}")
        print(f"Best validation MAE: {val_mae:.4f}")
        
        return {
            'history': history.history,
            'val_loss': val_loss,
            'val_mae': val_mae
        }
    
    def predict_sequence(self, weather_sequence):
        """Predict solar irradiance for next time step"""
        if not self.is_trained:
            raise ValueError("Model must be trained before making predictions")
        
        if len(weather_sequence) != self.sequence_length:
            raise ValueError(f"Input sequence must have {self.sequence_length} time steps")
        
        # Prepare input
        if isinstance(weather_sequence, list):
            weather_sequence = np.array(weather_sequence)
        
        # Scale input
        scaled_input = self.scaler_X.transform(weather_sequence)
        
        # Reshape for prediction
        input_tensor = scaled_input.reshape(1, self.sequence_length, self.features)
        
        # Make prediction
        scaled_prediction = self.model.predict(input_tensor, verbose=0)
        
        # Inverse transform
        prediction = self.scaler_y.inverse_transform(scaled_prediction)
        
        return prediction[0][0]
    
    def predict_multi_step(self, initial_sequence, steps=24):
        """Predict multiple steps ahead"""
        if not self.is_trained:
            raise ValueError("Model must be trained before making predictions")
        
        predictions = []
        current_sequence = initial_sequence.copy()
        
        for _ in range(steps):
            # Predict next step
            next_pred = self.predict_sequence(current_sequence)
            predictions.append(next_pred)
            
            # Update sequence (this is simplified - in practice you'd need 
            # to update weather features as well)
            new_row = current_sequence[-1].copy()
            # Update irradiance prediction in the weather data would require
            # additional weather forecasting
            current_sequence = np.vstack([current_sequence[1:], new_row])
        
        return predictions
    
    def save_model(self, model_path='models/lstm_solar.h5', 
                   scaler_path='models/lstm_scalers.joblib'):
        """Save trained model and scalers"""
        os.makedirs(os.path.dirname(model_path), exist_ok=True)
        
        # Save model
        self.model.save(model_path)
        
        # Save scalers
        scalers = {
            'scaler_X': self.scaler_X,
            'scaler_y': self.scaler_y
        }
        joblib.dump(scalers, scaler_path)
        
        print(f"Model saved to {model_path}")
        print(f"Scalers saved to {scaler_path}")
    
    def load_model(self, model_path='models/lstm_solar.h5',
                   scaler_path='models/lstm_scalers.joblib'):
        """Load trained model and scalers"""
        if os.path.exists(model_path) and os.path.exists(scaler_path):
            # Load model
            self.model = tf.keras.models.load_model(model_path)
            
            # Load scalers
            scalers = joblib.load(scaler_path)
            self.scaler_X = scalers['scaler_X']
            self.scaler_y = scalers['scaler_y']
            
            self.is_trained = True
            print(f"Model loaded from {model_path}")
        else:
            print(f"Model files not found")

def main():
    """Example usage"""
    # Initialize model
    lstm_model = SolarLSTMModel(sequence_length=24, features=10)
    
    # Train model
    results = lstm_model.train(epochs=20)
    
    # Save model
    lstm_model.save_model()
    
    # Generate example sequence for prediction
    sample_data = lstm_model.generate_time_series_data(n_days=2)
    sample_sequence = sample_data[lstm_model.feature_names].iloc[-24:].values
    
    # Single step prediction
    prediction = lstm_model.predict_sequence(sample_sequence)
    print(f"\nNext hour solar irradiance prediction: {prediction:.2f} W/m²")
    
    # Multi-step prediction
    multi_predictions = lstm_model.predict_multi_step(sample_sequence, steps=6)
    print(f"\nNext 6 hours predictions:")
    for i, pred in enumerate(multi_predictions):
        print(f"Hour {i+1}: {pred:.2f} W/m²")

if __name__ == "__main__":
    main()
