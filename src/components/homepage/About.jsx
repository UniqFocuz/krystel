import { Box, Flex, Text } from "@chakra-ui/react"
import { primaryColour } from "../../lib/settings"

function About() {
    return (
        <Flex backgroundColor={"white"} p={20} id="aboutus">
            <Box width={{ base : "100%", md: "80%", lg : "60%" }} mx={'auto'}>
                <Text mx={'auto'} mb={5} fontSize={"3xl"} color={primaryColour} fontWeight={500}>About Us</Text>
                <Text color={"gray"} mb={5} textAlign={'justify'}>
                    At Krystel.io, we are at the forefront of innovation, harnessing the power of modern technologies to revolutionize the way you unlock financial freedom and explore business opportunities. Our mission is to create a unique in-platform rare element, known as Krystel, that empowers individuals and businesses alike to reach their full potential.

                </Text>
                <Text color={"gray"} textAlign={'justify'}>
                    At Krystel.io, we believe in the power of technology to change lives. Our platform is built on robust, scalable, and secure technologies that ensure a seamless user experience. We are constantly evolving, integrating the latest advancements to provide you with the best tools and resources.
                </Text>
            </Box>
        </Flex>
    )
}

export default About