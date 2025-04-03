import  mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    donor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor',
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    author:{
        type: String,
        trim:true
    },
    condition: {
        type: String,
        enum: ['New', 'Used'],
    },
    quantity: {
        type: Number,
        min: 1
    },
    grade_level: {
        type: String,
        trim: true
    },
    language: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    image: {
        type: String, 
        trim: true
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book
