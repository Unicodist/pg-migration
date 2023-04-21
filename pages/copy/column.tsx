import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel, IconButton,
    Input,
    Select, Stack, Textarea,
} from '@chakra-ui/react';
import {useRouter} from "next/router";
import ColForm from "@/components/col-form/col-form";

const ColumnPage = () => {
    const router = useRouter()
    const {srcDb, srcTable, destDb, destTable} = router.query;
    return (
        <Box p={4} height={'100vh'}>
            <Stack spacing={4}>
                <Box borderWidth="1px" borderRadius="lg" p={4}>
                    <ColForm srcDb={srcDb as string} dstDb={destDb as string} desttable={destTable as string} srctable={srcTable as string}/>
                </Box>
            </Stack>
        </Box>
    );
}
export default ColumnPage
