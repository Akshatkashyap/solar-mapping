import axios from 'axios';
import { logger } from '../config/logger';

export interface WeatherData {
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

export class WeatherService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || '';
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      const data = response.data;
      
      return {
        location: `${data.name}, ${data.sys.country}`,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind?.speed || 0,
        windDirection: data.wind?.deg || 0,
        cloudCover: data.clouds.all,
        visibility: data.visibility / 1000, // Convert to km
        uvIndex: 0, // Would need UV Index API call
        solarIrradiance: this.calculateSolarIrradiance(data.clouds.all, lat),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error fetching current weather:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  async getHistoricalWeather(lat: number, lon: number, startDate: Date, endDate: Date): Promise<WeatherData[]> {
    // Mock implementation - would integrate with historical weather API
    logger.info(`Fetching historical weather for ${lat}, ${lon} from ${startDate} to ${endDate}`);
    
    const mockData: WeatherData[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      mockData.push({
        location: `${lat}, ${lon}`,
        temperature: 20 + Math.random() * 15,
        humidity: 40 + Math.random() * 40,
        pressure: 1013 + Math.random() * 20,
        windSpeed: Math.random() * 10,
        windDirection: Math.random() * 360,
        cloudCover: Math.random() * 100,
        visibility: 5 + Math.random() * 15,
        uvIndex: Math.random() * 11,
        solarIrradiance: 400 + Math.random() * 600,
        timestamp: currentDate.toISOString()
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return mockData;
  }

  async getWeatherForecast(lat: number, lon: number, days: number): Promise<WeatherData[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric',
          cnt: days * 8 // 8 forecasts per day (3-hour intervals)
        }
      });

      const forecasts = response.data.list.map((item: any) => ({
        location: `${response.data.city.name}, ${response.data.city.country}`,
        temperature: item.main.temp,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        windSpeed: item.wind?.speed || 0,
        windDirection: item.wind?.deg || 0,
        cloudCover: item.clouds.all,
        visibility: 10, // Default visibility
        uvIndex: 0,
        solarIrradiance: this.calculateSolarIrradiance(item.clouds.all, lat),
        timestamp: new Date(item.dt * 1000).toISOString()
      }));

      return forecasts;
    } catch (error) {
      logger.error('Error fetching weather forecast:', error);
      throw new Error('Failed to fetch weather forecast');
    }
  }

  private calculateSolarIrradiance(cloudCover: number, latitude: number): number {
    // Simplified solar irradiance calculation
    const baseIrradiance = 1000; // W/m² at peak conditions
    const cloudReduction = (100 - cloudCover) / 100;
    const latitudeReduction = Math.cos(Math.abs(latitude) * Math.PI / 180);
    
    return baseIrradiance * cloudReduction * latitudeReduction;
  }
}
