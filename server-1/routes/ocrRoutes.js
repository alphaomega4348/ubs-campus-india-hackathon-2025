import express from 'express';
import { processImage } from '../controllers/ocrController.js';
const router = express.Router();

router.post('/process', processImage);

export default router;
