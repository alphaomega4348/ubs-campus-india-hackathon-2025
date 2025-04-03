require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const donarRoute = require("./routes/donarroute");
const schoolRoute=require("./routes/schoolroute")
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/donar", donarRoute); // ✅ Ensure This Matches Postman Request
app.use('/api/school',schoolRoute)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
