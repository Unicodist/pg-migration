import {NextApiRequest, NextApiResponse} from "next";
const {Pool} = require('pg')

export default async function Handler(request: NextApiRequest, response: NextApiResponse) {
    const {database,schema,table} = request.query
    const pool = new Pool({
        user: 'postgres',
        host: '65.108.207.94',
        database: database,
        password: 'dbA@pr3mium'
    })
    pool.connect((err: Error) => {
        if (err) throw err
    })

    const result = await pool.query(`SELECT column_name as name, data_type as dataType, is_nullable as isNullable from information_schema.columns where table_schema = '${schema}' and table_name='${table}'`)

    response.status(200).json(result.rows)
    await pool.end()
}