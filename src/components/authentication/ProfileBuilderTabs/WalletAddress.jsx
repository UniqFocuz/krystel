import { Button, Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiChevronRight } from "react-icons/bi"


function WalletAddress(props){
    const grayColorModeValue = useColorModeValue("gray.600")
    return (
        <>
        <Text fontSize='md' fontWeight='bold' color={primaryColour}>
            Your Payout Address is critical!
        </Text>
        <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
            Though this step is optional for now, it is mandatory for any user to validate their Payout Address for processing their payout.
        </Text>
        <Text marginBottom={5} fontSize={"sm"} textAlign={"justify"} color='gray'>
            <Button size={'xs'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"}>Start Validation</Button>
        </Text>
        <Flex mt={5} justifyContent={'space-between'}>
            <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
            <IconButton size={'md'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={props.incrementStepper}  icon={<BiChevronRight size={25}/>}/> 
        </Flex>
        </>
    )
}

export default WalletAddress;