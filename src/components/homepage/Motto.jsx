import { Box, Card, Flex, Text } from "@chakra-ui/react"
import { primaryColour } from "../../lib/settings"

function Motto(){
    return (
        <Flex p={10} id="motto">
            <Card width={{ base : "100%", md: "80%", lg : "60%" }} mx={'auto'} p={20}>
                <Text mx={'auto'} mb={5} fontSize={"3xl"} color={primaryColour} fontWeight={500}>Our Motto</Text>
                <Text mb={5} textAlign={'justify'} color={"gray"}>
                At Krystel, we believe in the transformative power of knowledge and skill. Our platform is designed to grow your understanding, shape your talents, and fine-tune your expertise, guiding you on a radiant path to success. Just as a raw ore is meticulously refined through countless processes to emerge as a precious gem, so too can your knowledge, skills, and passions be sculpted with dedication and effort.

                </Text>
                <Text textAlign={'justify'} color={"gray"}>
                With Krystel, you’re not just learning; you’re evolving. We provide the tools and insights to channel your potential into lucrative opportunities, empowering you to monetize your unique talents and experience the joy of financial freedom. But we go beyond traditional learning—Krystel opens the door to a world where earning money is as enjoyable as playing a game. Dive into an exciting journey where fun meets financial growth, and let us guide you to a brighter, wealthier future.
                </Text>
            </Card>
        </Flex>
    )
}

export default Motto