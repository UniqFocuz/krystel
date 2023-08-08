import { Button, Card, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text, useToast } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { transferOre, validatePreRegisterEmail, validateUsername } from "../../../lib/api";
import { AiOutlineUser } from "react-icons/ai";
import { BiCheck, BiInfoCircle } from "react-icons/bi";
import NumPad from "../../collections/misc/NumPad";
import { setUserProfile } from "../../../redux/userProfile/actions";

function TransferTab(){
    const user = useSelector((state) => state.userReducer);
    const [username, setUsername] = useState('')
    const toast = useToast()
    const [transferLoader, setTransferLoader] = useState(false)
    const [isUsernameValid, setIsUsernameValid] = useState(null); 
    const [usernameFeedback, setUsernameFeedback] = useState('')
    const [amount, setAmount] = useState(10)
    const [isAmountValid, setIsAmountValid] = useState(false); 
    const [amountFeedback, setAmountFeedback] = useState('')
    const usernameInputRef = useRef(null);
    const amountInputRef = useRef(null);
    const dispatch = useDispatch()

    const handleUsernameChange = (e) => {
        const username = e.target.value.toUpperCase()
        setUsername(username)
    }
    const handleAmountChange = (e) => {
        const amount = e.target.value
        setAmount(amount)
    }
    const handleUsernameSubmit = async() => {
        setTransferLoader(true)
        if(isUsernameValid){
            if(isAmountValid){
                await transferOre(username, amount)
                .then((response) => {
                    setTransferLoader(false)
                    dispatch(setUserProfile({...user, kollectibles : {
                        ...user.kollectibles, ore : (user.kollectibles.ore - amount)
                    }}))
                    setUsername('')
                    setAmount(10)
                    toast({
                        title: response.data.message,
                        variant: 'subtle',
                        status: 'success',
                    })
                })
                .catch((error) => {
                    setTransferLoader(false)
                    toast({
                        title: error.response.data.message,
                        variant: 'subtle',
                        status: 'info',
                    })
                })
            } else{
                setTransferLoader(false)
                amountInputRef.current.focus()
                toast({
                    title: amountFeedback,
                    variant: 'subtle',
                    status: 'error',
                })
            }
        } else{
            setTransferLoader(false)
            usernameInputRef.current.focus()
            toast({
                title: usernameFeedback,
                variant: 'subtle',
                status: 'error',
            })
        }
    }

    useEffect(() => {
        const validate = async () => {
            try {
                if (username !== user.username && username !== user.email){
                    if (username === '') {
                    setIsUsernameValid(null);
                    setUsernameFeedback('')
                    } else {
                        let response
                        if(username.includes('@') === true){
                            response = await validatePreRegisterEmail(username)
                            setIsUsernameValid(response.data.exists);
                        } else {
                            response = await validateUsername(username)
                            setIsUsernameValid(response.data.exists);
                        }
                        if(!response.data.exists){
                            setUsernameFeedback('Invalid User ID or Email!')
                        } else{
                            setUsernameFeedback('')
                        }
                    }
                } else {
                    setIsUsernameValid(false);
                    setUsernameFeedback('You cannot transfer to yourself!')
                }
                } catch (error) {
                    setIsUsernameValid(false);
                    setUsernameFeedback('An Error occured!')
                }
        };
    

    const typingTimeout = setTimeout(validate, 500);

    return () => clearTimeout(typingTimeout);
    }, [username]); 

    useEffect(() => {
        if(amount < 10){
            setAmountFeedback('Minimum transfer value is 10 Ores')
            setIsAmountValid(false)
        } else {
            setAmountFeedback('')
            setIsAmountValid(true)
        }
        if(user.isAuthenticated){
            if(parseInt(amount) > user.kollectibles.ore){
                setAmountFeedback('Amount exceeding the available limit')
                setIsAmountValid(false)
            }
        }
    }, [amount])

    return(
        user.isAuthenticated &&
        <>
        <Card p={5} mb={5}>
            <Flex px={3} justifyContent={"space-between"} mb={3}>
                <Text my={"auto"} fontSize={'sm'} color={primaryColour} fontWeight={'bold'}>Transfer Ores</Text>
                <Button borderRadius={"20px"} size={'sm'} fontSize={'2xs'}>{user.kollectibles.ore} Ores</Button>
            </Flex>
            <InputGroup px={3}>
                <InputLeftElement pointerEvents='none'>
                <AiOutlineUser color={primaryColour} />
                </InputLeftElement>
                <Input type='text' ref={usernameInputRef} color={primaryColour} value={username} onChange={handleUsernameChange}  placeholder='Receiver User ID or Email' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                <InputRightElement color={primaryColour}>
                {isUsernameValid === null ? '' : isUsernameValid ? <BiCheck role="button" color="green"/> : <BiInfoCircle role="button" color="red"/> }
                </InputRightElement>
            </InputGroup>
            <Text mt={2} textAlign={'right'} color={primaryColour} fontSize={'xs'}>{usernameFeedback}</Text>

            <InputGroup px={3}>
                <InputLeftElement pointerEvents='none'>
                <AiOutlineUser color={primaryColour} />
                </InputLeftElement>
                <Input type='text' ref={amountInputRef} color={primaryColour} value={amount} onChange={handleAmountChange}  placeholder='Amount' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour} readOnly/>
                <InputRightElement color={primaryColour}>
                {isAmountValid ? <BiCheck role="button" color="green"/> : <BiInfoCircle role="button" color="red"/> }
                </InputRightElement>
            </InputGroup>
            <Text mx={3} mt={2} mb={5} textAlign={'right'} color={primaryColour} fontSize={'xs'}>{amountFeedback}</Text>
            <NumPad  inputValue={amount} setInputValue={setAmount}/>

            <Button marginTop={5} size={'sm'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} onClick={() => handleUsernameSubmit()} isLoading={transferLoader}>Send</Button>
        </Card>
        </>
    )
}

export default TransferTab