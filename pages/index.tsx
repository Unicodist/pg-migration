import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Select, Spacer
} from "@chakra-ui/react";
import {TbPlugConnected} from "react-icons/tb";
import {FormEvent, useEffect, useState} from "react";
import {DatabaseResponseList} from "@/apimodels/database-response-list";
import instance from "@/services/api-service";
import TableResponseList from "@/apimodels/table-response-list";
import {useDisclosure} from "@chakra-ui/hooks";
import RuleAddPopup from "@/components/rule-add-popup";

export default function Home() {
    const [databases,setDatabases] = useState<DatabaseResponseList[]>([])

    const [sourceDatabase,setSourceDatabase] = useState<string>('');
    const [sourceTable,setSourceTable] = useState<string>('');
    const [destinationTable,setDestinationTable] = useState<string>('');
    const [destinationDatabase,setDestinationDatabase] = useState<string>('');

    const [sourceTables, setSourceTables] = useState<TableResponseList[]>([])

    const [destinationTables, setDestinationTables] = useState<TableResponseList[]>([])
    const loadDatabases = async () => {
        const response = await instance.get<DatabaseResponseList[]>('/api/database');
        setDatabases(response.data)
    }

    const loadSourceTables = async () => {
        const response = await instance.get<TableResponseList[]>(`/api/table/${sourceDatabase}`)
        setSourceTables(response.data)
    }
    const loadDestinationTables = async () => {
        const response = await instance.get<TableResponseList[]>(`/api/table/${destinationDatabase}`)
        setDestinationTables(response.data)
    }

    const disclosure = useDisclosure();

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        disclosure.onOpen()
    }

    useEffect(()=>{
        loadDatabases()
    },[])

    useEffect(()=>{
        if (sourceDatabase !== '')
            loadSourceTables()
    },[sourceDatabase])
    useEffect(()=>{
        if (destinationDatabase !== '')
            loadDestinationTables()
    },[destinationDatabase])
  return (<>
          <Flex h={'100vh'} justifyContent={'center'} alignItems={'center'}>
              <Flex p={12} rounded={6} direction={'column'}>
                  <form onSubmit={(e)=>handleSubmit(e)}>
                      <Flex direction={'column'} gap={3}>
                          <FormControl mb={5} as={'fieldset'}>
                              <FormLabel>Source</FormLabel>
                              <Select onChange={(e)=>setSourceDatabase(e.target.value)} placeholder={'Choose database'}>
                                  {
                                      databases.map((item,key)=>{
                                          return <option key={key}>{item.name}</option>
                                      })
                                  }
                              </Select>
                              <Spacer height={3}/>
                              <Select hidden={sourceDatabase ===''} placeholder={'Choose table'} onChange={(e)=>setSourceTable(e.target.value)}>
                                  {
                                      sourceTables.map((item,key)=>{
                                          return <option key={key}>{item.name}</option>
                                      })
                                  }
                              </Select>
                          </FormControl>
                          <FormControl as={'fieldset'}>
                              <FormLabel>Destination</FormLabel>
                              <Select onChange={(e)=>setDestinationDatabase(e.target.value)} placeholder={'Choose destination database'}>
                                  {
                                      databases.map((item,key)=>{
                                          return <option key={key}>{item.name}</option>
                                      })
                                  }
                              </Select>
                              <Spacer height={3}/>
                              <Select hidden={destinationDatabase === ''} placeholder={'Choose table'} onChange={(e)=>setDestinationTable(e.target.value)}>
                                  {
                                      destinationTables.map((item,key)=>{
                                          return <option key={key}>{item.name}</option>
                                      })
                                  }
                              </Select>
                          </FormControl>
                          <Button type={'submit'}>GO!</Button>
                      </Flex>
                  </form>
              </Flex>
          </Flex>
          <RuleAddPopup sourceDb={sourceDatabase} sourceTb={sourceTable} destinationDb={destinationDatabase} destinationTb={destinationTable} disclosure={disclosure}/>
      </>

  )
}
