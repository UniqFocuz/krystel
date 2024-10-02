import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { primaryColour } from "../../lib/settings"
import { MdOutlineEmail } from "react-icons/md";
function Contact(){

    return (
        <>
            <Flex backgroundColor={"white"} p={20} id="contact">
                <Box width={{ base : "100%", md: "80%", lg : "60%" }} mx={'auto'}>
                    <Text mx={'auto'} mb={5} fontSize={"3xl"} color={primaryColour} fontWeight={500}>Contact Us</Text>
                    <Text>
                        Feel free to reach out to us through the following platforms, and we will get back to you promptly.
                    </Text>
                    <Flex mt={7} gap={3}>
                        <Button borderRadius={"50%"} height={"50px"} width={"50px"}><MdOutlineEmail fontSize={30} /></Button>
                        <Box>
                            <Text color={primaryColour} fontWeight={'bold'}>Email</Text>
                            <Text>support@krystel.io</Text>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}

export default Contact