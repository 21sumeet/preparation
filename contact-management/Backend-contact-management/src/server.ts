import {env} from './config/env.js';
import app from './app';
import { connectDatabase } from './config/database.js';

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      console.log('=================================');
      console.log(`✅ Server running on port ${env.PORT}`);
      console.log(`🔗 http://localhost:${env.PORT}`);
      //console.log(`📦 Environment: ${env.NODE_ENV}`);
      console.log('=================================');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();