import {IconButton, Input, InputGroup, Select} from "@chakra-ui/react";
import SearchableSelect from "@/components/select/search-select";
import {useEffect, useState} from "react";
import CommandModel, {ColumnModel} from "@/types/command-model";
import {BiPlus} from "react-icons/bi";
import {generateCopyCommand} from "@/helpers/command-helper";
import {column} from "@/backend/entities";

type ColFormProps = { srcDb:string, srctable:string, dstDb:string, desttable:string }

function ColForm(props: ColFormProps) {

    const[dstDbCols,setDstDbCols] = useState<column[]>([]);
    const [srcCols,setSrcCols] = useState<column[]>([]);
    const [currentCol,setCurrentCol] = useState<ColumnModel>({colname: "", srctype: "column", value: ""});
    const [command, setCommand] = useState<CommandModel>({cols: [], srcTable: ''})

    useEffect(()=>{
        if (props.srcDb && srcCols && props.srctable && props.dstDb && props.desttable){
            fetch(`/api/schema/${props.srcDb}/${props.srctable}/columns`)
                .then((res) => res.json())
                .then(function (response) {
                    setSrcCols(response)
                })
            fetch(`/api/schema/${props.dstDb}/${props.desttable}/columns`)
                .then((res) => res.json())
                .then(function (response:column[]) {
                    setDstDbCols(response)
                })
            setCommand({...command,srcTable:props.srctable})
        }
    },[props])

    const handleAdd = () => {
        setCommand({...command,cols:[...command.cols,currentCol]})
        setCurrentCol({colname: "", srctype: "", value: ""})
    }



    return (
        <>
            <InputGroup flexDirection={'row'} gap={'10px'}>
                <SearchableSelect options={dstDbCols?.map((col)=>col.column_name)} onSelect={(e) => setCurrentCol({...currentCol, colname: e})} label={'newColName'}/>
                <Select onChange={(e)=>setCurrentCol({...currentCol,srctype:e.target.value})}>
                    <option value="column">Column</option>
                    <option value="constant">Constant</option>
                    <option value="query">Query</option>
                </Select>
                {
                    currentCol.srctype === 'query' || currentCol.srctype === 'constant'
                        ? <Input onChange={(e)=>setCurrentCol({...currentCol,value:e.target.value})}/>
                        : <SearchableSelect options={srcCols?.map((col)=>col.column_name)} onSelect={o=>setCurrentCol( {...currentCol,value:o})} label={'column'}/>
                }
                <IconButton aria-label={'add rule'} icon={<BiPlus/>} onClick={handleAdd}/>
            </InputGroup>
            <p>{generateCopyCommand(command)}</p>
        </>

    )
}
export default ColForm