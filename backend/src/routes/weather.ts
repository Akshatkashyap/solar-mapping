import express from 'express';
import { WeatherService } from '../services/WeatherService';
import { logger } from '../config/logger';

const router = express.Router();
const weatherService = new WeatherService();

// Get current weather data
router.get('/', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Latitude and longitude are required',
        example: '/api/weather?lat=28.6139&lon=77.2090'
      });
    }

    const weatherData = await weatherService.getCurrentWeather(
      parseFloat(lat as string),
      parseFloat(lon as string)
    );

    res.json(weatherData);
  } catch (error) {
    logger.error('Weather API error:', error);
    res.status(500).json({
      error: 'Failed to fetch weather data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get historical weather data
router.get('/historical', async (req, res) => {
  try {
    const { lat, lon, startDate, endDate } = req.query;
    
    if (!lat || !lon || !startDate || !endDate) {
      return res.status(400).json({
        error: 'Latitude, longitude, startDate, and endDate are required'
      });
    }

    const historicalData = await weatherService.getHistoricalWeather(
      parseFloat(lat as string),
      parseFloat(lon as string),
      new Date(startDate as string),
      new Date(endDate as string)
    );

    res.json(historicalData);
  } catch (error) {
    logger.error('Historical weather API error:', error);
    res.status(500).json({
      error: 'Failed to fetch historical weather data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get weather forecast
router.get('/forecast', async (req, res) => {
  try {
    const { lat, lon, days = 7 } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Latitude and longitude are required'
      });
    }

    const forecast = await weatherService.getWeatherForecast(
      parseFloat(lat as string),
      parseFloat(lon as string),
      parseInt(days as string)
    );

    res.json(forecast);
  } catch (error) {
    logger.error('Weather forecast API error:', error);
    res.status(500).json({
      error: 'Failed to fetch weather forecast',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
