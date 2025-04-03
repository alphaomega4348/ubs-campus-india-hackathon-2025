const express=require('express');
const { processImage } =require( '../controllers/ocrController.js');
const router = express.Router();

router.post('/process', processImage);

module.exports= router;
