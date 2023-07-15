import { Box, Button, Flex, Image, Input, Stat, StatHelpText, StatLabel, StatNumber, Text, useToast } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { primaryColour } from "../../../lib/settings";
import { copyToClipboard } from "../../../lib/support";

function Pending(props){
    const toast = useToast()
    return (
        <>
            <Flex justifyContent={'center'}>
                <Flex gap={5}>
                    <QRCode fgColor={'red'} bgColor="#00000000" value={props.deposit.walletHash + '?amount=' + props.deposit.amount}/>
                    <Box marginY={'auto'}>
                        <Stat>
                        <StatLabel display={'flex'} gap={2}><Image name='Tron' src='https://cryptologos.cc/logos/tron-trx-logo.png' width={"20px"} />TRON</StatLabel>
                        <StatNumber>{props.deposit.amount} <Text as="span" color={'red'}>TRX</Text></StatNumber>
                        <StatHelpText display={'flex'} fontSize={'xs'} gap={1}>{ props.countdown ? <Box>Expires in <Box dangerouslySetInnerHTML={{ __html: props.countdown}}/></Box> : <Text>Expired</Text>}</StatHelpText>
                        <Text>Settled : {props.settledAmount} <b style={{color: "red"}}>TRX</b></Text>
                        </Stat>
                    </Box>
                </Flex>
            </Flex>
            <Box textAlign={'center'} mt={5}>
                <Input type='text' textAlign={'center'} color={'red'} maxWidth={'350px'} value={props.deposit.walletHash} fontSize={'sm'} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour} readOnly />
            </Box>
            <Flex gap={3} mt={3}>
                <Button size={'xs'} onClick={() => copyToClipboard(props.deposit.walletHash, toast, "Address")}>Copy Address</Button>
                <Button size={'xs'} onClick={() => copyToClipboard(props.deposit.amount, toast, "Amount")}>Copy Amount</Button>
                <Button size={'xs'} onClick={props.verifyDepositStatus} isLoading={props.isRefreshLoading} >Refresh</Button>
            </Flex>
        </>
    )
}

export default Pending;