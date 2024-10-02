import { Box, Flex, Text } from "@chakra-ui/react"
import { primaryColour } from "../../lib/settings"

function Fabrication(){
    return (
        <>
            <Flex backgroundColor={primaryColour} p={20} id="fabrication">
                <Box width={{ base : "100%", md: "80%", lg : "60%" }} mx={'auto'}>
                    <Text mx={'auto'} mb={5} fontSize={"3xl"} color={"white"} fontWeight={500}>Fabrication</Text>
                    <Text color={"white"} opacity={0.9} mb={5} textAlign={'justify'}>
                        Fabrication is the innovative process of converting ore into Krystel, a unique element that empowers players within the world of Krystel. This game immerses you in a journey where ore serves as your input, and as you progress day by day, you are rewarded with the precious Krystel.
                    </Text>
                    <Text color={"white"} mb={5} opacity={0.9} textAlign={'justify'}>
                        At the heart of this process lies advanced technology, meticulously designed to specialize in generating Krystel from ores with the utmost care and precision. Each interaction within the game enhances your ability to refine and transform raw materials into valuable assets, unlocking new levels of potential and opportunity.
                    </Text>
                    <Text color={"white"} mb={5} opacity={0.9} textAlign={'justify'}>
                        As you navigate through challenges and build your expertise, the process of fabrication not only enriches your gaming experience but also helps you cultivate your skills, knowledge, and financial freedom. Join us in this exciting adventure and watch as your efforts turn ore into radiant Krystel!
                    </Text>
                </Box>
            </Flex>
        </>
    )
}

export default Fabrication