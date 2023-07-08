import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react"
import QRCode from "qrcode.react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { useRef, useState } from "react";
import { confirmNewDevice } from "../../../lib/api";

function ViewKeyModal(props) {
    const inputRefs = useRef([]);
    const [code, setCode] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast()
    const handleInputChange = (index, e) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
        } else {
            e.target.value = "";
        }
    };

    const validateOtp = async() => {
        setIsLoading(true)
        await confirmNewDevice(code.join(""), props.currentDevice.id)
        .then((response) => {
            toast({
                title: response.data.message,
                variant: 'subtle',
                status: 'success',
            })
            props.setCurrentDevice({...props.currentDevice, confirmed: true })
            props.handleDeviceConfirmation(props.currentDevice.id)
            setTimeout(() => {
                setIsLoading(false)
                props.onClose()
            }, 3000)
        }) .catch((error) => {
            toast({
                title: 'Invalid OTP!',
                variant: 'subtle',
                status: 'error',
            })
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)

        })
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
          .then(() => {
                toast({
                    title: `Copied to Clipboard!`,
                    variant: 'subtle',
                    status: 'info',
                })
          })
    }
    return (
        <>
            <Box>
                <Flex justifyContent={'center'} mb={5}>
                    <QRCode fgColor={primaryColour} bgColor="#00000000" value={props.currentDevice.URI} />
                </Flex>
                <Box textAlign={'center'} >
                    <Text fontSize={'xs'}>Scan this QR Code in Google Authenticator, Microsoft Authenticator or any Time-Based Authentication Applications</Text>
                </Box>
                <Text marginY={5} fontSize={"xs"} textAlign={"justify"}>
                    Enter the Code that appears in your Authenticator app to activate this device and click "Verify"
                </Text>
                <Box px={5}>
                    <Flex justifyContent="space-between">
                        {[...Array(6)].map((_, index) => (
                            <Input
                                key={index}
                                variant={"flushed"}
                                fontSize={"xl"}
                                textAlign={"center"}
                                focusBorderColor={primaryColour}
                                borderColor={isLoading ? "green" : "gray"}
                                type="number"
                                width="10%"
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleInputChange(index, e)}
                            />
                        ))}
                    </Flex>
                </Box>
                <Flex justifyContent={'end'} px={5}>
                    <Button marginTop={10} size={'sm'} bg={primaryColourOpaced} _hover={{ backgroundColor: primaryColour }} color={"white"} onClick={validateOtp} isLoading={isLoading}>Verify</Button>
                </Flex>
                <Text textAlign={'center'} color={'gray'} my={5}>or</Text>
                <Box fontSize={'xs'}>
                    <Text my={3}>Use the below details to create a Authentication Code Resolver</Text>
                    <Flex gap={3}><b style={{color: primaryColour}}>Secret:</b> <Text>{props.currentDevice.secret}</Text> </Flex>
                    <Flex gap={3}><b style={{color: primaryColour}}>Time:</b> <Text>30s</Text></Flex>
                    <Flex gap={3}><b style={{color: primaryColour}}>Alogrithm:</b> <Text>SHA1</Text></Flex>
                    <Flex justifyContent={'end'}><Button  size={'xs'} fontSize={'xs'} bg={primaryColourOpaced} _hover={{ backgroundColor: primaryColour }} color={"white"}  onClick={() => {copyToClipboard(props.currentDevice.secret)}}>Copy Secret</Button></Flex>
                </Box>
            </Box>
        </>
    )
}

export default ViewKeyModal