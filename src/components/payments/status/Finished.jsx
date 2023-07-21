import { Flex, Spinner, Text } from "@chakra-ui/react";
import { primaryColour } from "../../../lib/settings";

function Finished(props){
    return (
        props.deposit.pending?
        <>
            <Text size={'sm'}>You funds has been received and waiting for confirmation!</Text>
        </>
        :
        <>
        <Flex justifyContent={"center"}>
            <Spinner color={primaryColour}/>
        </Flex>
        </>
    )
}

export default Finished;