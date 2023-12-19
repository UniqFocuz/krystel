import { Box, Button, Card, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text, useToast } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import NumPad from "../../collections/misc/NumPad";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { superFabrication } from "../../../lib/api";
import { setUserProfile } from "../../../redux/userProfile/actions";

function SuperFabricator(){
    const user = useSelector((state) => state.userReducer);
    const [amount, setAmount] = useState(10)
    const toast = useToast()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const handleAmountChange = (e) => {
        const amount = parseFloat(e.target.value)
        setAmount(amount)
    }
    const handleSubmit = async() => {
        setIsLoading(true)
        await superFabrication(amount)
        .then((response) => {
            setIsLoading(false)
            dispatch(setUserProfile({...user, kollectibles : {
                ...user.kollectibles, superOre : user.kollectibles.superOre - amount, ore : user.kollectibles.krystel + amount*0.95
            }}))
            toast({
                title: response.data.message,
                variant: 'subtle',
                status: 'success',
                duration: 15000,
                position: 'top'
            })
        })
        .catch((error) => {
            setIsLoading(false)
            toast({
                title: error.response.data.message,
                variant: 'subtle',
                status: 'info',
                duration: 10000,
                position: 'top',
            })
        })
    }
    return (
        <>
        <Card p={5}>
            <Flex px={3} justifyContent={"end"} mb={3}>
                <Button borderRadius={"20px"} size={'sm'} fontSize={'2xs'}>{user.kollectibles.superOre} S.Ores</Button>
            </Flex>
            <Box px={3}>
                <Text textAlign={'justify'} fontSize={'xs'} color={'gray'} mb={5}>Super Fabricator converts your Super Ores to Krystels. This process can be used to increase the supply chain of the krystels you own which can be traded for currencies in your payout. A surcharge of 5% is levied and sent to the community</Text>
                <InputGroup px={3}>
                    <InputLeftElement pointerEvents='none'>
                    <AiOutlineUser color={primaryColour} />
                    </InputLeftElement>
                    <Input type='number' color={primaryColour} value={amount} onChange={handleAmountChange}  fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour} readOnly/>
                    <InputRightElement color={primaryColour}></InputRightElement>
                </InputGroup>
                <Text mt={2} mx={3} textAlign={'right'} color={primaryColour} fontSize={'xs'}>{''}</Text>
                <NumPad inputValue={amount} setInputValue={setAmount}/>
                <Button marginTop={5} width={"100%"} size={'sm'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} onClick={() => handleSubmit()} isLoading={isLoading}>Super Fabricate</Button>
            </Box>
        </Card>

        </>
    )
}

export default SuperFabricator;