import { Box, Button, Card, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { AiOutlineUser } from "react-icons/ai";
import { BiCheck, BiInfoCircle } from "react-icons/bi";
import { useState } from "react";
import NumPad from "../../collections/misc/NumPad";

function SuperOreTransfer(){
    const user = useSelector((state) => state.userReducer);
    const [amount, setAmount] = useState(10)
    const [amountFeedback, setAmountFeedback] = useState('')
    const [isAmountValid, setIsAmountValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleAmountChange = (e) => {
        const amount = parseFloat(e.target.value)
        setAmount(amount)
    }
    const handleSubmit = () => {
        setIsLoading(true)
    }
    return(
        <>
        <Card p={5}>
            <Flex px={3} justifyContent={"end"} mb={3}>
                <Button borderRadius={"20px"} size={'sm'} fontSize={'2xs'}>{user.kollectibles.ore} Ores</Button>
            </Flex>
            <Box px={3}>
                <Text textAlign={'justify'} fontSize={'xs'} color={'gray'} mb={5}>Defabricator converts your Super Ores to Naive Ore. This process can be used to exchange your community rewards to Naive ore for further Research processes</Text>
                <InputGroup px={3}>
                    <InputLeftElement pointerEvents='none'>
                    <AiOutlineUser color={primaryColour} />
                    </InputLeftElement>
                    <Input type='number' color={primaryColour} value={amount} onChange={handleAmountChange} fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
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