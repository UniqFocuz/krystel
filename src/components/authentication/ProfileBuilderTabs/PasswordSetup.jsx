import { Box, Button, Flex, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, List, ListIcon, ListItem, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiCheck, BiChevronRight, BiInfoCircle, BiKey, BiLock, BiLockAlt } from "react-icons/bi"
import { useState } from "react"
import { LuAtSign, LuCaseLower, LuCaseUpper, LuHash } from "react-icons/lu"
import { VscEye, VscEyeClosed, VscKey, VscLock } from "react-icons/vsc"
import { useNavigate } from "react-router-dom"
import { setPassword } from "../../../lib/api"


function PasswordSetup(props) {
    const grayColorModeValue = useColorModeValue("gray.600")
    const [isPasswordValid, setIsPasswordValid] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => setShowPassword(!showPassword)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const navigate = useNavigate()
    const toast = useToast()
    const [cred, setCred] = useState({
        password: '',
        confirm: ''
    })
    const lowerCase = (password) => {
        return password !== '' ? /[a-z]/.test(password) : null;
    };
    const lettersCount = (password) => {
        return password !== '' ? /^.{8,}$/.test(password) : null;
    };
    const numbers = (password) => {
        return password !== '' ? /\d/.test(password) : null;
    };
    const upperCase = (password) => {
        return password !== '' ? /[A-Z]/.test(password) : null;
    };
    const specialChars = (password) => {
        return password !== '' ? /[!@#$%^&*()]/.test(password) : null;
    };
    const handlePasswordChange = (e) => {
        const password = e.target.value
        setCred({ ...cred, password });
        if (password === '') {
            setIsPasswordValid(null)
        }
        else {
            if (lettersCount(password)) {
                setIsPasswordValid(true)
            }
            else {
                setIsPasswordValid(false)
            }
        }
    }
    const handleConfirmPasswordChange = (e) => {
        const confirm = e.target.value
        setCred({ ...cred, confirm });
        if (confirm === '') {
            setConfirmPassword(null)
        } else {
            if (cred.password === confirm) {
                setConfirmPassword(true)
            } else {
                setConfirmPassword(false)
            }
        }
    }
    const handleSubmitPassword = async () => {
        props.setIsLoading(true)
        confirmPassword ?
        await setPassword(cred.password)
            .then((response) => {
                toast({
                    title: response.data.message,
                    variant: 'subtle',
                    status: 'success',
                })
                setTimeout(() => {
                    props.setProgress({ ...props.progress, isPasswordSet: true })
                    props.setIsLoading(false)
                }, 1000)
            })
            .catch((error) => {
            })
        : 
        toast({
            title: "Please enter a valid Password!",
            variant: 'subtle',
            status: 'warning',
        })
        setTimeout(() => {
            props.setIsLoading(false)
        }, 1000)
    }

    return (
        <>
            {!props.progress.isPasswordSet ?
                <>
                    <Text fontSize='lg' fontWeight='bold' color={primaryColour}>
                        Let's create a strong Password!
                    </Text>
                    <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
                        Your account security is our top priority. We strongly encourage you to set a strong password to safeguard your personal information and ensure the integrity of your account. By choosing a unique and strong password, you enhance the protection against unauthorized access.
                    </Text>
                    <Box>
                        <InputGroup mb={3}>
                            <InputLeftElement pointerEvents='none'>
                                <VscKey color={primaryColour} />
                            </InputLeftElement>
                            <Input type={showPassword ? 'text' : 'password'} value={cred.password} color={primaryColour} onChange={handlePasswordChange} placeholder='Password' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} focusBorderColor={primaryColour} />
                            <InputRightElement color={primaryColour}>
                                {showPassword ? <VscEyeClosed role="button" onClick={handleShowPassword} /> : <VscEye role="button" onClick={handleShowPassword} />}
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup mb={3}>
                            <InputLeftElement pointerEvents='none'>
                                <VscLock color={primaryColour} />
                            </InputLeftElement>
                            <Input type='password' value={cred.confirm} color={primaryColour} onChange={handleConfirmPasswordChange} placeholder='Re-enter Password' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} isDisabled={isPasswordValid !== true} focusBorderColor={primaryColour} />
                            <InputRightElement color={primaryColour}>
                                {confirmPassword !== null ? confirmPassword ? <BiCheck color="green" /> : <BiInfoCircle color="red" /> : ''}
                            </InputRightElement>
                        </InputGroup>
                        <Flex justifyContent={'end'}>
                            <Text fontSize={'2xs'} fontWeight={'bold'} display={confirmPassword === null ? "none" : confirmPassword ? "none" : "block"} color={primaryColour}> Password do not match!</Text>
                        </Flex>
                        <List spacing={3} fontSize="xs" mt={7}>
                            <ListItem color={lettersCount(cred.password) !== null ? (lettersCount(cred.password) && "green") : grayColorModeValue}>
                                <ListIcon as={lettersCount(cred.password) !== null ? (lettersCount(cred.password) ? BiCheck : BiInfoCircle) : BiKey} fontSize="sm" />
                                Password should be <b>minimum 8 digits</b>
                            </ListItem>
                            <ListItem color={lowerCase(cred.password) !== null ? (lowerCase(cred.password) && "green") : grayColorModeValue}>
                                <ListIcon as={lowerCase(cred.password) !== null ? (lowerCase(cred.password) ? BiCheck : LuCaseLower) : LuCaseLower} fontSize="sm" />
                                Password can include <b>Lowercase</b> character
                            </ListItem>
                            <ListItem color={upperCase(cred.password) !== null ? (upperCase(cred.password) && "green") : grayColorModeValue}>
                                <ListIcon as={upperCase(cred.password) !== null ? (upperCase(cred.password) ? BiCheck : LuCaseUpper) : LuCaseUpper} fontSize="sm" />
                                Password can include <b>Uppercase</b> character
                            </ListItem>
                            <ListItem color={numbers(cred.password) !== null ? (numbers(cred.password) && "green") : grayColorModeValue}>
                                <ListIcon as={numbers(cred.password) !== null ? (numbers(cred.password) ? BiCheck : LuHash) : LuHash} fontSize="sm" />
                                Password can include <b>Numbers</b>
                            </ListItem>
                            <ListItem color={specialChars(cred.password) !== null ? (specialChars(cred.password) && "green") : grayColorModeValue}>
                                <ListIcon as={specialChars(cred.password) !== null ? (specialChars(cred.password) ? BiCheck : BiInfoCircle) : LuAtSign} fontSize="sm" />
                                Password can include <b>Special Characters</b>
                            </ListItem>
                        </List>
                        <Flex mt={5} justifyContent={'space-between'}>
                            <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
                            <Flex gap={3}>
                                <Text my="auto" fontSize={"sm"} fontWeight={'medium'} color={"gray"}><b style={{ color: primaryColourOpaced }}>Set Password</b></Text><IconButton size={'md'} bg={primaryColourOpaced} _hover={{ backgroundColor: primaryColour }} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={handleSubmitPassword} icon={<BiKey />} />
                            </Flex>
                        </Flex>
                    </Box>
                </> :
                <>
                    <Text fontSize='lg' fontWeight='bold' color={primaryColour}>
                        Your password is set!
                    </Text>
                    <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
                        Great! Your account is now secure. If you think you haven't set your password or forgot the password, click <b style={{ color: primaryColour }} onClick={() => navigate('/forgot-password')}>here</b>
                    </Text>
                    <Flex mt={5} justifyContent={'space-between'}>
                        <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
                        <Flex gap={3}>
                            <Text my="auto" fontSize={"sm"} fontWeight={'medium'} color={"gray"}>Next: <b style={{ color: primaryColourOpaced }}>Verify Email</b></Text><IconButton size={'md'} bg={primaryColourOpaced} _hover={{ backgroundColor: primaryColour }} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={props.incrementStepper} icon={<BiChevronRight size={25} />} />
                        </Flex>
                    </Flex>
                </>}
        </>
    )
}

export default PasswordSetup;