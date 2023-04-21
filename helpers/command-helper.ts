import CommandModel from "@/types/command-model";

export function generateCopyCommand(model:CommandModel) : string {
    const select = model.cols.map((col)=>{
        if (col.srctype === 'column'){
            if (col.value === col.colname) return col.colname
            else return `${col.value} as ${col.colname}`
        }
        if (col.srctype === 'query') return `(${col.value}) as ${col.colname}`
        else return `${col.value} as  ${col.colname}`
    })
    return `\\copy (select (${select.join(',')}) from ${model.srcTable}) to ./migrations/${model.srcTable}.csv HEADER CSV`
}