import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { HiOutlineBadgeCheck } from "react-icons/hi"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { useEffect, useState } from "react";
import { fetchWalletAddresFromNetwork, setWalletAddress } from "../../../lib/api";
import { MdOutlineReportGmailerrorred } from "react-icons/md"
import { IoWarningOutline } from "react-icons/io5"
function Status(props){
    const [isFetching, setIsFetching] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [currentAddress, setCurrentAddress] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
    const fetchWalletAddres = async() => {
        setIsFetching(true)
        await fetchWalletAddresFromNetwork(props.deposit.tx_id)
        .then((response) => {
            setData(response.data)
            setIsFetching(false)
        })
    }
    
    const handleModalOpen = (address) => {
        onOpen()
        setCurrentAddress(address)
    }

    const handleSetWalletAddress = async() => {
        setIsLoading(true)
        await setWalletAddress(currentAddress)
        .then((response) => {
            setIsLoading(false)
            toast({
                title: response.data.message,
                variant: 'subtle',
                status: 'info',
            })
            onClose()
        })
        .catch((error) => {
            setIsLoading(false)
            toast({
                title: error.response.data.message,
                variant: 'subtle',
                status: 'error',
            })
        })
    }
    return (
        props.deposit.user_id ?
        <>
            {
                props.deposit.status === "completed" || props.deposit.status === "mismatch" ?
                <Box>
                    <Flex justifyContent={'center'}>
                        <HiOutlineBadgeCheck color={primaryColour} size={100}/>
                    </Flex>
                    <Text my={3} fontWeight={'bold'} textAlign={"center"}>Deposit Successful!</Text>
                    {
                        props.deposit.params.order_name === 'Krystel Verification' &&
                        props.canEdit ?
                        <Box textAlign={'justify'} color={'gray'} mt={5}>
                            <Text fontSize={'xs'}>Your deposit is now successful. To update your profile with your Payout Address, please click the below button to verify the list of Addresses we received your deposit from. Please be careful in choosing the Payout address as you can set it only once. Any update or change may require another Payout Address Verification deposit!</Text>
                            <Box mt={3}>{ data.length === 0
                                ?<Flex justifyContent={'end'}><Button size={'xs'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} onClick={() => fetchWalletAddres()} isLoading={isFetching} >Fetch</Button></Flex>
                                : <Box>
                                    {
                                        data.map((address, index) => (
                                            <Button my={1} width={"100%"} maxW={"400px"} size={'xs'} key={index} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} onClick={() => handleModalOpen(address)}>{address}</Button>
                                        ))
                                    }
                                </Box>
                            }</Box>
                        </Box>
                        :<Box textAlign={'justify'} color={'gray'} mt={5}>
                            <Text fontSize={'xs'}>
                                Looks like you already activated your Payout Address. Your Payout Address - <b style={{color: primaryColour}}>{props.payoutAddress}</b> is already in effect. If you wish to update your Payout Address, you may again initiate a Payout Address Verification deposit and complete the process!
                            </Text>
                        </Box>
                    }

                    <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader></ModalHeader>
                        <ModalCloseButton />
                        <ModalBody fontSize={"sm"}>
                            <Text my={1} fontSize={'xs'}>Are you sure you want to set the below TRON Address as your default Payout Address? You cannot undo this change without completing another Payout Address Verification deposit!</Text>
                            <Text my={1}><b style={{color: primaryColour}}>{currentAddress}</b></Text>
                        </ModalBody>
                        <ModalFooter gap={3}>
                            <Button size={'xs'} onClick={onClose}>Cancel</Button>
                            <Button size={'xs'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} isLoading={isLoading} onClick={handleSetWalletAddress}>Confirm</Button>
                        </ModalFooter>
                    </ModalContent>
                    </Modal>
                </Box>
                : props.deposit.status === "cancelled" ?
                 <Box>
                    <Flex justifyContent={"center"}>
                        <MdOutlineReportGmailerrorred color={primaryColour} size={100}/>
                    </Flex>
                        <Box textAlign={'justify'} color={'gray'} mt={5}>
                            <Text fontSize={'xs'}>We see that your deposit has been cancelled since the transaction has expired already. No deposit has been received within the transaction period given. Please initiate a new deposit.</Text>
                        </Box>
                </Box>
                : props.deposit.status !== 'expired' ?
                <Box>
                    <Flex justifyContent={"center"}>
                        <IoWarningOutline color={primaryColour} size={100}/>
                    </Flex>
                        <Box textAlign={'justify'} color={'gray'} mt={5}>
                            <Text fontSize={'xs'}>We see that your deposit has been cancelled since the transaction has expired already. <b>Any amount sent to the address will be not be recovered after the expiry time</b>, which should be 30 mins from the time of deposit!</Text>
                    </Box>
                </Box>
                : 
                <Box>
                    <Flex justifyContent={"center"}>
                        <IoWarningOutline color={primaryColour} size={100}/>
                    </Flex>
                        <Box textAlign={'justify'} color={'gray'} mt={5}>
                            <Text fontSize={'xs'}>
                                Your deposit is expired, however any amount settled will be reflected to your account. Please contact us if there's a deposit that is not reflected with the <b>Deposit ID - {props.deposit.params.order_number}</b>
                            </Text>
                    </Box>
                </Box>
            }
        </>
        :
        <>
        <Flex justifyContent={"center"}>
            <Spinner color={primaryColour}/>
        </Flex>
        </>
    )
}

export default Status;