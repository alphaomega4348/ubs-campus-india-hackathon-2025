import  mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    donor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    condition: {
        type: String,
        enum: ['New', 'Used'],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    grade_level: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String, 
        required: false,
        trim: true
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book
