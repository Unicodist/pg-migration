import PGConnection from "@/backend/db";
import {table} from "@/backend/entities";

export const getTableFromDb = async (database: string): Promise<table[]> => {
    const connection = new PGConnection(database)

    const result = await connection.getAll<table>('tables', 'table_name,table_schema', 'information_schema', `table_schema in ('core','bank','customer','auth')`)
    return result
}