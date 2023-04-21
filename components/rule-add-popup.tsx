import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement, Select
} from "@chakra-ui/react";
import {ChangeEvent, Fragment, useEffect, useState} from "react";
import ColumnResponseList from "@/apimodels/column-response-list";
import instance from "@/services/api-service";
import {BsCalendarDay, BsFillChatSquareTextFill} from "react-icons/bs";
import {TbNumbers} from "react-icons/tb";
import {getColumns} from "@/services/database-service";

type RuleAddPopup = {
    sourceDb:string,
    sourceSchema:string,
    sourceTb:string,
    destinationDb:string,
    destinationSchema:string,
    destinationTb:string,
    disclosure:{isOpen:boolean,onOpen:()=>void,onClose:()=>void}
}
function RuleAddPopup(props:RuleAddPopup){

    const [sourceColumns,setSourceColumns] = useState<ColumnResponseList[]>([]);
    const [destinationColumns,setDestinationColumns] = useState<ColumnResponseList[]>([])

    useEffect(()=>{
        getColumns(props.sourceDb,props.sourceSchema,props.sourceTb).then(
            function (result) {
                setSourceColumns(result)
            }
        )
        getColumns(props.destinationDb,props.destinationSchema,props.destinationTb).then(
            function (result) {
                setDestinationColumns(result)
            }
        )
    },[props.disclosure.isOpen])

    const handleSelectChange=(e:ChangeEvent<HTMLSelectElement>,inputName:string)=>{
        e.preventDefault()
        console.log(inputName)
        const element = document.getElementsByName(inputName)[0];
        element.setAttribute('value',`${e.target.value} as ${inputName}`)
    }

    return (
        <Modal isOpen={props.disclosure.isOpen} onClose={props.disclosure.onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>How should we migrate this table?</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl as={'fieldset'}>
                        <Heading>{props.destinationTb}</Heading>
                        {
                            destinationColumns.map((item,key)=>{
                                return(
                                    <Fragment key={key}>
                                        <FormLabel>{item.name}</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                            {
                                                item.datatype === 'text' || item.datatype === 'character varying'?<BsFillChatSquareTextFill/>:item.datatype==='integer'?<TbNumbers/>:item.datatype==="timestamp with time zone"?<BsCalendarDay/>:''
                                            }
                                            </InputLeftElement>
                                            <Input name={item.name}/>
                                            <InputRightElement>
                                                <Select onChange={(e)=>handleSelectChange(e,item.name)} placeholder={'Select a column'}>
                                                    {
                                                        sourceColumns.map((item,key)=>{
                                                            return <option key={key}>{item.name}</option>
                                                        })
                                                    }
                                                </Select>
                                            </InputRightElement>
                                        </InputGroup>
                                    </Fragment>
                                )
                            })
                        }
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Generate
                    </Button>
                    <Button onClick={props.disclosure.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default RuleAddPopup