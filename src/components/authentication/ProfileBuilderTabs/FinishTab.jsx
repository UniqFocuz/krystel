import { Box, Button, Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiChevronRight, BiLogInCircle } from "react-icons/bi"
import { useNavigate } from "react-router-dom"


function FinishTab(props) {
    const grayColorModeValue = useColorModeValue("gray.600")
    const navigate = useNavigate()
    return (
        <>
            <Text fontSize='md' fontWeight='bold' color={primaryColour}>
                Done!
            </Text>
            <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
                You have completed all the steps that should ease your user experience by now. It is highly recommeded that you should complete the optional steps like Adding MFA or Activating your Payout Address. However you can do it once you are logged in any time.
            </Text>
            <Flex mt={5} justifyContent={'space-between'}>
                <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
                <Flex gap={3}>
                    <Text my="auto" fontSize={"sm"} fontWeight={'medium'} color={"gray"} >Finish: <b style={{color: primaryColourOpaced}}>Login</b></Text>
                <IconButton size={'md'} bg={primaryColourOpaced} _hover={{ backgroundColor: primaryColour }} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={() => navigate('/login')} icon={<BiLogInCircle />} />
                </Flex>
            </Flex>
        </>
    )
}

export default FinishTab;