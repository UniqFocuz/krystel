import { Box, Button, Card, Flex, Text, useToast } from "@chakra-ui/react"
import { useSelector } from "react-redux";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { useEffect, useState } from "react";
import { cancelpayout, fetchPayout } from "../../../lib/api";
import { krystelValuer } from "../../../lib/support";

function Invoices(){
    const user = useSelector((state) => state.userReducer);
    const [invoices, setInvoices] = useState()
    const toast = useToast()



    const loadPage = async() => {
        await fetchPayout()
        .then((response) => {
            setInvoices(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        loadPage()
    }, [])

    const cancelInvoice = (id) => {
        cancelpayout(id)
        .then((response) => {
            loadPage()
            toast({
                title: response.data.message,
                variant: 'subtle',
                status: 'success',
            })
        })
        .catch((error) => {
            toast({
                title: error.response.data.message,
                variant: 'subtle',
                status: 'error',
            })
        })
    }
    return (
        invoices &&
        <>
        {
            invoices.map((item, index) => (
                <Card p={7} key={index} mb={5}>
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
                    {
                        item.status == 'new' &&
                        <Flex justifyContent={'end'}>
                            <Button py={1} px={3} borderRadius={"20px"} size={'xs'} fontWeight={"bold"} fontSize={'2xs'} onClick={() => cancelInvoice(item.withdrawId)} >Cancel Invoice</Button>
                        </Flex>
                    }
                </Card>
            ))
        }
        </>
    )
}

export default Invoices