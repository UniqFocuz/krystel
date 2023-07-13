import { Avatar, Box, Button, Flex, IconButton, Image, Input, Select, Stat, StatHelpText, StatLabel, StatNumber, Text, useColorModeValue } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiChevronRight } from "react-icons/bi"
import { useEffect, useState } from "react"
import QRCode from "qrcode.react"
import { createDepositInvoice } from "../../../lib/api"
import DepositInvoice from "../../payments/DepositInvoice"

function WalletAddress(props){
    const grayColorModeValue = useColorModeValue("gray.600")
    const [isDepositLoading, setIsDepositLoading] = useState(false)
    const [deposit, setDeposit] = useState({})
    
    const handleCreateDeposit = async() => {
        setIsDepositLoading(true)
        await createDepositInvoice(1, 'Krystel Verification')
        .then((response) => {
            setTimeout(() => {
                setIsDepositLoading(false)
            }, 3000)
            setDeposit(response.data)
        })
        .catch((error) => {
            setIsDepositLoading(false)
        })
    }
    return (
        <>
        <Text fontSize='md' fontWeight='bold' color={primaryColour}>
            Your Payout Address is critical!
        </Text>
        <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
            Though this step is optional for now, it is mandatory for any user to validate their Payout Address for processing their payout.
        </Text>
        {
            !deposit.walletHash ?
            <Text marginBottom={5} fontSize={"sm"} textAlign={"justify"} color='gray'>
                <Button size={'xs'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} isLoading={isDepositLoading} onClick={handleCreateDeposit} color={"white"}>Start Validation</Button>
            </Text>
            :
            <Box>
                <Text textAlign={'justify'} fontSize={'sm'}>To validate your withdrawal address, please complete the below transaction <b style={{color: primaryColour}}>from the wallet</b> you intend to add to your account.</Text>
                <DepositInvoice {...{deposit}}/>
            </Box>
        }
        <Flex mt={5} justifyContent={'space-between'}>
            <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
            <IconButton size={'md'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={props.incrementStepper}  icon={<BiChevronRight size={25}/>}/> 
        </Flex>
        </>
    )
}

export default WalletAddress;