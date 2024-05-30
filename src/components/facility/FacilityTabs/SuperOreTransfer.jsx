import { Box, Button, Card, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text, useToast } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { AiOutlineUser } from "react-icons/ai";
import { BiCheck, BiInfoCircle } from "react-icons/bi";
import { useState } from "react";
import NumPad from "../../collections/misc/NumPad";
import { superOreTransfer, superOreTransferOre } from "../../../lib/api";
import { setUserProfile } from "../../../redux/userProfile/actions";

function SuperOreTransfer(){
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch()
    const toast = useToast()
    const [amount, setAmount] = useState(10)
    const [amountFeedback, setAmountFeedback] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleAmountChange = (e) => {
        const amount = parseFloat(e.target.value)
        setAmount(amount)
    }
    const handleSubmit = async() => {
        setIsLoading(true)
        await superOreTransfer(amount)
        .then((response) => {
            setIsLoading(false)
            dispatch(setUserProfile({...user, kollectibles : {
                ...user.kollectibles, superOre : user.kollectibles.superOre - amount, ore : user.kollectibles.ore + amount*0.95
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
    return(
        <>
        <Card p={5}>
            <Flex px={3} justifyContent={"end"} mb={3}>
                <Button borderRadius={"20px"} size={'sm'} fontSize={'2xs'}>{user.kollectibles.superOre} S.Ores</Button>
            </Flex>
            <Box px={3}>
                <Text textAlign={'justify'} fontSize={'xs'} color={'gray'} mb={5}>Defabricator converts your Super Ores to Naive Ore. This process can be used to exchange your community rewards to Naive ore for further Research processes. A surcharge of 10% is levied and sent to the community</Text>
                <InputGroup px={3}>
                    <InputLeftElement pointerEvents='none'>
                    <AiOutlineUser color={primaryColour} />
                    </InputLeftElement>
                    <Input type='number' color={primaryColour} value={amount} onChange={handleAmountChange} fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour} readOnly/>
                    <InputRightElement color={primaryColour}></InputRightElement>
                </InputGroup>
                <Text mt={2} mx={3} textAlign={'right'} color={primaryColour} fontSize={'xs'}>{amountFeedback}</Text>
                <NumPad inputValue={amount} setInputValue={setAmount}/>
                <Button marginTop={5} width={"100%"} size={'sm'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} onClick={() => handleSubmit()} isLoading={isLoading}>Defrabricate</Button>
            </Box>
        </Card>
        </>
    )
}

export default SuperOreTransfer