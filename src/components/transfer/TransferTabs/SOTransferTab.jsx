import { Box, Button, Card, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text, useToast } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { soTransferOre, validatePreRegisterEmail, validateUsername } from "../../../lib/api";
import { AiOutlineUser } from "react-icons/ai";
import { BiCheck, BiInfoCircle } from "react-icons/bi";
import NumPad from "../../collections/misc/NumPad";
import { setUserProfile } from "../../../redux/userProfile/actions";

function SOTransferTab() {
    const user = useSelector((state) => state.userReducer);
    const [username, setUsername] = useState('')
    const toast = useToast()
    const [transferLoader, setTransferLoader] = useState(false)
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const [usernameFeedback, setUsernameFeedback] = useState('')
    const [amount, setAmount] = useState(100)
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
    const handleUsernameSubmit = async () => {
        setTransferLoader(true)
        if (isUsernameValid) {
            if (isAmountValid) {
                await soTransferOre(username, amount)
                    .then((response) => {
                        setTransferLoader(false)
                        dispatch(setUserProfile({
                            ...user, kollectibles: {
                                ...user.kollectibles, superOre: (user.kollectibles.superOre - amount)
                            }
                        }))
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
            } else {
                setTransferLoader(false)
                amountInputRef.current.focus()
                toast({
                    title: amountFeedback,
                    variant: 'subtle',
                    status: 'error',
                })
            }
        } else {
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
                if (username !== user.username && username !== user.email) {
                    if (username === '') {
                        setIsUsernameValid(null);
                        setUsernameFeedback('')
                    } else {
                        let response
                        if (username.includes('@') === true) {
                            response = await validatePreRegisterEmail(username)
                            setIsUsernameValid(response.data.exists);
                        } else {
                            response = await validateUsername(username)
                            setIsUsernameValid(response.data.exists);
                        }
                        if (!response.data.exists) {
                            setUsernameFeedback('Invalid User ID or Email!')
                        } else {
                            setUsernameFeedback(`You are transferring to ${response.data.name}`)
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
    }, [username, user.email, user.username]);

    useEffect(() => {
        if (amount < 100) {
            setAmountFeedback('Minimum transfer value is 100 Supre Ores')
            setIsAmountValid(false)
        } else {
            setAmountFeedback(`You are authorising a transfer of ${amount} Super Ores ($ ${(amount/10).toFixed(2)})`)
            setIsAmountValid(true)
        }
        if (user.isAuthenticated) {
            if (parseInt(amount) > user.kollectibles.superOre) {
                setAmountFeedback('Amount exceeding the available limit')
                setIsAmountValid(false)
            }
        }
    }, [amount])
    console.log(user.researchers.length)
    return (
        user.isAuthenticated &&
        <>
            <Card p={5} mb={5}>
                <Flex px={3} justifyContent={"space-between"} mb={3}>
                    <Text my={"auto"} fontSize={'sm'} color={primaryColour} fontWeight={'bold'}>Transfer Super Ores</Text>
                    <Button borderRadius={"20px"} size={'sm'} fontSize={'2xs'}>{user.kollectibles.superOre.toFixed(2)} Super Ores</Button>
                </Flex>
                <Box px={3}>
                {
                    user.payoutAddress.length !== 0 ?
                        user.fabricationCount > 0 ?
                            user.researchers.length > 0? 
                                <>
                                    <InputGroup px={3}>
                                        <InputLeftElement pointerEvents='none'>
                                            <AiOutlineUser color={primaryColour} />
                                        </InputLeftElement>
                                        <Input type='text' ref={usernameInputRef} color={primaryColour} value={username} onChange={handleUsernameChange} placeholder='Receiver User ID or Email' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} focusBorderColor={primaryColour} />
                                        <InputRightElement color={primaryColour}>
                                            {isUsernameValid === null ? '' : isUsernameValid ? <BiCheck role="button" color="green" /> : <BiInfoCircle role="button" color="red" />}
                                        </InputRightElement>
                                    </InputGroup>
                                    <Text mx={3} mt={2} textAlign={'right'} color={primaryColour} fontSize={'xs'}>{usernameFeedback}</Text>

                                    <InputGroup px={3}>
                                        <InputLeftElement pointerEvents='none'>
                                            <AiOutlineUser color={primaryColour} />
                                        </InputLeftElement>
                                        <Input type='text' ref={amountInputRef} color={primaryColour} value={amount} onChange={handleAmountChange} placeholder='Amount' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} focusBorderColor={primaryColour} readOnly />
                                        <InputRightElement color={primaryColour} gap={2} mr={3}>
                                            {isAmountValid ? <BiCheck role="button" color="green" /> : <BiInfoCircle role="button" color="red" />} 
                                        </InputRightElement>
                                    </InputGroup>
                                    <Text mx={3} mt={2} mb={5} textAlign={'right'} color={primaryColour} fontSize={'xs'}>{amountFeedback}</Text>
                                    <NumPad inputValue={amount} setInputValue={setAmount} />
                                    <Flex>
                                    <Button marginTop={5} size={'sm'} ml={'auto'} bg={primaryColourOpaced} _hover={{ backgroundColor: primaryColour }} color={"white"} onClick={() => handleUsernameSubmit()} isLoading={transferLoader}>Send</Button>
                                    </Flex>
                                </>
                            : <>
                                <Text textAlign={'justify'} fontSize={'xs'} color={'gray'} mb={5}>
                                    Transfer will be enabled only if you have researchers under you.
                                </Text>
                            </>
                        : <>
                            <Text textAlign={'justify'} fontSize={'xs'} color={'gray'} mb={5}>
                                Transfer will be enabled after a fabrication is started.
                            </Text>
                        </>
                    : <>
                        <Text textAlign={'justify'} fontSize={'xs'} color={'gray'} mb={5}>
                            Transfer will be enabled after Payout address is added.
                        </Text>
                    </>
                }
                </Box>
            </Card>
        </>
    )
}

export default SOTransferTab