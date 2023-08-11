import { Card, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux";

function Invoices(){
    const user = useSelector((state) => state.userReducer);
    return (
        <>
            <Card p={5}>
            <Text>Helo</Text>
        </Card>
        </>
    )
}

export default Invoices