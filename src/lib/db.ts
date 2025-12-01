import { Pool } from 'pg';

// Parse the connection string to extract individual components
const parseConnectionString = (connStr: string) => {
    const params: Record<string, string> = {};
    connStr.split(';').forEach((param) => {
        const [key, value] = param.split('=');
        if (key && value) {
            params[key.trim()] = value.trim();
        }
    });
    return params;
};

let pool: Pool | null = null;

export const getPool = () => {
    if (!pool) {
        const connectionString = process.env.DATABASE_URL;

        if (!connectionString) {
            throw new Error('DATABASE_URL environment variable is not set');
        }

        const params = parseConnectionString(connectionString);

        pool = new Pool({
            host: params['Host'],
            port: parseInt(params['Port'] || '5432'),
            database: params['Database'],
            user: params['Username'],
            password: params['Password'],
            max: parseInt(params['Maximum Pool Size'] || '10'),
            min: parseInt(params['Minimum Pool Size'] || '0'),
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: parseInt(params['Timeout'] || '15') * 1000,
        });

        // Add error handler for pool
        pool.on('error', (err) => {
            console.error('Unexpected database error:', err);
        });
    }

    return pool;
};

export const query = async (text: string, params?: unknown[]) => {
    try {
        const pool = getPool();
        const result = await pool.query(text, params);
        return result;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};
