import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";

function WelcomeTab(props){

    return (
        <>
        <Box>
            <Text fontSize={'md'} fontWeight={'bold'} my={2} color={primaryColour}>Hey there!</Text>
            <Text fontSize={'xs'} textAlign={'justify'}>
            Discover a captivating realm of entertainment and engagement at <b style={{color: primaryColour}}>Krystel.io.</b> By registering, you become part of a vibrant community of individuals who share a passion for growth, learning, and collaboration. Embrace the possibilities and start your journey with us now.
            </Text>
            <Text fontSize={'sm'} fontWeight={'bold'} my={2} color={primaryColour}>Welcome to Krystel.io!</Text>
            <Flex justifyContent={'end'}>
                <Button size={'sm'} ml={'auto'} mt={5} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} isLoading={props.isLoading} onClick={props.incrementStepper}>Register</Button>
            </Flex>
        </Box>
        </>
    )
}

export default WelcomeTab;