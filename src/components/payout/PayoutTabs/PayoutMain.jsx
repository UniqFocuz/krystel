import { Button, Card, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiCheck, BiInfoCircle } from "react-icons/bi";
import { CgRename } from "react-icons/cg";
import { TbHexagonLetterK } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { payout } from "../../../lib/api";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { krystelValuer } from "../../../lib/support";
import { setUserProfile } from "../../../redux/userProfile/actions";
import NumPad from "../../collections/misc/NumPad";

function Payout(){ 
    const [amount, setAmount] = useState(100000); 
    const [isAmountValid, setIsAmountValid] = useState(null); 
    const [amountFeedback, setAmountFeedback] = useState('')
    const [isLoading, setIsLoading] = useState(null); 
    const user = useSelector((state) => state.userReducer);
    const toast = useToast()
    const dispatch = useDispatch()


    const handleAmountChange = (e) => {
        const address = e.target.value
        setAmount(address)
    }

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
        if(user.payoutAddress !== '' & user.payoutAddress !== undefined & user.payoutAddress !== null){
            if(isAmountValid === true){
                await payout(user.payoutAddress, amount)
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
            }
            else{
                toast({
                    title: 'Invalid Amount!',
                    variant: 'subtle',
                    status: 'error',
                })
            }

        } else{
            toast({
                title: 'Invalid Address',
                variant: 'subtle',
                status: 'warning',
            })
        }
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
                        <Input type='text' placeholder='Payout Address' value={user.payoutAddress} readOnly fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>

                    </InputGroup>
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
                {/* <Button marginTop={5} size={'sm'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} onClick={() => handleSubmit()} color={"white"} isLoading={isLoading}>Make Payout</Button> */}
            </Card>
        </>
    )
}

export default Payout