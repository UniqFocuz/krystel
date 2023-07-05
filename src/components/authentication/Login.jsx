import { Box, Button, Card, Divider, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { primaryColour, primaryColourOpaced } from "../../lib/settings";
import { AiOutlineUser } from "react-icons/ai";
import { VscEye, VscEyeClosed, VscKey } from "react-icons/vsc";
import { LiaCheckCircle, LiaTimesCircle } from "react-icons/lia";
import { login, pingLogin, validateUsername } from "../../lib/api";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";

function Login(){
    const navigate = useNavigate()
    const { colorMode, toggleColorMode } = useColorMode();
    const [cred, setCred] = useState({
        "username" : '',
        "password" : ''
    })
    const toast = useToast()
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => setShowPassword(!showPassword)
    const [loader, setloader] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isUsernameValid, setIsUsernameValid] = useState(null); // Initial validation status
    const whiteColorModeValue = useColorModeValue("white")
    useEffect(() => {
        const validate = async () => {
            try {
                if (cred.username === '') {
                  setIsUsernameValid(null); // Reset to null when the username field is empty
                } else {
                  const response = await validateUsername(cred.username)
                  setIsUsernameValid(response.data.exists);
                }
              } catch (error) {
                setIsUsernameValid(false);
              }
        };
    

    const typingTimeout = setTimeout(validate, 500); // Wait for 500ms after typing stops before validating

    return () => clearTimeout(typingTimeout); // Cleanup the timeout on unmount or when the username changes
    }, [cred.username]);

    useEffect(() => {
        const loadPage = async() => {
            await pingLogin().then((response) => {
                setIsLoading(false)
            }).catch((error) => {
                if(error.response.status === 308){
                    navigate('/dashboard')
                    toast({
                    title: `You are already logged in!`,
                    variant: 'subtle',
                    status: 'success',
                    })
                }
                else{
                    localStorage.removeItem('accessToken')
                    setIsLoading(false)
                }
            })
        }
        loadPage()
    }, [navigate, toast])

    const handleUsernameChange = (e) => {
        setCred({ ...cred, username: e.target.value });
    };
    const handlePasswordChange = (e) => {
        setCred({ ...cred, password: e.target.value });
    };
    const handleLogin = async () => {
        setloader(true)
          await login(cred)
          .then((response) => {

            localStorage.setItem('accessToken', response.data.accessToken);
            if(response.data.otp_verification){
                setTimeout(() => {
                    setloader(false)
                    navigate('/login/mfa')
                }, 3000);
                toast({
                title: `Redirecting to Multi-Factor Authentication`,
                variant: 'subtle',
                status: 'success',
                })
            } else{
                setTimeout(() => {
                    setloader(false)
                    navigate('/dashboard')
                }, 3000);
                toast({
                title: `Login Successful!`,
                variant: 'subtle',
                status: 'success',
                })
            }
          })
          .catch((error) => {
            toast({
              title: `Invalid Password!`,
              variant: 'subtle',
              status: 'error',
            })
            setTimeout(() => {
                setCred({ ...cred, password: '' });
                setloader(false)
            }, 3000);
        })
         
      };
    return(
        isLoading ?(
        <>
        Loading ...
        </>) :(
        <>
            <Box display={"flex"} padding={5} position={'fixed'} width={"100%"}>
                <Text fontSize={"2xl"} fontWeight={"bolder"} my="auto" mr="auto" color={primaryColour}>krystel.io</Text>
                <Button gap={1} size={"sm"} my="auto" ml="auto" shadow={"md"} variant={'solid'} colorScheme={whiteColorModeValue} onClick={toggleColorMode}>
                    {colorMode === "light" ? <BiSolidMoon color={primaryColour} /> : <BiSolidSun color={primaryColour} />}
                </Button>
            </Box>
            <Flex height={'100vh'}>
                <Card padding={10} width={{base: "70%", md: "45%", lg: "30%", xl: "20%"}} m="auto">
                    <Text textAlign={'center'} color={primaryColour} fontSize={'2xl'} fontWeight={'bolder'}>log <sup>in</sup> </Text>
                    <Stack marginY={5} spacing={4}>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                            <AiOutlineUser color={primaryColour} />
                            </InputLeftElement>
                            <Input type='tel' color={primaryColour} value={cred.username} onChange={handleUsernameChange}  placeholder='Username' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                            <InputRightElement color={primaryColour}>
                            {isUsernameValid == null ? '' : isUsernameValid ? <LiaCheckCircle role="button" color="green"/> : <LiaTimesCircle role="button" color="red"/> }
                            </InputRightElement>
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <VscKey color={primaryColour}/>
                            </InputLeftElement>
                            <Input type={showPassword ? 'text' : 'password'} value={cred.password} color={primaryColour} onChange={handlePasswordChange} placeholder='Password' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                            <InputRightElement color={primaryColour}>
                            {showPassword ? <VscEyeClosed role="button" onClick={handleShowPassword}/> : <VscEye role="button" onClick={handleShowPassword}/> }
                            </InputRightElement>
                        </InputGroup>
                        <Box textAlign={'end'}>
                            <Text fontSize={'xs'} color={primaryColourOpaced} fontWeight={'bold'} role="button">Forgot Password</Text>
                        </Box>
                    </Stack>
                    <Button size={'sm'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} onClick={handleLogin} isDisabled={isUsernameValid !== true} isLoading={loader}>Login</Button>
                    <Divider marginY={5} color={'gray.300'}/>
                    <Box display={"flex"} gap={1} fontSize={'xs'} justifyContent={'center'}>
                        <Text color={'gray.500'}>New to krystel.io?</Text> <Text color={primaryColour} fontWeight={'bold'} role="button">Register</Text>
                    </Box>
                </Card>
            </Flex>
        </>)
    )
}

export default Login;