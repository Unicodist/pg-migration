import {Table, TableContainer, Thead, Tr} from "@chakra-ui/react";
import DataTable from "@/components/table/DataTable";

function Index() {
    const ruleColumns:DataTableColumn[] = [
        {
            name:'Rule',
            key:'name'
        }
    ]
    return (
        <DataTable columns={ruleColumns} data={[]} caption={'Rules'}/>
    )
}
export default Index