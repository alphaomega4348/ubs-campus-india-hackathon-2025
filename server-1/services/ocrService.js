import { createWorker } from 'tesseract.js';
export const extractTextFromImage = async (imageUrl) => {
  try {
    console.log("📷 Image URL:", imageUrl);
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(imageUrl);
    await worker.terminate();
    return text;
  } catch (err) {
    console.error("Tesseract error:", err);
    throw new Error("OCR failed");
  }
};


