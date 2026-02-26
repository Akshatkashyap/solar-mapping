import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  cloudCover: number;
  visibility: number;
  uvIndex: number;
  solarIrradiance: number;
  timestamp: string;
}

interface WeatherContextType {
  weatherData: WeatherData[];
  currentWeather: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeatherData: (lat: number, lon: number) => Promise<void>;
  updateLocation: (location: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setCurrentWeather(data);
      setWeatherData(prev => [data, ...prev.slice(0, 99)]); // Keep last 100 records
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateLocation = (location: string) => {
    // This would typically trigger a new weather fetch
    console.log('Location updated:', location);
  };

  const value: WeatherContextType = {
    weatherData,
    currentWeather,
    loading,
    error,
    fetchWeatherData,
    updateLocation,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
