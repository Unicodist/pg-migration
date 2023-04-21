class ColumnRequestModel{
    constructor(database:string,table:string,schema:string) {
        this.database = database;
        this.table = table;
        this.schema = schema;
    }
    schema: string;
    database:string;
    table:string;
}
export default ColumnRequestModel