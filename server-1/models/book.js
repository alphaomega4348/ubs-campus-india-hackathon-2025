import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  url: String, 
}, {
  timestamps: true
});

export const Book = mongoose.model('Book', bookSchema);
