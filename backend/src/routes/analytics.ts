import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    return res.json({ message: 'Analytics endpoint' });
  } catch (error) {
    return res.status(500).json({ error: 'Analytics error' });
  }
});

export default router;
