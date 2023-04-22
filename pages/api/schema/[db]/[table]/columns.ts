import {NextApiRequest, NextApiResponse} from 'next';
import {getColumnsByTable} from "@/backend/repositories/column-repository";

const {Pool} = require('pg');

type ErrorResponse = {
    error: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {db, table} = req.query;
    const tb = table as string;

    const schemaName = tb.split('.')[0]
    const tableName = tb.split('.')[1]

    const columns = getColumnsByTable(db as string, schemaName, tableName)

    res.status(200).json(columns);
}
