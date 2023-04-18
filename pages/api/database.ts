import {NextApiRequest, NextApiResponse} from "next";
const {Client, Pool} = require('pg')
const dotenv = require('dotenv')
dotenv.config()

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const pool = new Pool({
        user: 'postgres',
        host: '65.108.207.94',
        database: 'postgres',
        password: 'dbA@pr3mium'
    })
    pool.connect((err: Error) => {
        if (err) throw err
    })

    const result = await pool.query('SELECT datname as name from pg_catalog.pg_database')

    res.status(200).json(result.rows)

    await pool.end()
}