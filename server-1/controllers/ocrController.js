import { extractTextFromImage } from '../services/ocrService.js';
import { extractBookInfoFromText } from '../services/geminiService.js';

export const processImage = async (req, res) => {
  try {
    console.log("📥 Incoming Body:", req.body); 

    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'Image URL required' });

    const text = await extractTextFromImage(imageUrl);
    const bookData = await extractBookInfoFromText(text);
    
    res.json({ success: true, bookData });

  } catch (err) {
    console.error("❌ OCR Controller Error:", err);
    res.status(500).json({ error: err.message });
  }
};



