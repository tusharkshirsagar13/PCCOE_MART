import express from 'express';
const app = express();
import path from 'path';
import dotenv from 'dotenv';
import cors from "cors";

app.use(cors());
dotenv.config();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// IMPORT ROUTES
import  registerRoutes  from './routes/registerRoutes';
import  foundRoutes  from './routes/foundRoutes';
import purchaseRoutes from './routes/purchaseRoutes';



// ROUTES
app.use('/api/v1',registerRoutes);
app.use('/api/v1/purchase',purchaseRoutes);
app.use('/api/v1/found',foundRoutes);


// START SERVER AND DB
function startServer() {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}


async function startDB () {
  const mongoose = require('mongoose');
  await mongoose.connect(process.env.DB_URL);
  console.log('Connected to MongoDB');
}


startServer();
startDB();