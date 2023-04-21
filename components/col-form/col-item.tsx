import {ColumnModel} from "@/types/command-model";
import {Button, Flex} from "@chakra-ui/react";

function ColItem(props:ColumnModel){
    return (
        <Flex direction={'row'}>
            <div>{props.colname}</div>
            <div>{props.srctype}</div>
            <div>{props.value}</div>
            <Button mt={4} onClick={() => {}}>
                Remove Column
            </Button>
        </Flex>
    )
}

export default ColItem