import express from 'express';
import cors from 'cors';
import certificateRoutes from './routes/certificateRoutes.js';

const app = express();
const PORT = 8002;

app.use(cors());
app.use(express.json());

app.use('/api/certificate', certificateRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
