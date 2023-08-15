import { Box, Button, Card, Flex, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { useEffect, useState } from "react";
import { fetchPayout } from "../../../lib/api";
import { krystelValuer } from "../../../lib/support";

function Invoices(){
    const user = useSelector((state) => state.userReducer);
    const [invoices, setInvoices] = useState()
    useEffect(() => {
        const loadPage = async() => {
            await fetchPayout()
            .then((response) => {
                setInvoices(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        loadPage()
    }, [])
    return (
        invoices &&
        <>
        {
            invoices.map((item, index) => (
                <Card p={7} key={index}>
                    <Flex gap={3} justifyContent={"end"} mb={3}>
                        <Button py={1} px={3} borderRadius={"20px"} size={'xs'} fontWeight={"bold"} fontSize={'2xs'} >{item.daysFromCreation[1]} ago</Button>
                        <Button py={1} px={3} borderRadius={"20px"} size={'xs'} fontWeight={"bold"} fontSize={'2xs'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} >#{item.withdrawId}</Button>
                        <Button py={1} px={3} borderRadius={"20px"} size={'xs'} fontWeight={"bold"} fontSize={'2xs'} colorScheme="purple">{item.status}</Button>
                    </Flex>
                    <Box mb={3}>
                        <Text fontSize={"xs"}>Payout Amount</Text>
                        <Text color={primaryColour} fontSize={'lg'} fontWeight={'bold'}>{krystelValuer(item.amount)}</Text>
                    </Box>
                    <Box mb={3}>
                        <Text fontSize={"xs"}>Payout Address</Text>
                        <Text color={primaryColour} fontSize={'md'} fontWeight={'bold'}>{item.address}</Text>
                    </Box>
                </Card>
            ))
        }
        </>
    )
}

export default Invoices