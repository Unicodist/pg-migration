import axios from "axios";
import ColumnResponseList from "@/apimodels/column-response-list";
import TableResponseList from "@/apimodels/table-response-list";
import SchemaResponseList from "@/apimodels/schema-resposne-list";

const instance = axios
export async function getColumns(database: string, schema: string, table: string): Promise<ColumnResponseList[]> {
    const res = await instance.get<ColumnResponseList[]>(`/api/database/${database}/${schema}/${table}`)

    return res.data
}

export async function getTables(database: string, schema: string) {

    const res = await instance.get<TableResponseList[]>(`/api/database/${database}/${schema}`)

    return res.data
}

export async function getSchemas(database: string) : Promise<SchemaResponseList[]> {

    const res = await instance.get<SchemaResponseList[]>(`/api/database/${database}`)

    return res.data
}