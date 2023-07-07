import { Button, Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiChevronRight } from "react-icons/bi"


function WalletAddress(props){
    const grayColorModeValue = useColorModeValue("gray.600")
    return (
        <>
        <Text fontSize='md' fontWeight='bold' color={primaryColour}>
            Your withdraw address is critical!
        </Text>
        <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
            Submit your withdraw address
        </Text>
        <Flex mt={5} justifyContent={'space-between'}>
            <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
            <IconButton size={'md'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={props.incrementStepper}  icon={<BiChevronRight size={25}/>}/> 
        </Flex>
        </>
    )
}

export default WalletAddress;