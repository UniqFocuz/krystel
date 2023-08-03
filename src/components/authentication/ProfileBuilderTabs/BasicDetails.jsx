import { Box, Button, Flex, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Radio, RadioGroup, Select, Stack, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiCheck, BiChevronRight, BiInfoCircle, BiSolidHeart, BiUserCheck, BiUserPlus } from "react-icons/bi"
import { useEffect, useState } from "react"
import { AiOutlineUser } from "react-icons/ai"
import { profileBuilder, validatePatron, validateUsername } from "../../../lib/api"
import { LuCalendarHeart, LuCaseLower } from "react-icons/lu"
import { useNavigate } from "react-router-dom"


function BasicDetails(props) {
    const grayColorModeValue = useColorModeValue("gray.600")
    const [isUsernameValid, setIsUsernameValid] = useState(null)
    const [isPatronValid, setisPatronValid] = useState(null)
    const [patronFeedback, setPatronFeedback] = useState('')
    const [isAgeValid, setIsAgeValid] = useState(null)
    const [hasSplChars, setHasSplChars] = useState(null)
    const [selectedLab, setSelectedLab] = useState("alpha");
    const navigate = useNavigate()
    const toast = useToast()
    const regex = (username) => {
        return /^[a-zA-Z0-9]{6,}$/.test(username)
    }
    useEffect(() => {
        const validate = async () => {
            try {
                if (props.progress.data.username === '') {
                    setIsUsernameValid(null); // Reset to null when the username field is empty
                    setHasSplChars(null)
                } else {
                    if (regex(props.progress.data.username) === true) {
                        const response = await validateUsername(props.progress.data.username)
                        setIsUsernameValid(!response.data.exists)
                        setHasSplChars(false)
                    } else {
                        setIsUsernameValid(false)
                        setHasSplChars(true)
                    }
                }
            } catch (error) {
                setIsUsernameValid(true);
            }
        };
        const typingTimeout = setTimeout(validate, 1000);
        return () => clearTimeout(typingTimeout);
    }, [props.progress.data.username]);

    useEffect(() => {
        const validate = async () => {
            try {
                if (props.progress.data.patron === '') {
                    setisPatronValid(null); // Reset to null when the username field is empty
                } else {
                    const response = await validatePatron(props.progress.data.patron)
                    setisPatronValid(response.data.exists)
                    setPatronFeedback(response.data.message)
                }
            } catch (error) {
                setisPatronValid(false);
            }
        };
        const typingTimeout = setTimeout(validate, 1000);
        return () => clearTimeout(typingTimeout);
    }, [props.progress.data.patron]);

    useEffect(() => {
        if (props.progress.data.dateOfBirth === null) {
            setIsAgeValid(null)
        } else {
            setIsAgeValid(verifyAge(props.progress.data.dateOfBirth))
        }
    }, [props.progress.data.dateOfBirth])

    function verifyAge(birthDate) {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        if (age >= 18) {
            return true;
        } else {
            return false;
        }
    }
    const handlePatronChange = (e) => {
        const patron = e.target.value.toUpperCase()
        props.setProgress({
            ...props.progress, data: {
                ...props.progress.data, patron
            }
        })
    };
    const handleFirstNameChange = (e) => {
        const firstName = e.target.value
        props.setProgress({
            ...props.progress, data: {
                ...props.progress.data, firstName
            }
        })
    };
    const handleLastNameChange = (e) => {
        const lastName = e.target.value
        props.setProgress({
            ...props.progress, data: {
                ...props.progress.data, lastName
            }
        })
    };
    const handleDateOfBirthChange = (e) => {
        const dateOfBirth = e.target.value
        props.setProgress({
            ...props.progress, data: {
                ...props.progress.data, dateOfBirth
            }
        })
    };
    const handleNickNameChange = (e) => {
        const nickName = e.target.value
        props.setProgress({
            ...props.progress, data: {
                ...props.progress.data, nickName
            }
        })
    };
    const handleLabChange = (value) => {
        setSelectedLab(value);
        props.setProgress({
          ...props.progress,
          data: {
            ...props.progress.data,
            lab: value
          }
        });
      };
    const handleSubmitDetails = async() => {
        props.setIsLoading(true)
        if(isAgeValid){
                if(isPatronValid){
                    await profileBuilder(props.progress.data)
                    .then((response) => {
                        toast({
                            title: response.data.message,
                            variant: 'subtle',
                            status: 'success',
                        })
                        setTimeout(() => {
                            props.setProgress({ ...props.progress, isPatronSet: true })
                            props.setIsLoading(false)
                        }, 3000)
                    }) .catch((error) => {
                        toast({
                            title: error.response.data.message,
                            variant: 'subtle',
                            status: 'error',
                        })
                    })
                } else {
                    toast({
                        title: `Cannot find Patron!`,
                        variant: 'subtle',
                        status: 'error',
                    })
                }
        } else{
            toast({
                title: `As per our Policy, Users must be 18 years old!`,
                variant: 'subtle',
                status: 'error',
            })
        }
        setTimeout(() => {
            props.setIsLoading(false)
        }, 3000)
    }
    return (
        !props.progress.isPatronSet ?
        <>
            <Text fontSize='md' fontWeight='bold' color={primaryColour}>
                Heads up for a Quick Start!
            </Text>
            <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
                Let's fill in few important details! While Username, Patron and Date of Birth are mandatory, you can always change your Name and Nick Name whenever you want!
            </Text>
            <Box>
                <InputGroup mb={2}>
                    <InputLeftElement pointerEvents='none'>
                        <AiOutlineUser color={primaryColour} />
                    </InputLeftElement>
                    <Input type='text' color={primaryColour} value={props.progress.data.username} fontSize={"sm"} fontWeight={'medium'} variant={'flushed'} focusBorderColor={primaryColour} readOnly />
                </InputGroup>
                <Flex justifyContent={'end'}>
                    <Text fontSize={'2xs'} width={"70%"} mt={1} textAlign={'end'} fontWeight={'bold'} color={primaryColour}>{
                        isUsernameValid === null
                            ? '' : hasSplChars === null ? '' : hasSplChars === true
                                ? 'Username must be atleast 6 chars and only be combination of letters and numbers. Other characters are not allowed!'
                                : ''}</Text>
                </Flex>
                <InputGroup my={2}>
                    <InputLeftElement pointerEvents='none'>
                        <BiUserCheck color={primaryColour} />
                    </InputLeftElement>
                    <Input type='text' color={primaryColour} value={props.progress.data.patron} onChange={handlePatronChange} placeholder='Patron' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} focusBorderColor={primaryColour} />
                    <InputRightElement color={primaryColour}>
                        {isPatronValid === null ? '' : isPatronValid ? <BiCheck role="button" color="green" /> : <BiInfoCircle role="button" color="red" />}
                    </InputRightElement>
                </InputGroup>
                <Flex justifyContent={'end'}>
                    <Text fontSize={'2xs'} width={"70%"} mt={1} textAlign={'end'} fontWeight={'bold'} color={primaryColour}>{patronFeedback}</Text>
                </Flex>
                <Flex px={3} my={2}>
                <RadioGroup size={'sm'} colorScheme="orange" onChange={handleLabChange} value={selectedLab}>
                    <Stack direction='row' gap={5} >
                        <Text fontSize={'sm'} fontWeight={'bold'} color={primaryColour}>Lab of the Patron </Text>
                        <Radio value='alpha'>Lab Alpha</Radio>
                        <Radio value='beta'>Lab Beta</Radio>
                    </Stack>
                </RadioGroup>
                </Flex>
                <Flex gap={5}>
                    <InputGroup my={2}>
                        <InputLeftElement pointerEvents='none'>
                            <LuCaseLower color={primaryColour} />
                        </InputLeftElement>
                        <Input type='text' color={primaryColour} value={props.progress.data.firstName} onChange={handleFirstNameChange} placeholder='First Name' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} focusBorderColor={primaryColour} />
                    </InputGroup>
                    <InputGroup my={2}>
                        <InputLeftElement pointerEvents='none'>
                            <LuCaseLower color={primaryColour} />
                        </InputLeftElement>
                        <Input type='text' color={primaryColour} value={props.progress.data.lastName} onChange={handleLastNameChange} placeholder='Last Name' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} focusBorderColor={primaryColour} />
                    </InputGroup>
                </Flex>
                <Flex gap={5}>
                    <InputGroup my={3} width={"50%"}>
                        <InputLeftElement pointerEvents='none'>
                            <LuCalendarHeart color={primaryColour} />
                        </InputLeftElement>
                        <Input type='date' color={primaryColour} value={props.progress.data.dateOfBirth} onChange={handleDateOfBirthChange} placeholder='Last Name' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} focusBorderColor={primaryColour} />
                    </InputGroup>
                    <Flex width={"50%"}>
                        <Text my={"auto"} color={primaryColour} fontSize={'xs'}>{isAgeValid !== null && !isAgeValid && 'Must be 18 years or above!'}</Text>
                    </Flex>
                </Flex>
                <InputGroup my={2}>
                    <InputLeftElement pointerEvents='none'>
                        <BiSolidHeart color={primaryColour} />
                    </InputLeftElement>
                    <Input type='text' color={primaryColour} value={props.progress.data.nickName} onChange={handleNickNameChange} placeholder='Nick Name' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} focusBorderColor={primaryColour} />
                </InputGroup>
            </Box>
            <Flex mt={5} justifyContent={'space-between'}>
                <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
                <Flex gap={3}>
                    <Text my="auto" fontSize={"sm"} fontWeight={'medium'} color={"gray"}><b style={{ color: primaryColourOpaced }}>Submit</b></Text><IconButton size={'md'} bg={primaryColourOpaced} _hover={{ backgroundColor: primaryColour }} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={handleSubmitDetails} icon={<BiChevronRight size={25} />}/>
                </Flex>
            </Flex>
        </> :
        <>
        <Text fontSize='lg' fontWeight='bold' color={primaryColour}>
            Know Yourself as, {props.progress.data.username}!
        </Text>
        <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
            Your basic details are updated. A unique username is very important to identify yourself in the community. So we have given you a username - <b style={{color: primaryColour}}>{props.progress.data.username}</b>, which can be used to login.
        </Text>
        <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
            Now that we have completed most of the tasks, you can use your Username or Email to login <b style={{ color: primaryColour }} onClick={() => navigate('/login')}>here</b> or proceed further to complete your profile!
        </Text>
        <Flex mt={5} justifyContent={'space-between'}>
            <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
            <Flex gap={3}>
                <Text my="auto" fontSize={"sm"} fontWeight={'medium'} color={"gray"}>Next: <b style={{ color: primaryColourOpaced }}>MFA</b></Text><IconButton size={'md'} bg={primaryColourOpaced} _hover={{ backgroundColor: primaryColour }} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={props.incrementStepper} icon={<BiChevronRight size={25} />} />
            </Flex>
        </Flex>
        </>
    )
}

export default BasicDetails;