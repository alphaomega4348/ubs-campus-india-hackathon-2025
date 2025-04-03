import { extractTextFromImage } from '../services/ocrService.js';
import { extractBookInfoFromText } from '../services/geminiService.js';
import { uploadToCloudinary } from "../utils/cloudinary.js";
import sharp from "sharp";
import Book from '../models/BookModel.js';

export const processImage = async (req, res) => {
  const { donor_id, condition, quantity, grade_level, language, category } = req.body;

  try {
    console.log("📥 Incoming Body:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "Proof of delivery is required" });
    }

    // Optimize Image
    const optimizedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;

    // Upload to Cloudinary
    const cloudResponse = await uploadToCloudinary(fileUri);
    const imageUrl = cloudResponse.secure_url;

    // OCR and Book Data Extraction
    const text = await extractTextFromImage(imageUrl);
    let bookData = await extractBookInfoFromText(text);

    if (bookData && typeof bookData === 'string') {
      // Clean and Parse JSON Response
      const cleaned = bookData
        .replace(/```json|```/gi, '')  // Remove markdown JSON formatting
        .trim();

      try {
        bookData = JSON.parse(cleaned);
      } catch (err) {
        console.error("❌ JSON parse error:", err);
        return res.status(500).json({ error: "Failed to parse Gemini response." });
      }
    } else {
      console.warn("⚠ Gemini response was empty or malformed:", bookData);
      return res.status(500).json({ error: "Invalid response from Gemini service." });
    }

    console.log('📚 The book title is:', bookData.title);

    // Save Book to Database
    const newBook = new Book({
      // donor_id,
      title: bookData.title,
      // condition,
      // quantity,
      // grade_level,
      // language,
      // category: bookData.genre || category, // Fallback to user-provided category
      image: imageUrl,
      author:bookData.author
    });

    await newBook.save();

    console.log('new book is',newBook)
    res.json({ success: true, newBook});

  } catch (err) {
    console.error("❌ OCR Controller Error:", err);
    res.status(500).json({ error: err.message });
  }
};


export const remainingDetails=async(req,res)=>{
  const { donor_id, condition, quantity, grade_level, language, category,id } = req.body;
  try{

    const existingBook = await Book.findById(id);

    if (!existingBook) {
      return res.status(404).json({ error: "Book not found. Please upload the book image first." });
    }

    existingBook.donor_id = donor_id || existingBook.donor_id;
    existingBook.condition = condition || existingBook.condition;
    existingBook.quantity = quantity || existingBook.quantity;
    existingBook.grade_level = grade_level || existingBook.grade_level;
    existingBook.language = language || existingBook.language;
    existingBook.category = category || existingBook.category;

    await existingBook.save();

    res.json({ success: true, message: "Book details updated successfully", book: existingBook });

  }
  catch(err){
    console.error("❌ OCR Controller Error:", err);
    res.status(500).json({ error: err.message });
  }
}