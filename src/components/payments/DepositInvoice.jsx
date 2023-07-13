import { Box, Flex, Image, Input, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { primaryColour } from "../../lib/settings";

function DepositInvoice(props){

    const [countdown, setCountdown] = useState('');
    const [targetTimestamp, setTargetTimeStamp] = useState(new Date().getTime());
    const [deposit, setDeposit] = useState({})
    useEffect(() => {
        props.deposit.walletHash && setDeposit(props.deposit)
        props.deposit.walletHash && setTargetTimeStamp(new Date(props.deposit.createdAt).getTime() + 30 * 60 * 1000)
    }, [])

    useEffect(() => {
        const updateCountdown = () => {
            const timeDifference = targetTimestamp - Date.now();
            if (timeDifference <= 0) {
                setCountdown('~');
                return;
            }
            const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
            const seconds = Math.floor((timeDifference / 1000) % 60);
            setCountdown(`<b>${minutes.toString().padStart(2, '0')}</b>m <b>${seconds.toString().padStart(2, '0')}</b>s`);
        };
        const intervalId = setInterval(updateCountdown, 1000);
        return () => {
        clearInterval(intervalId);
        };
    }, [targetTimestamp]);
    return (
        <>
        <Flex justifyContent={'center'} mt={10}>
            <Flex gap={5}>
                <QRCode fgColor={'red'} bgColor="#00000000" value={deposit.walletHash + '?amount=' + deposit.amount}/>
                <Box marginY={'auto'}>
                    <Stat>
                    <StatLabel display={'flex'} gap={2}><Image name='Tron' src='https://cryptologos.cc/logos/tron-trx-logo.png' width={"20px"} />TRON</StatLabel>
                    <StatNumber>{deposit.amount} TRX</StatNumber>
                    <StatHelpText display={'flex'} fontSize={'xs'} gap={1}>Expires in <Box dangerouslySetInnerHTML={{ __html: countdown}} /></StatHelpText>
                    </Stat>
                </Box>
            </Flex>
        </Flex>
        <Box textAlign={'center'} mt={5}>
            <Input type='text' textAlign={'center'} color={'red'} maxWidth={'350px'} value={deposit.walletHash} fontSize={'sm'} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour} readOnly />
        </Box>
        </>
    )
}
export default DepositInvoice;