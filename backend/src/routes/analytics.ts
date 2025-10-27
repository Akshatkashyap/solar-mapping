import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Analytics endpoint' });
  } catch (error) {
    res.status(500).json({ error: 'Analytics error' });
  }
});

export default router;
