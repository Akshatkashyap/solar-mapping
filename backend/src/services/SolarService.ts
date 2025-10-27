import { logger } from '../config/logger';

export interface SolarData {
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

export interface SolarPrediction {
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

export class SolarService {
  async getSolarIrradiance(lat: number, lon: number): Promise<SolarData> {
    try {
      // Mock solar data calculation
      const baseIrradiance = 800 + Math.random() * 400; // 800-1200 W/m²
      const efficiency = 85 + Math.random() * 10; // 85-95%
      
      const solarData: SolarData = {
        location: `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
        coordinates: [lat, lon],
        solarIrradiance: baseIrradiance,
        predictedOutput: baseIrradiance * (efficiency / 100),
        efficiency: efficiency,
        dailyGeneration: baseIrradiance * 8 * (efficiency / 100) / 1000, // kWh
        monthlyGeneration: baseIrradiance * 8 * 30 * (efficiency / 100) / 1000, // kWh
        yearlyGeneration: baseIrradiance * 8 * 365 * (efficiency / 100) / 1000, // kWh
        peakHours: 6 + Math.random() * 4, // 6-10 hours
        cloudCoverImpact: Math.random() * 30, // 0-30% impact
        timestamp: new Date().toISOString()
      };

      logger.info(`Generated solar data for coordinates: ${lat}, ${lon}`);
      return solarData;
    } catch (error) {
      logger.error('Error generating solar data:', error);
      throw new Error('Failed to generate solar data');
    }
  }

  async generatePredictions(lat: number, lon: number, days: number): Promise<SolarPrediction[]> {
    try {
      const predictions: SolarPrediction[] = [];
      const currentDate = new Date();

      for (let i = 0; i < days; i++) {
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + i);

        const baseIrradiance = 700 + Math.random() * 500;
        const cloudCover = Math.random() * 80;
        const adjustedIrradiance = baseIrradiance * (1 - cloudCover / 200);

        predictions.push({
          date: futureDate.toISOString().split('T')[0],
          predictedIrradiance: adjustedIrradiance,
          predictedOutput: adjustedIrradiance * 0.85,
          confidence: 0.7 + Math.random() * 0.3, // 70-100%
          weatherFactors: {
            cloudCover: cloudCover,
            humidity: 40 + Math.random() * 40,
            temperature: 20 + Math.random() * 15
          }
        });
      }

      logger.info(`Generated ${days} days of predictions for: ${lat}, ${lon}`);
      return predictions;
    } catch (error) {
      logger.error('Error generating solar predictions:', error);
      throw new Error('Failed to generate solar predictions');
    }
  }

  async analyzeRegion(region: 'city' | 'hill' | 'rural', coordinates: [number, number][]): Promise<any> {
    try {
      // Region-specific analysis
      const regionFactors = {
        city: { efficiency: 0.8, pollution: 0.2 },
        hill: { efficiency: 0.95, altitude: 0.1 },
        rural: { efficiency: 0.9, space: 0.15 }
      };

      const analysis = {
        region,
        coordinates,
        averageEfficiency: regionFactors[region].efficiency,
        totalSites: coordinates.length,
        estimatedCapacity: coordinates.length * 100, // MW
        analysis: `Optimized for ${region} conditions`
      };

      return analysis;
    } catch (error) {
      logger.error('Error analyzing region:', error);
      throw new Error('Failed to analyze region');
    }
  }
}
