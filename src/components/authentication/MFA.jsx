import { Box, Card, Flex, Text, Input, Button, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react";
import { primaryColour, primaryColourOpaced } from "../../lib/settings";
import { useRef, useEffect, useState } from "react";
import { mfa, pingMfa } from "../../lib/api";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function MFA() {
    const { colorMode, toggleColorMode } = useColorMode();
    const inputRefs = useRef([]);
    const [code, setCode] = useState([]);
    const [validate, setValidate] = useState(false)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const whiteColorModeValue = useColorModeValue("white")
    const grayColorModeValue = useColorModeValue("gray")
    const toast = useToast()
    useEffect(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, []);

    useEffect(() => {
        const loadPage = async() => {
            await pingMfa().then((response) => {
                console.log("success")
                setIsLoading(false)
            }).catch((error) => {
                if(error.response.status === 401){
                    localStorage.removeItem('accessToken')
                    toast({
                    title: `Session Expired!`,
                    variant: 'subtle',
                    status: 'error',
                    })
                    setIsLoading(false)
                    navigate('/login')
                } else if(error.response.status === 308){
                    navigate('/dashboard')
                    toast({
                    title: `You are already logged in!`,
                    variant: 'subtle',
                    status: 'success',
                    })
                }
            })
        }
        loadPage()
    }, [navigate, toast])
  
    const handleInputChange = (index, e) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
          if (index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
          }
          const newCode = [...code];
          newCode[index] = value;
          setCode(newCode);
        }else {
          e.target.value = "";
        }
      };

      const validateOtp = () => {
        setValidate(true)
        mfa(code.join(""))
        .then((response) => {
            localStorage.setItem('accessToken', response.data.accessToken);
            setTimeout(() => {
                setValidate(false)
                navigate('/dashboard')
            }, 3000);
            toast({
            title: `Login Successful!`,
            variant: 'subtle',
            status: 'success',
            })
        })
        .catch((error) => {
            setValidate(false)
            toast({
            title: `Invalid OTP!`,
            variant: 'subtle',
            status: 'error',
            })
        })
      }

  return (
    isLoading ?(
    <>
        Loading...
    </>) :(
    <>
        <Box display={"flex"} padding={5} position={'fixed'} width={"100%"}>
            <Text fontSize={"2xl"} fontWeight={"bolder"} my="auto" mr="auto" color={primaryColour}>krystel.io</Text>
            <Button gap={1} size={"sm"} my="auto" ml="auto" shadow={"md"} variant={'solid'} colorScheme={whiteColorModeValue} onClick={toggleColorMode}>
                {colorMode === "light" ? <BiSolidMoon color={primaryColour} /> : <BiSolidSun color={primaryColour} />}
            </Button>
        </Box>
      <Flex height={"100vh"}>
        <Card padding={10} width={{ base: "70%", md: "45%", lg: "30%", xl: "20%" }} m="auto">
          <Box>
            <Text fontSize={"2xl"} textAlign={"center"} fontWeight={"bold"} color={primaryColour}>
              multi-factor <sup>auth</sup>
            </Text>
            <Text marginY={5} fontSize={"xs"} textAlign={"justify"} color={grayColorModeValue}>
              You are seeing this page since <b style={{ color: primaryColour }}>Multi-Factor Authentication(MFA)</b> is enabled in your account. Your account is now more secure. Please enter the code from your authenticator app.
            </Text>
          </Box>
          <Box>
            <Flex justifyContent="space-between">
              {[...Array(6)].map((_, index) => (
                <Input
                  key={index}
                  variant={"flushed"}
                  fontSize={"xl"}
                  textAlign={"center"}
                  focusBorderColor={primaryColour}
                  borderColor={ validate ? "green" : "gray"}
                  type="number"
                  width="10%"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleInputChange(index, e)}
                />
              ))}
            </Flex>
          </Box>
          <Button marginTop={10} size={'sm'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} onClick={validateOtp} isLoading={validate}>Verify</Button>
        </Card>
      </Flex>
    </>)
  );
}

export default MFA;
