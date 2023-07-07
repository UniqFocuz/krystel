import { Button, Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiChevronRight } from "react-icons/bi"


function MFASetup(props){
    const grayColorModeValue = useColorModeValue("gray.600")
    return (
        <>
        <Text fontSize='md' fontWeight='bold' color={primaryColour}>
            Setup Multi-Factor Authentication!
        </Text>
        <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
            You can skip this also
        </Text>
        <Flex mt={5} justifyContent={'space-between'}>
            <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
            <IconButton size={'md'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={props.incrementStepper}  icon={<BiChevronRight size={25}/>}/> 
        </Flex>
        </>
    )
}

export default MFASetup;