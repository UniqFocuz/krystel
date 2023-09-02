import { Box, Button, Card, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text, useToast } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";
import NumPad from "../../collections/misc/NumPad";
import { krystelFragmentor} from "../../../lib/api";
import { setUserProfile } from "../../../redux/userProfile/actions";
import { krystelValuer } from "../../../lib/support";

function FragmentationTab(){
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch()
    const toast = useToast()
    const [amount, setAmount] = useState(10000)
    const [amountFeedback, setAmountFeedback] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleAmountChange = (e) => {
        const amount = parseFloat(e.target.value)
        setAmount(amount)
    }
    const handleSubmit = async() => {
        setIsLoading(true)
        await krystelFragmentor(amount)
        .then((response) => {
            setIsLoading(false)
            dispatch(setUserProfile({...user, kollectibles : {
                ...user.kollectibles, krystel : user.kollectibles.krystel - (amount*1.05), ore : user.kollectibles.ore + amount/1000
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
                <Button borderRadius={"20px"} size={'sm'} fontSize={'2xs'}>{krystelValuer(user.kollectibles.krystel)}</Button>
            </Flex>
            <Box px={3}>
                <Text textAlign={'justify'} fontSize={'xs'} color={'gray'} mb={5}>Fragmentor converts your Krystel to Naive Ore. This process can be used to exchange your community rewards to Naive ore for further Research processes. A surcharge of 5% is levied and sent to the community</Text>
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

export default FragmentationTab