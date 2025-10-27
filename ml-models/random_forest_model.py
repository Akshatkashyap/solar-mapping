import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os
from datetime import datetime, timedelta
import json

class SolarRandomForestModel:
    def __init__(self):
        self.model = RandomForestRegressor(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            n_jobs=-1
        )
        self.is_trained = False
        self.feature_names = [
            'temperature', 'humidity', 'pressure', 'wind_speed',
            'cloud_cover', 'uv_index', 'hour', 'day_of_year',
            'latitude', 'longitude'
        ]
    
    def generate_synthetic_data(self, n_samples=10000):
        """Generate synthetic solar data for training"""
        np.random.seed(42)
        
        # Generate weather features
        temperature = np.random.normal(25, 10, n_samples)  # Celsius
        humidity = np.random.uniform(20, 90, n_samples)    # %
        pressure = np.random.normal(1013, 20, n_samples)   # hPa
        wind_speed = np.random.exponential(3, n_samples)   # m/s
        cloud_cover = np.random.uniform(0, 100, n_samples) # %
        uv_index = np.random.uniform(0, 11, n_samples)     # Index
        
        # Time features
        hour = np.random.randint(0, 24, n_samples)
        day_of_year = np.random.randint(1, 366, n_samples)
        
        # Location features (India coordinates)
        latitude = np.random.uniform(8.4, 37.6, n_samples)   # India lat range
        longitude = np.random.uniform(68.7, 97.25, n_samples) # India lon range
        
        # Calculate solar irradiance based on features
        # Base irradiance calculation
        base_irradiance = 1000 * np.sin(np.pi * hour / 24)  # Daily curve
        base_irradiance = np.maximum(base_irradiance, 0)      # No negative values
        
        # Weather adjustments
        cloud_reduction = (100 - cloud_cover) / 100
        temp_factor = 1 - np.abs(temperature - 25) / 100     # Optimal at 25°C
        
        # Seasonal adjustment
        seasonal_factor = 0.8 + 0.4 * np.sin(2 * np.pi * day_of_year / 365)
        
        # Calculate final irradiance
        irradiance = (base_irradiance * cloud_reduction * 
                     temp_factor * seasonal_factor * 
                     np.random.normal(1, 0.1, n_samples))  # Add noise
        
        irradiance = np.maximum(irradiance, 0)  # Ensure non-negative
        
        # Create DataFrame
        data = pd.DataFrame({
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
        
        return data
    
    def train(self, data=None):
        """Train the Random Forest model"""
        if data is None:
            print("Generating synthetic training data...")
            data = self.generate_synthetic_data()
        
        # Prepare features and target
        X = data[self.feature_names]
        y = data['solar_irradiance']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Train model
        print("Training Random Forest model...")
        self.model.fit(X_train, y_train)
        
        # Evaluate
        y_pred = self.model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        print(f"Model Performance:")
        print(f"MSE: {mse:.2f}")
        print(f"R² Score: {r2:.4f}")
        
        self.is_trained = True
        
        return {
            'mse': mse,
            'r2_score': r2,
            'feature_importance': dict(zip(
                self.feature_names, 
                self.model.feature_importances_
            ))
        }
    
    def predict(self, weather_data):
        """Predict solar irradiance"""
        if not self.is_trained:
            raise ValueError("Model must be trained before making predictions")
        
        # Ensure input is DataFrame with correct features
        if isinstance(weather_data, dict):
            weather_data = pd.DataFrame([weather_data])
        
        # Validate features
        missing_features = set(self.feature_names) - set(weather_data.columns)
        if missing_features:
            raise ValueError(f"Missing features: {missing_features}")
        
        # Make prediction
        predictions = self.model.predict(weather_data[self.feature_names])
        return predictions
    
    def save_model(self, filepath='models/random_forest_solar.joblib'):
        """Save trained model"""
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        joblib.dump(self.model, filepath)
        print(f"Model saved to {filepath}")
    
    def load_model(self, filepath='models/random_forest_solar.joblib'):
        """Load trained model"""
        if os.path.exists(filepath):
            self.model = joblib.load(filepath)
            self.is_trained = True
            print(f"Model loaded from {filepath}")
        else:
            print(f"Model file not found: {filepath}")
    
    def get_feature_importance(self):
        """Get feature importance scores"""
        if not self.is_trained:
            raise ValueError("Model must be trained first")
        
        importance_dict = dict(zip(
            self.feature_names,
            self.model.feature_importances_
        ))
        
        return sorted(importance_dict.items(), key=lambda x: x[1], reverse=True)

def main():
    """Example usage"""
    # Initialize model
    rf_model = SolarRandomForestModel()
    
    # Train model
    results = rf_model.train()
    
    # Save model
    rf_model.save_model()
    
    # Example prediction
    sample_data = {
        'temperature': 28.5,
        'humidity': 65.0,
        'pressure': 1015.0,
        'wind_speed': 2.5,
        'cloud_cover': 20.0,
        'uv_index': 8.0,
        'hour': 12,
        'day_of_year': 180,
        'latitude': 28.6139,  # Delhi
        'longitude': 77.2090
    }
    
    prediction = rf_model.predict(sample_data)
    print(f"\nPredicted solar irradiance: {prediction[0]:.2f} W/m²")
    
    # Feature importance
    print("\nFeature Importance:")
    for feature, importance in rf_model.get_feature_importance():
        print(f"{feature}: {importance:.4f}")

if __name__ == "__main__":
    main()
