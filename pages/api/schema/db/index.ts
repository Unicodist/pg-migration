import { NextApiRequest, NextApiResponse } from 'next';
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '65.108.207.94',
    database: 'postgres',
    password: 'dbA@pr3mium'
});

async function getDatabaseNames(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = `
      SELECT datname FROM pg_database
      WHERE datistemplate = false AND datname != 'postgres';
    `;
        const result = await pool.query(query);
        const databases = result.rows.map((row:any) => row.datname);
        res.status(200).json({ databases });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch database names.' });
    }
}

export default getDatabaseNames;
