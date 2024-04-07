import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import locationRoutes from './routes/location.route.js';
import deviceRoutes from './routes/device.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error(err));

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(3001, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/locations', locationRoutes);
app.use('/api/locations', deviceRoutes);

app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
