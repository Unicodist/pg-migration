import {column} from "@/backend/entities";
import PGConnection from "@/backend/db";

export const getColumnsByTable = async (database: string, schema: string, table: string): Promise<column[]> => {
    const connection = new PGConnection(database)
    return await connection.getAll<column>('columns', 'column_name', 'information_schema', `table_schema=${schema} and table_name=${table}`)
}