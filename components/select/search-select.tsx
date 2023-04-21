import { useState } from 'react';
import {Select, Input, Button, FormControl, Menu, MenuButton, MenuList, MenuItem, Spacer} from '@chakra-ui/react';
import {BsMenuDown} from "react-icons/bs";

type SearchableSelectProps = {
    options?: string[];
    onSelect: (option: string) => void;
    placeholder?: string;
    label: string;
    w?:string;
};

export default function SearchableSelect(props:SearchableSelectProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const filteredOptions = props.options?.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsMenuDown/>}>
                    {props.placeholder ?? "Select"}
            </MenuButton>
            <MenuList maxH={'40vh'} overflowY={'scroll'}>
                <Input placeholder={'Search'} type={'text'} onChange={(e)=>setSearchTerm(e.target.value)} borderBottomWidth={'5px'} name={props.label}/>
                <Spacer h={'10px'}/>
                {
                    filteredOptions?.map((item,key)=><MenuItem onClick={()=>props.onSelect(item)} key={key}>{item}</MenuItem>)
                }
            </MenuList>
        </Menu>
    );
}
