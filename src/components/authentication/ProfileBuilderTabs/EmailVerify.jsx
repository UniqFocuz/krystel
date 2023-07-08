import { Box, Button, Flex, IconButton, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiChevronRight } from "react-icons/bi"
import { sendVerificationLink } from "../../../lib/api"


function EmailVerify(props) {
    const grayColorModeValue = useColorModeValue("gray.600")
    const toast = useToast()
    const handleSendVerificationLink = async() => {
        await sendVerificationLink()
        .then((response) => {
            toast({
                title: response.data.message,
                variant: 'subtle',
                status: 'success',
            })
        })
        .catch((error) => {
            console.log(error.response)
        })
    }
    return (
        <>
            {!props.progress.isEmailVerified ?
                <>
                    <Text fontSize='md' fontWeight='bold' color={primaryColour}>
                        Verify your email!
                    </Text>
                    <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
                        By now, you would have receieved a welcome mail from us. Please verify your email using the link sent over the welcome mail. If you haven't received the welcome mail, please click <b style={{color: primaryColour}} role="button" onClick={handleSendVerificationLink}>here</b>, so that we will send the verification link once again!
                    </Text>
                    <Text marginBottom={5} fontSize={"sm"} textAlign={"justify"} color='gray'>
                        If you cannot find the mail in your inbox, please check your spam/junk folder. You may skip this step to verify your email later!
                    </Text>
                </> :
                <>
                    <Text fontSize='md' fontWeight='bold' color={primaryColour}>
                        Wooh! You email is verified!
                    </Text>
                    <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
                        Your email is verified and now your account is more secure with a valid email. Rememeber, Important updates, security changes and authentication services will be carried only using your email!
                    </Text>
                </>
            }
            <Flex mt={5} justifyContent={'space-between'}>
                <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
                <Flex gap={3}>
                    <Text my="auto" fontSize={"sm"} fontWeight={'medium'} color={"gray"} >Next: <b style={{color: primaryColourOpaced}}>Account</b></Text>
                    <IconButton size={'md'} bg={primaryColourOpaced} _hover={{ backgroundColor: primaryColour }} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={props.incrementStepper} icon={<BiChevronRight size={25} />} />
                </Flex>
            </Flex>
        </>
    )
}

export default EmailVerify;