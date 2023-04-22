export interface table {
    table_name:string,
    table_schema:string
}

export interface column {
    column_name:string,
    table_schema:string,
    table_name:string
}