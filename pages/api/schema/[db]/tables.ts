import { NextApiHandler } from 'next'
const { Pool } = require('pg')


const handler: NextApiHandler = async (req, res) => {
    const { db } = req.query

    const pool = new Pool({
        user: 'postgres',
        host: '65.108.207.94',
        database: db,
        password: 'dbA@pr3mium'
    });


    try {
        const client = await pool.connect()

        const result = await client.query(`
      SELECT table_schema || '.' || table_name as table_name
      FROM information_schema.tables
      WHERE table_catalog = '${db}' AND table_schema in ('core','member','bank','customer','auth');
    `)

        client.release()

        res.status(200).json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error fetching tables')
    }
}

export default handler
