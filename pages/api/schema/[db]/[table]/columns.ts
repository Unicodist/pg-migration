import { NextApiRequest, NextApiResponse } from 'next';
const { Pool } = require('pg');

type ErrorResponse = {
    error: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {db,table} = req.query;
    const tb = table as string;

    const schemaName = tb.split('.')[0]
    const tableName = tb.split('.')[1]

    const pool = new Pool({
        user: 'postgres',
        host: '65.108.207.94',
        database: db,
        password: 'dbA@pr3mium'
    });

    try {
        const client = await pool.connect();
        const query = `SELECT column_name as colname, data_type as srctype
      FROM information_schema.columns
      WHERE table_schema = '${schemaName}'
      AND table_name = '${tableName}'
      `

        console.log(query)

        const result = await client.query(query);

        res.status(200).json(result.rows);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        pool.end();
    }
}
