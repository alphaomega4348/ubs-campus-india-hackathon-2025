// XGBoost Need Factor Prediction API using Node.js + Python
// -----------------------------------------------
// Prerequisites:
// - Python env with xgboost + pandas + sklearn
// - Trained model saved as `need_factor_model.json`
// - Express backend

import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// POST endpoint to predict needFactor
app.post('/api/predict-need-factor', (req, res) => {
  const { area, students, library_books } = req.body;

  if (!area || students === undefined || library_books === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const python = spawn('python3', ['predict.py', area, students, library_books]);

  let result = '';
  python.stdout.on('data', data => {
    result += data.toString();
  });

  python.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', code => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Python script failed' });
    }
    const needFactor = parseInt(result.trim());
    res.json({ needFactor });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));