import { Box, Button, Center, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiChevronRight } from "react-icons/bi"
import { useEffect, useState } from "react"
import { createDepositInvoice, depositPing } from "../../../lib/api"
import { VscEye } from "react-icons/vsc"
import DepositInvoice from "../../payments/DepositInvoice"

function WalletAddress(props){
    const grayColorModeValue = useColorModeValue("gray.600")
    const [isDepositLoading, setIsDepositLoading] = useState(false)
    const [currentDeposit, setCurrentDeposit] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [allDeposits, setAllDeposit] = useState([])
    const toast = useToast()
    useEffect(() => {
        const loadPage = async() => {
            await depositPing('verification')
            .then((response) => {
                setAllDeposit(response.data)
            })
        }
        loadPage()
    }, [])
    
    const handleCreateDeposit = async() => {
        if(checkCreatedAtValues()){
            setIsDepositLoading(true)
            await createDepositInvoice(1, 'verification')
            .then((response) => {
                setTimeout(() => {
                    setIsDepositLoading(false)
                }, 3000)
                setAllDeposit([...allDeposits, response.data])
            })
            .catch((error) => {
                setIsDepositLoading(false)
            })
        }
        else{
            toast({
                title: `You have an active deposit!`,
                variant: 'subtle',
                status: 'info',
            })
        }
    }
    function getTimeDifferenceFromNow(timestamp) {
        const currentTime = new Date();
        const givenTime = new Date(timestamp);
      
        const timeDifferenceInMilliseconds = currentTime - givenTime;
        const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
      
        if (timeDifferenceInMinutes >= 60) {
          const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
          return `${timeDifferenceInHours} hrs ago`;
        } else if (timeDifferenceInMinutes < 2) {
          return `Few secs ago`;
        } else{
          return `${timeDifferenceInMinutes} mins ago`;
        }
      }
    const checkCreatedAtValues = () => {
        const currentTime = new Date().toISOString();
        const validCreatedAtValues = [];
    
        for (const deposit of allDeposits) {
        const timeDifferenceInMilliseconds = new Date(currentTime) - new Date(deposit.createdAt);
        const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
    
        if (timeDifferenceInMinutes <= 5) {
            validCreatedAtValues.push(deposit.createdAt);
        }
        }
        
        return validCreatedAtValues.length === 0 ? true : false
    };

    useEffect(() => {
        checkCreatedAtValues();
    }, [allDeposits]);


    const handleOpenModal = (obj) => {
        setCurrentDeposit(obj)
        onOpen()
    }
    return (
        <>
        <Text fontSize='md' fontWeight='bold' color={primaryColour}>
            Your Payout Address is critical!
        </Text>
        <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
            Though this step is optional for now, it is mandatory for any user to validate their Payout Address for processing their payout.
        </Text>

        <Text fontSize={'sm'} fontWeight={'bold'} mb={3} color={primaryColour}>Your Deposits</Text>
        <TableContainer>
            <Table size='sm'>
                <Thead>
                <Tr>
                    <Th>Deposit ID</Th>
                    <Th>Created</Th>
                    <Th>Status</Th>
                    <Th textAlign={'center'}>View</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        allDeposits.length !== 0 ? allDeposits.map((deposit, index) => (
                            <Tr key={index}>
                                <Td>{deposit.depositId}</Td>
                                <Td>{getTimeDifferenceFromNow(deposit.createdAt)}</Td>
                                <Td>{deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}</Td>
                                <Td role="button" onClick={() => handleOpenModal(deposit)}><Center><VscEye mx={'auto'}/></Center></Td>
                            </Tr>
                        )) : <Tr><Td colSpan={3} textAlign={'center'} color={'gray'}>No Deposits</Td></Tr>
                    }
                </Tbody>
            </Table>
        </TableContainer>
        <Flex my={5} justifyContent={'end'}>
            <Button size={'xs'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} isLoading={isDepositLoading} onClick={handleCreateDeposit} color={"white"}>New Deposit</Button>
        </Flex>
        <Box>
            <Text textAlign={'justify'} fontSize={'sm'}>To validate your withdrawal address, please complete the below transaction <b style={{color: primaryColour}}>from the wallet</b> you intend to add to your account.</Text>
           
        </Box>
        <Flex mt={5} justifyContent={'space-between'}>
            <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
            <IconButton size={'md'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={props.incrementStepper}  icon={<BiChevronRight size={25}/>}/> 
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <DepositInvoice {...{currentDeposit}}/>
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}

export default WalletAddress;