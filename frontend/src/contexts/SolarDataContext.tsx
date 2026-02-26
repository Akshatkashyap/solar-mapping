import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SolarData {
  location: string;
  coordinates: [number, number];
  solarIrradiance: number;
  predictedOutput: number;
  efficiency: number;
  dailyGeneration: number;
  monthlyGeneration: number;
  yearlyGeneration: number;
  peakHours: number;
  cloudCoverImpact: number;
  timestamp: string;
}

interface SolarPrediction {
  date: string;
  predictedIrradiance: number;
  predictedOutput: number;
  confidence: number;
  weatherFactors: {
    cloudCover: number;
    humidity: number;
    temperature: number;
  };
}

interface SolarDataContextType {
  solarData: SolarData[];
  predictions: SolarPrediction[];
  selectedLocation: SolarData | null;
  loading: boolean;
  error: string | null;
  fetchSolarData: (lat: number, lon: number) => Promise<void>;
  generatePredictions: (lat: number, lon: number, days: number) => Promise<void>;
  selectLocation: (data: SolarData) => void;
}

const SolarDataContext = createContext<SolarDataContextType | undefined>(undefined);

interface SolarDataProviderProps {
  children: ReactNode;
}

export const SolarDataProvider: React.FC<SolarDataProviderProps> = ({ children }) => {
  const [solarData, setSolarData] = useState<SolarData[]>([]);
  const [predictions, setPredictions] = useState<SolarPrediction[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SolarData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSolarData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/solar?lat=${lat}&lon=${lon}`);
      if (!response.ok) {
        throw new Error('Failed to fetch solar data');
      }
      
      const data = await response.json();
      setSolarData(prev => [data, ...prev.slice(0, 99)]);
      setSelectedLocation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const generatePredictions = async (lat: number, lon: number, days: number = 7) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/solar/predictions?lat=${lat}&lon=${lon}&days=${days}`);
      if (!response.ok) {
        throw new Error('Failed to generate predictions');
      }
      
      const data = await response.json();
      setPredictions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectLocation = (data: SolarData) => {
    setSelectedLocation(data);
  };

  const value: SolarDataContextType = {
    solarData,
    predictions,
    selectedLocation,
    loading,
    error,
    fetchSolarData,
    generatePredictions,
    selectLocation,
  };

  return (
    <SolarDataContext.Provider value={value}>
      {children}
    </SolarDataContext.Provider>
  );
};

export const useSolarData = () => {
  const context = useContext(SolarDataContext);
  if (context === undefined) {
    throw new Error('useSolarData must be used within a SolarDataProvider');
  }
  return context;
};
