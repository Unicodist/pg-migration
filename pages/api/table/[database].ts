import {NextApiRequest, NextApiResponse} from "next";
const {Pool} = require('pg')

export default async function Handler(request: NextApiRequest, response: NextApiResponse) {
    const {database} = request.query
    const pool = new Pool({
        user: 'postgres',
        host: '65.108.207.94',
        database: database,
        password: 'dbA@pr3mium'
    })
    pool.connect((err: Error) => {
        if (err) throw err
    })

    const result = await pool.query("SELECT table_schema || '.' || table_name as name from information_schema.tables where table_name not like 'pg_%' and table_name not like 'sql_%' order by table_schema, table_name")

    response.status(200).json(result.rows)
    await pool.end()
}