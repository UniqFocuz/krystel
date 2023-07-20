import { Box, Button, Center, Flex, HStack, IconButton, Input, InputGroup, InputLeftAddon, InputRightAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiChevronRight } from "react-icons/bi"
import { useEffect, useState } from "react"
import { createDepositInvoice, depositPing } from "../../../lib/api"
import { VscEye } from "react-icons/vsc"
import DepositInvoice from "../../payments/DepositInvoice"
import { getTimeDifferenceFromNow } from "../../../lib/support"
import { useNavigate } from "react-router-dom"

function WalletAddress(props){
    const grayColorModeValue = useColorModeValue("gray.600")
    const [isDepositLoading, setIsDepositLoading] = useState(false)
    const [canEdit, setCanEdit] = useState(false)
    const [payoutAddress, setPayoutAddress] = useState(false)
    const [currentDeposit, setCurrentDeposit] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [activeIndex, setActiveIndex] = useState(1)
    const navigate = useNavigate()
    const [allDeposits, setAllDeposit] = useState([])
    const toast = useToast()

    const loadPage = async() => {
        await depositPing('verification')
        .then((response) => {
            setCanEdit(response.data.canEdit)
            setPayoutAddress(response.data.payoutAddress)
            setAllDeposit(response.data.invoices)
        })
    }

    useEffect(() => {
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
                if(error.response.status === 401){
                    navigate('/register')
                }
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

    const checkCreatedAtValues = () => {
        const currentTime = new Date().toISOString();
        const validCreatedAtValues = [];
    
        for (const deposit of allDeposits) {
        const timeDifferenceInMilliseconds = new Date(currentTime) - new Date(deposit.createdAt);
        const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
    
        if (timeDifferenceInMinutes <= 0) {
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

    const handleCloseModal = () => {
        onClose()
        loadPage()
    }
    const paginationForward = () => {
        allDeposits.length !== 0 && activeIndex < (allDeposits.length/5) && setActiveIndex(activeIndex+1)
    }
    const paginationBackward = () => {
        allDeposits.length !== 0 && activeIndex > 1 && setActiveIndex(activeIndex-1)
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
                    <Th textAlign={'center'}>Created</Th>
                    <Th textAlign={'center'}>Status</Th>
                    <Th textAlign={'center'}>View</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        allDeposits.length !== 0 ? allDeposits.slice((activeIndex*5)-5, activeIndex*5).map((deposit, index) => (
                            <Tr key={index}>
                                <Td>{deposit.depositId}</Td>
                                <Td textAlign={'center'}>{getTimeDifferenceFromNow(deposit.createdAt)}</Td>
                                <Td textAlign={'center'}>{deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}</Td>
                                <Td role="button" onClick={() => handleOpenModal(deposit)}><Center><VscEye mx={'auto'}/></Center></Td>
                            </Tr>
                        )) : <Tr><Td colSpan={4} textAlign={'center'} color={'gray'}>No Deposits</Td></Tr>
                    }
                </Tbody>
            </Table>
        </TableContainer>
        <Flex my={5} justifyContent={'end'} gap={3}>
            <InputGroup size={'xs'} width={'auto'} my={'auto'}>
                <InputLeftAddon children='Prev' borderLeftRadius={5} role="button" onClick={paginationBackward} />
                <Input width={16} textAlign={'center'} value={(activeIndex) + " of " + (Math.ceil(allDeposits.length/5))} 
                    style={{ userSelect: 'none', pointerEvents: 'none', touchAction: 'none' }}
                    onTouchStart={(e) => e.preventDefault()}
                    onMouseDown={(e) => e.preventDefault()} readOnly />
                <InputRightAddon children='Next' borderRightRadius={5} role="button" onClick={paginationForward} />
            </InputGroup>
            <Flex><Button size={'xs'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} isLoading={isDepositLoading} onClick={handleCreateDeposit} color={"white"}>New Deposit</Button></Flex>
        </Flex>
        <Box>
            <Text textAlign={'justify'} fontSize={'sm'}>To validate your withdrawal address, please complete the below transaction <b style={{color: primaryColour}}>from the wallet</b> you intend to add to your account.</Text>
           
        </Box>
        <Flex mt={5} justifyContent={'space-between'}>
            <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
            <IconButton size={'md'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={props.incrementStepper}  icon={<BiChevronRight size={25}/>}/> 
        </Flex>
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <DepositInvoice {...{currentDeposit, canEdit, payoutAddress}}/>
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}

export default WalletAddress;