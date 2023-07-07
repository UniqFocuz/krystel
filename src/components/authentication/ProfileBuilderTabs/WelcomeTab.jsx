import { Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiChevronRight } from "react-icons/bi"


function WelcomeTab(props){
    const grayColorModeValue = useColorModeValue("gray.600")
    return (
        <>
        <Text fontSize='md' fontWeight='bold' color={primaryColour}>
            Welcome!
        </Text>
        <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
            To enhance your experience on our platform, we collect necessary information to complete
            your profile. Our user-friendly wizard will guide you step-by-step in building your
            profile and setting up essential features like, verifying your email, setting your password,
            Multi-Factor Authentication, Payout Address and etc
        </Text>
        <Flex justifyContent={'end'} gap={3}>
            <Text my="auto" fontSize={"sm"} fontWeight={'medium'} color={"gray"}>Next: <b style={{color: primaryColourOpaced}}>Password</b></Text><IconButton size={'md'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={props.incrementStepper} icon={<BiChevronRight size={25}/>}/> 
        </Flex>
        </>
    )
}

export default WelcomeTab;