import { Flex, Text } from "@chakra-ui/react"
import { primaryColour } from "../../lib/settings"

function Footer(){
    return (
        <>
            <Flex p={5} width={"100%"} backgroundColor={primaryColour}>
                <Text color={"white"}>© Copyright <b>Krystel.io</b>. All Rights Reserved</Text>
            </Flex>
        </>
    )
}

export default Footer