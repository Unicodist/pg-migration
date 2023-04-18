import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useState} from "react";

type RuleAddPopup = {
    sourceDb:string,
    sourceTb:string,
    destinationDb:string,
    destinationTb:string,
    disclosure:{isOpen:boolean,onOpen:()=>void,onClose:()=>void}
}
function RuleAddPopup(props:RuleAddPopup){

    const [columns,setColumns] = useState();

    return (
        <Modal isOpen={props.disclosure.isOpen} onClose={props.disclosure.onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>How should we migrate this table?</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Select column:</FormLabel>
                        <Input placeholder='First name' />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Last name</FormLabel>
                        <Input placeholder='Last name' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={props.disclosure.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default RuleAddPopup