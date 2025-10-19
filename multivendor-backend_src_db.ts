import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const connectionString = process.env.DATABASE_URL || '';

if (!connectionString) {
  console.warn('WARNING: No DATABASE_URL set in environment. The app will try to connect and fail if unset.');
}

export const pool = new Pool({ connectionString, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false });

export async function initDb() {
  const client = await pool.connect();
  try {
    // Create tables if they don't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'CUSTOMER',
        created_at TIMESTAMP DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS vendors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        owner_id TEXT REFERENCES users(id),
        vendor_type TEXT,
        created_at TIMESTAMP DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        vendor_id TEXT REFERENCES vendors(id),
        name TEXT NOT NULL,
        description TEXT,
        price_cents INT NOT NULL,
        unit TEXT,
        stock INT DEFAULT 0,
        requires_rx BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        customer_id TEXT REFERENCES users(id),
        payload JSONB,
        total_cents INT,
        created_at TIMESTAMP DEFAULT now()
      );
    `);

    console.log('✅ DB initialized (ensured tables exist)');
  } finally {
    client.release();
  }
}
