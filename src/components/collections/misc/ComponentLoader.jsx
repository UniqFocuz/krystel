import { Center, Flex, Spinner } from "@chakra-ui/react"
import { primaryColour } from "../../../lib/settings"

function ComponentLoader(){
    return(
        <>
        <Flex justifyContent={"center"} p={10}>
            <Center><Spinner size={"lg"} color={primaryColour}/></Center>
        </Flex>
        </>
    )
}

export default ComponentLoader