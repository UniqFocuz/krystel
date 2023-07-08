import { Box, Button, Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiChevronRight } from "react-icons/bi"
import MFASetting from "../../settings/MFASettings"


function MFASetup(props) {
    const grayColorModeValue = useColorModeValue("gray.600")
    return (
        <>
            <Text fontSize='md' fontWeight='bold' color={primaryColour}>
                Add MFA for More Security!
            </Text>
            <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
                <b style={{color: primaryColour}}>MFA (Multi-Factor Authentication)</b> adds an extra layer of security to your account. It requires you to provide two or more types of identification to verify your identity. This helps protect your account from unauthorized access, as it combines something you know (like a password) with something you have (like a verification code). Enable MFA today to enhance the security of your account and keep your personal information safe. This step is optional, but <b style={{color: primaryColour}}>we recommend</b> you to add for additional security!
            </Text>
            <Box>
                <MFASetting/>
            </Box>
            <Flex mt={5} justifyContent={'space-between'}>
                <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
                <Flex gap={3}>
                    <Text my="auto" fontSize={"sm"} fontWeight={'medium'} color={"gray"} >Next: <b style={{color: primaryColourOpaced}}>Payout Address</b></Text>
                <IconButton size={'md'} bg={primaryColourOpaced} _hover={{ backgroundColor: primaryColour }} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={props.incrementStepper} icon={<BiChevronRight size={25} />} />
                </Flex>
            </Flex>
        </>
    )
}

export default MFASetup;