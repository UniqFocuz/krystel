import { Button, Card, Input, Text, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { useSelector } from "react-redux";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { purchaseKrystelizer } from "../../../lib/api";

function KrystelizerTab(){
    const user = useSelector((state) => state.userReducer);
    const [username, setUsername] = useState(user.username)
    const toast = useToast()
    const [buyLoader, setBuyLoader] = useState(false)
    const handleUsernameChange = (e) => {
        const username = e.target.value
        setUsername(username)
    }
    const handleUsernameSubmit = async() => {
        setBuyLoader(true)
        await purchaseKrystelizer(username)
        .then((response) => {
            setBuyLoader(false)
            console.log(response.data)
        })
        .catch((error) => {
            setBuyLoader(false)
            toast({
                title: error.response.data.message,
                variant: 'subtle',
                status: 'info',
            })
        })
    }
    return(
        <>
        <Card p={5}>
            <Text fontWeight={'bold'} fontSize={'sm'} color={primaryColour}>Purchase Krystelizer</Text>
            <Input value={username} onChange={handleUsernameChange}  type='text' color={primaryColour} placeholder='Username or Email' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour} />
            <Button marginTop={5} size={'sm'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} onClick={() => handleUsernameSubmit()} isLoading={buyLoader}>Buy</Button>
        </Card>
        </>
    )
}

export default KrystelizerTab