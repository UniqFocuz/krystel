import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text, useToast } from "@chakra-ui/react";
import { maxWidthLayoutSm, primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { CgRename } from "react-icons/cg";
import { useEffect, useState } from "react";
import { TbHexagonLetterK } from "react-icons/tb";
import { BiCheck, BiInfoCircle } from "react-icons/bi";
import { krystelValuer } from "../../../lib/support";
import NumPad from "../../collections/misc/NumPad";
import { payout } from "../../../lib/api";
import { setUserProfile } from "../../../redux/userProfile/actions";

function Payout(){
    const [payoutAddress, setPayoutAddress] = useState(''); 
    const [amount, setAmount] = useState(100000); 
    const [isAddressValid, setIsAddressValid] = useState(null); 
    const [isAmountValid, setIsAmountValid] = useState(null); 
    const [amountFeedback, setAmountFeedback] = useState('')
    const [addressFeedback, setAddressFeedback] = useState('')
    const [isLoading, setIsLoading] = useState(null); 
    const user = useSelector((state) => state.userReducer);
    const tronAddressRegex = /^(T[a-km-zA-HJ-NP-Z0-9]{33})$/;
    const toast = useToast()
    const dispatch = useDispatch()

    function isValidTronAddress(address) {
      return tronAddressRegex.test(address);
    }

    const handlePayoutAddressChange = (e) => {
        const address = e.target.value
        setPayoutAddress(address)
    }

    const handleAmountChange = (e) => {
        const address = e.target.value
        setAmount(address)
    }

    useEffect(() => {
        if(payoutAddress){
            const valid = isValidTronAddress(payoutAddress)
            setIsAddressValid(valid)
            if(valid){
                setAddressFeedback('')
                setIsAddressValid(true)
            }
            else{
                setAddressFeedback('Invalid Payout Address!')
                setIsAddressValid(false)
            }
        }
        else{
            setAddressFeedback('')
            setIsAddressValid(null)
        }
    }, [payoutAddress])

    useEffect(() => {
        if(user.kollectibles.krystel >= amount){
            if(amount >= 100000){
                setIsAmountValid(true)
                setAmountFeedback('')
            } else{
                setIsAmountValid(false)
                setAmountFeedback('Min. Payout should be 1,00,000 Gem6!')
            }
        } else{
            setIsAmountValid(false)
            setAmountFeedback('Amount exceeding the available limit!')
        }
    }, [amount])
    
    const handleSubmit = async() => {
        setIsLoading(true)
        await payout(payoutAddress, amount)
        .then((response) => {
            dispatch(setUserProfile({...user, kollectibles : {
                ...user.kollectibles, krystel : (user.kollectibles.krystel - amount)
            }}))
            toast({
                title: response.data.message,
                variant: 'subtle',
                status: 'success',
            })
        })
        .catch((error) => {
            toast({
                title: error.response.data.message,
                variant: 'subtle',
                status: 'error',
            })
        })
        setIsLoading(false)
    }

    return (
        <>
            <Card p={5}>
                <Flex px={3} justifyContent={"end"} mb={3}>
                    <Button borderRadius={"20px"} size={'sm'} fontSize={'2xs'}>{krystelValuer(user.kollectibles.krystel)}</Button>
                </Flex>
                <Stack rowGap={3}>
                    <InputGroup px={3}>
                        <InputLeftElement pointerEvents='none'>
                        <CgRename color={primaryColour} />
                        </InputLeftElement>
                        <Input type='text' placeholder='Payout Address' value={payoutAddress} onChange={handlePayoutAddressChange} fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                        <InputRightElement color={primaryColour}>
                        {isAddressValid === null ? '' : isAddressValid ? <BiCheck role="button" color="green"/> : <BiInfoCircle role="button" color="red"/> }
                        </InputRightElement>
                    </InputGroup>
                    <Text mx={3} color={'red'} fontSize={'xs'} textAlign={'end'} >{addressFeedback}</Text>
                    <InputGroup px={3}>
                        <InputLeftElement pointerEvents='none'>
                        <TbHexagonLetterK color={primaryColour} />
                        </InputLeftElement>
                        <Input type='text' placeholder='Value' value={amount} onChange={handleAmountChange} fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                        <InputRightElement color={primaryColour}>
                        {isAmountValid === null ? '' : isAmountValid ? <BiCheck role="button" color="green"/> : <BiInfoCircle role="button" color="red"/> }
                        </InputRightElement>
                    </InputGroup>
                    <Text mx={3} color={isAmountValid ? "green" : 'red'} fontSize={'xs'} textAlign={'end'} >{amountFeedback}</Text>
                    <NumPad inputValue={amount} setInputValue={setAmount} />
                </Stack>
                <Button marginTop={5} size={'sm'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} onClick={handleSubmit} isLoading={isLoading}>Make Payout</Button>
            </Card>
        </>
    )
}

export default Payout