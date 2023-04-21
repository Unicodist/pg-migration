import {useState, useEffect, MouseEventHandler} from "react";
import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Stack,
} from "@chakra-ui/react";
import SearchableSelect from "@/components/select/search-select";
import {useRouter} from "next/router";

const Index = () => {
    const [databases,setDatabases] = useState<string[]>([])
    const [sourceDb, setSourceDb] = useState<string>("");
    const [destDb, setDestDb] = useState<string>("");
    const [sourceTables, setSourceTables] = useState<string[]>([]);
    const [destTables, setDestTables] = useState<string[]>([]);
    const [sourceTable, setSourceTable] = useState<string>("");
    const [destTable, setDestTable] = useState<string>("");

    useEffect(() => {
        fetch("/api/schema/db")
            .then((res) => res.json())
            .then((data) => {
                setDatabases(data.databases)
            });
    }, []);

    useEffect(() => {
        if (sourceDb) {
            fetch(`/api/schema/${sourceDb}/tables`)
                .then((res) => res.json())
                .then((data) => {
                    setSourceTables(data.map((table:any)=>table.table_name));
                });
        }
    }, [sourceDb]);

    useEffect(() => {
        if (destDb) {
            fetch(`/api/schema/${destDb}/tables`)
                .then((res) => res.json())
                .then((data) => {
                    setDestTables(data.map((table:any)=>table.table_name));
                });
        }
    }, [destDb]);
    const router = useRouter()
    function HandleSubmit(e:any) {
        e.preventDefault()
        console.log('sir yes sir')

        router.push({
            pathname: '/copy/column',
            query: {
                srcDb: sourceDb,
                srcTable: sourceTable,
                destDb: destDb,
                destTable: destTable,
            },
        }).then(function (q) {

        });
    }

    return (
        <Container maxWidth="xl">
                <Stack h={'100vh'} spacing={4} justifyContent={'center'} alignItems={"center"}>
                    <FormControl id="source-db" isRequired>
                        <FormLabel>Source Database</FormLabel>
                        <SearchableSelect w={'100%'} options={databases} onSelect={setSourceDb} label={'srcdb'}/>
                    </FormControl>
                    <FormControl id="source-table" isRequired>
                        <FormLabel>Source Table</FormLabel>
                        <SearchableSelect onSelect={setSourceTable} options={sourceTables} label={'srctb'}/>
                    </FormControl>
                    <FormControl id="dest-db" isRequired>
                        <FormLabel>Destination Database</FormLabel>
                        <SearchableSelect options={databases} onSelect={setDestDb} label={'dstdb'}/>
                    </FormControl>
                    <FormControl id="dest-table" isRequired>
                        <FormLabel>Destination Table</FormLabel>
                        <SearchableSelect options={destTables} onSelect={setDestTable} label={'dsttb'}/>
                    </FormControl>
                    <Button onClick={HandleSubmit}>Next</Button>
                </Stack>
        </Container>
    );
};

export default Index;

