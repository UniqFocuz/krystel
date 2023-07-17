import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { HiOutlineBadgeCheck } from "react-icons/hi"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { useEffect, useState } from "react";
import { fetchWalletAddresFromNetwork, setWalletAddress } from "../../../lib/api";


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
            console.log('fetching')
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
        <>
            {
                props.deposit.status === "completed" &&
                <Box>
                    <Flex justifyContent={'center'}>
                        <HiOutlineBadgeCheck color={primaryColour} size={100}/>
                    </Flex>
                    <Text my={3} fontWeight={'bold'} textAlign={"center"}>Deposit Successful!</Text>
                    {
                        props.deposit.params && props.deposit.params.order_name === 'Krystel Verification' &&

                        <Box textAlign={'justify'} color={'gray'} mt={5}>
                            <Text fontSize={'xs'}>Your deposit is now successful. To update your profile with your Payout Address, please click the below button to verify the list of Addresses we received your deposit from. Please be careful in choosing the Payout address as you can set it only once. Any update or change may require another Withdraw Verification deposit!</Text>
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
                    }

                    <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader></ModalHeader>
                        <ModalCloseButton />
                        <ModalBody fontSize={"sm"}>
                            <Text my={1} fontSize={'xs'}>Are you sure you want to set the below TRON Address as your default Payout Address? You cannot undo this change without completing another Withdraw Verification deposit!</Text>
                            <Text my={1}><b style={{color: primaryColour}}>{currentAddress}</b></Text>
                        </ModalBody>
                        <ModalFooter gap={3}>
                            <Button size={'xs'} onClick={onClose}>Cancel</Button>
                            <Button size={'xs'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} isLoading={isLoading} onClick={handleSetWalletAddress}>Confirm</Button>
                        </ModalFooter>
                    </ModalContent>
                    </Modal>
                </Box>
            }
        </>
    )
}

export default Status;