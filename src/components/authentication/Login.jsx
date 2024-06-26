import { Box, Button, Card, Divider, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { maxWidthLayoutSm, primaryColour, primaryColourOpaced } from "../../lib/settings";
import { AiOutlineUser } from "react-icons/ai";
import { VscEye, VscEyeClosed, VscKey } from "react-icons/vsc";
import { login, pingLogin, validatePreRegisterEmail, validateUsername } from "../../lib/api";
import { BiCheck, BiInfoCircle } from "react-icons/bi";

function Login(){
    const navigate = useNavigate()
    const [cred, setCred] = useState({
        username : '',
        password : ''
    })
    const toast = useToast()
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => setShowPassword(!showPassword)
    const [loader, setloader] = useState(false)
    const [isPageLoading, setIsPageLoading] = useState(true)
    const [isUsernameValid, setIsUsernameValid] = useState(null); 
    const [usernameFeedback, setUsernameFeedback] = useState(false)
    useEffect(() => {
        const validate = async () => {
            try {
                if (cred.username === '') {
                  setIsUsernameValid(null); 
                  setUsernameFeedback('')
                } else {
                    if (cred.username.includes('#') === true){
                        const response = await validateUsername(cred.username.slice(1,))
                        setIsUsernameValid(response.data.exists);
                        if(response.data.exists){
                            setUsernameFeedback(`Welcome back ${response.data.name}!`)
                        } else{
                            setUsernameFeedback('')
                        }

                    } else
                    if(cred.username.includes('@') === true){
                        const response = await validatePreRegisterEmail(cred.username)
                        setIsUsernameValid(response.data.exists);
                        if(response.data.exists){
                            setUsernameFeedback(`Welcome back ${response.data.name}!`)
                        } else{
                            setUsernameFeedback('')
                        }
                    } else {
                        const response = await validateUsername(cred.username)
                        setIsUsernameValid(response.data.exists);
                        if(response.data.exists){
                            setUsernameFeedback(`Welcome back ${response.data.name}!`)
                        } else{
                            setUsernameFeedback('')
                        }
                    }
                }
              } catch (error) {
                setIsUsernameValid(false);
                setUsernameFeedback('')
              }
        };
    

    const typingTimeout = setTimeout(validate, 500); 

    return () => clearTimeout(typingTimeout); 
    }, [cred.username]);

    useEffect(() => {
        const loadPage = async() => {
            localStorage.getItem('accessToken') !== null ?
                await pingLogin().then((response) => {
                    setIsPageLoading(false)
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
                    }
                }).finally(() => {
                    setIsPageLoading(false)
                })
                : setIsPageLoading(false)
        }
        loadPage()
    }, [navigate, toast])

    const handleUsernameChange = (e) => {
        setCred({ ...cred, username: e.target.value.toUpperCase() });
    };
    const handlePasswordChange = (e) => {
        setCred({ ...cred, password: e.target.value });
    };
    const handleLogin = async () => {
        setloader(true)
          await login(cred.username, cred.password)
          .then((response) => {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('inspectorToken', response.data.inspectorToken);
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
              title: error.response.data.error,
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
        isPageLoading ?(
        <>
        Loading ...
        </>) :(
        <>
            <Flex height={'100vh'}>
                <Card padding={10} width="90%" maxWidth={maxWidthLayoutSm} m="auto">
                    <Text textAlign={'center'} color={primaryColour} fontSize={'2xl'} fontWeight={'bolder'}>log <sup>in</sup> </Text>
                    <Stack marginY={5}>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                            <AiOutlineUser color={primaryColour} />
                            </InputLeftElement>
                            <Input type='text' color={primaryColour} value={cred.username} onChange={handleUsernameChange}  placeholder='User ID or Email' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                            <InputRightElement color={primaryColour}>
                            {isUsernameValid === null ? '' : isUsernameValid ? <BiCheck role="button" color="green"/> : <BiInfoCircle role="button" color="red"/> }
                            </InputRightElement>
                        </InputGroup>
                        <Flex justifyContent={'end'}>
                            <Text fontSize={'2xs'} width={"70%"}textAlign={'end'} fontWeight={'bold'} color={"green"}>{usernameFeedback}</Text>
                        </Flex>

                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <VscKey color={primaryColour}/>
                            </InputLeftElement>
                            <Input type={showPassword ? 'text' : 'password'} value={cred.password} color={primaryColour} onChange={handlePasswordChange} placeholder='Password' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'}  isDisabled={isUsernameValid !== true} focusBorderColor={primaryColour}/>
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
                        <Text color={'gray.500'}>New to krystel.io?</Text> <Text color={primaryColour} fontWeight={'bold'} role="button" onClick={() => navigate('/register')}>Register</Text>
                    </Box>
                </Card>
            </Flex>
        </>)
    )
}

export default Login;