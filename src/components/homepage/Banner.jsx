import { Flex, Text, VStack } from "@chakra-ui/react"
import Typewriter from 'typewriter-effect';

function Banner() {
    return (
        <Flex background={"linear-gradient(to bottom right, #f6601d 0%, #ff9933 100%)"} height={"90vh"}>
            <VStack m={'auto'} textAlign={'center'} color={"white"}>
                <Text mb={5} fontWeight={'bold'} fontSize={"6xl"}>krystel.io</Text>
                <Text display={'flex'} opacity={0.7} fontSize={"lg"} fontWeight={'bold'}> A platform where you can 
                    <span style={{ marginLeft: '4px' }}/> {/* Adjust margin as needed */}
                    <Typewriter
                        
                        options={{
                            strings: [' unlock business potential', ' seize oppurtunities', ' lead the future', ' explore connections', ' elevate your lifestyle', ' grow as technology grows'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </Text>
            </VStack>
        </Flex>
    )
}

export default Banner