import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { rateLimiter } from './middlewares/rateLimiter.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { setupSwagger } from './config/swagger.js';
import path from 'node:path';

dotenv.config();

const app: Application = express();
var corsOptions = {
  origin: ['http://localhost:4200','http://localhost:58504','http://localhost:49810'],
  optionsSuccessStatus: 200
}

// Middleware
//app.use(helmet()); //helmet is use for sercuring backend 
app.use(cors(corsOptions));
app.use(express.json());
app.use(rateLimiter);
app.use(express.urlencoded({ extended: true }));
setupSwagger(app);

//multer serve upload file
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/admin', adminRoutes);



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

app.use(errorHandler); //global error should be at last to catch errors

export default app;