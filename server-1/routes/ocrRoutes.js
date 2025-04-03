import express from 'express';
import { processImage } from '../controllers/ocrController.js';
import upload from '../../server-5/middleware/multer.js';
const router = express.Router();

router.post('/process',upload.single("image"),processImage);

export default router;