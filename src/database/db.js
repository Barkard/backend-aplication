import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || 'db_library',
    user: process.env.DB_USER || 'Leon',
    password: process.env.DB_PASSWORD || '1234',
});

export { pool };
