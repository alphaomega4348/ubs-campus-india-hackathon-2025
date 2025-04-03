const express =require('express');
const cors =require('cors');
const dotenv =require('dotenv');
const ocrRoutes =require('./routes/ocrRoutes.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/ocr', ocrRoutes);
app.use(express.static(path.join(__dirname, 'public'))); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
