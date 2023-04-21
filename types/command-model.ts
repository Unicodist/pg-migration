export default interface CommandModel{
    srcTable:string,
    cols:ColumnModel[]
}

export type ColumnModel = {
    srctype:string
    colname:string,
    value:string
}