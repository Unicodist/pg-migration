import {Table, TableCaption, TableContainer, Tbody, Thead, Tr} from "@chakra-ui/react";

type DataTableProps = {
    caption?:string,
    data:any[],
    columns:DataTableColumn[]
}
function DataTable(props:DataTableProps){
    return (
        <TableContainer>
            <Table >
                <TableCaption>{props.caption}</TableCaption>
                <Thead>
                    <Tr></Tr>
                </Thead>
                <Tbody>

                </Tbody>
            </Table>
        </TableContainer>
    )
}
export default DataTable