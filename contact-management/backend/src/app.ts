import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Middleware
app.use(helmet()); //helmet is use for sercuring backend 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '🚀 Contact Management API',
    version: '1.0.0',
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;