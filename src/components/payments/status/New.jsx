import { Box, Button, Flex, Image, Input, Spinner, Stat, StatHelpText, StatLabel, StatNumber, Text, useToast } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { primaryColour } from "../../../lib/settings";
import { copyToClipboard } from "../../../lib/support";
import { useState } from "react";

function NewInvoice(props){
    const toast = useToast()
    const walletHash = props.deposit.wallet_hash || "";
    return (
        props.deposit.pending ?
        <>
            <Flex justifyContent={'center'}>
                <Flex gap={5}>
                    <QRCode fgColor={'red'} bgColor="#00000000" value={props.deposit.wallet_hash + '?amount=' + props.deposit.pending}/>
                    <Box marginY={'auto'}>
                        <Stat>
                        <StatLabel display={'flex'} gap={2}><Image name='Tron' src='https://cryptologos.cc/logos/tron-trx-logo.png' width={"20px"} />TRON</StatLabel>
                        <StatNumber>{props.deposit.pending} <Text as="span" color={'red'}>TRX</Text></StatNumber>
                        <StatHelpText display={'flex'} fontSize={'xs'} gap={1}>Expires in <Box dangerouslySetInnerHTML={{ __html: props.countdown}} /></StatHelpText>
                        </Stat>
                    </Box>
                </Flex>
            </Flex>
            <Box textAlign={'center'} mt={5}>
                <Input type='text' textAlign={'center'} color={'red'} maxWidth={'350px'} value={walletHash} fontSize={'sm'} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour} readOnly />
            </Box>
            <Flex gap={3} mt={3}>
                <Button size={'xs'} onClick={() => copyToClipboard(props.deposit.wallet_hash, toast, "Address")}>Copy Address</Button>
                <Button size={'xs'} onClick={() => copyToClipboard(props.deposit.pending, toast, "Amount")}>Copy Amount</Button>
                <Button size={'xs'} onClick={props.verifyDepositStatus} isLoading={props.isRefreshLoading} >Refresh</Button>
            </Flex>
        </>
        :
        <>
        <Flex justifyContent={"center"}>
            <Spinner color={primaryColour}/>
        </Flex>
        </>
    )
}

export default NewInvoice;