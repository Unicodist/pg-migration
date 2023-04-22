import { NextApiHandler } from 'next'
import {getTableFromDb} from "@/backend/repositories/table-repository";


const handler: NextApiHandler = async (req, res) => {
    const { db } = req.query

    const tables = await getTableFromDb(db as string)

    res.status(200).json(tables)
}

export default handler
