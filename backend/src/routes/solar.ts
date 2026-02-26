import express from 'express';
import { SolarService } from '../services/SolarService';
import { logger } from '../config/logger';

const router = express.Router();
const solarService = new SolarService();

// Get solar irradiance data
router.get('/', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Latitude and longitude are required'
      });
    }

    const solarData = await solarService.getSolarIrradiance(
      parseFloat(lat as string),
      parseFloat(lon as string)
    );

    return res.json(solarData);
  } catch (error) {
    logger.error('Solar API error:', error);
    return res.status(500).json({
      error: 'Failed to fetch solar data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Generate solar predictions
router.get('/predictions', async (req, res) => {
  try {
    const { lat, lon, days = 7 } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Latitude and longitude are required'
      });
    }

    const predictions = await solarService.generatePredictions(
      parseFloat(lat as string),
      parseFloat(lon as string),
      parseInt(days as string)
    );

    return res.json(predictions);
  } catch (error) {
    logger.error('Solar predictions API error:', error);
    return res.status(500).json({
      error: 'Failed to generate predictions',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
