import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    return res.json({ message: 'Predictions endpoint' });
  } catch (error) {
    return res.status(500).json({ error: 'Predictions error' });
  }
});

export default router;
