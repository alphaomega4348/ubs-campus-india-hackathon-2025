require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const patnerRoutes=require('./routes/donor_school_routes')
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

app.use('/api/donor_school_routes',patnerRoutes)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));