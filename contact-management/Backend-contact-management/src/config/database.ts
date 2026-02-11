import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {env} from './env.js';
import * as schema from '../models/schema.js';

const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql, { schema });

export const connectDatabase = async (): Promise<void> => {
  try {
    // Test connection by running simple query
    await sql`SELECT 1`;
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};