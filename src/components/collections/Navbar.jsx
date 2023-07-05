import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { BsGrid1X2Fill } from "react-icons/bs";
import { primaryColour } from "../../lib/settings";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/login')
    }    
return(
        <Box margin={5} display={"flex"} gap={4}>
            <Text fontSize={"2xl"} fontWeight={"bolder"} my="auto" mr="auto" color={primaryColour}>krystel.io</Text>
            <Button bg={"white"} gap={1} size={"sm"} my="auto" shadow={"md"} onClick={handleLogout}> 
                <BsGrid1X2Fill color={primaryColour}/>
            </Button>
            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
        </Box>
    )
}

export default Navbar;