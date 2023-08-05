import { Box, Card, Center, Flex, Spinner, Text, VStack } from "@chakra-ui/react"
import { primaryColour } from "../../../lib/settings"

function PageLoader(){
    return(
        <>
        <Flex height={"100vh"}>
            <Card width={"300px"} p={10} m={"auto"}>
                <Flex justifyContent={'center'} m={"auto"} gap={5}>
                    <Spinner color={primaryColour}/> 
                    <Text color={"gray"}>Please wait!</Text>
                </Flex>
            </Card>
        </Flex>
        </>
    )
}

export default PageLoader