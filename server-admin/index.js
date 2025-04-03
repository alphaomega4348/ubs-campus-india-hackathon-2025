require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const deliveryRoutes = require('./routes/deliveryRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // ✅ Serves static files from 'public'
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ Serves uploaded files

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));



const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
