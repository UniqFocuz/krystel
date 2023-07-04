import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { BsGrid1X2Fill } from "react-icons/bs";
import { primaryColour, primaryColourOpaced } from "../../lib/settings";

function Navbar(){
    return(
        <Box margin={5} display={"flex"} gap={4}>
            <Text fontSize={"2xl"} fontWeight={"bolder"} my="auto" mr="auto" color={primaryColour}>krystel.io</Text>
            <Button bg={"white"} gap={1} size={"sm"} my="auto" shadow={"md"}> 
                <BsGrid1X2Fill color={primaryColour}/>
            </Button>
            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
        </Box>
    )
}

export default Navbar;