require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const donarRoute = require("./routes/donarroute");
const schoolRoute=require("./routes/schoolroute")
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();

config({
  path: "./data/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["*"],
    methods: ["*"],
    credentials: true,
  })
);

// Request logger middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/donar", donarRoute); // ✅ Ensure This Matches Postman Request
app.use('/api/school',schoolRoute)
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.use("/api/donar", donarRoute);

// Route not found handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));






