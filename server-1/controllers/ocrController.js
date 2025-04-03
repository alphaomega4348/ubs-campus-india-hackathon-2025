import { extractTextFromImage } from '../services/ocrService.js';
import { extractBookInfoFromText } from '../services/geminiService.js';

import { uploadToCloudinary, cloudinary } from "../utils/cloudinary.js";
import sharp from "sharp";

export  const processImage = async (req, res) => {
  try {
    console.log("📥 Incoming Body:", req.body); 

    if (!req.file) {
      return res.status(400).json({ message: "Proof of delivery is required" });
    }

    const optimizedImageBuffer = await sharp(req.file.buffer)
    .resize({ width: 800, height: 800, fit: "inside" })
    .toFormat("jpeg", { quality: 80 })
    .toBuffer();

const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;

const cloudResponse = await uploadToCloudinary(fileUri);

    const imageUrl=cloudResponse.secure_url;

    const text = await extractTextFromImage(imageUrl);
    const bookData = await extractBookInfoFromText(text);
    
    res.json({ success: true, bookData });

  } catch (err) {
    console.error("❌ OCR Controller Error:", err);
    res.status(500).json({ error: err.message });
  }
};




