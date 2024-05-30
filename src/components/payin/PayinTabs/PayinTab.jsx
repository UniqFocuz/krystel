import { Box, Button, Card, Center, Flex, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiCheck, BiInfoCircle } from "react-icons/bi";
import { VscEye } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createDepositInvoice, depositPing } from "../../../lib/api";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { getTimeDifferenceFromNow } from "../../../lib/support";
import NumPad from "../../collections/misc/NumPad";
import DepositInvoice from "../../payments/DepositInvoice";

function PayinTab(){
    const user = useSelector((state) => state.userReducer);
    const amountInputRef = useRef(null);
    const navigate = useNavigate()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [amount, setAmount] = useState(10)
    const [currentDeposit, setCurrentDeposit] = useState({})
    const [isAmountValid, setIsAmountValid] = useState(true); 
    const [isDepositLoading, setIsDepositLoading] = useState(false); 
    const [amountFeedback, setAmountFeedback] = useState('')
    const [activeIndex, setActiveIndex] = useState(1)
    const [allDeposits, setAllDeposit] = useState([])
    const handleAmountChange = (e) => {
        const amount = e.target.value
        setAmount(amount)
    }
    const loadPage = async() => {
        await depositPing('deposit')
        .then((response) => {
            setAllDeposit(response.data.invoices)
        })
    }
    useEffect(() => {
        if(amount >= 10){
            setIsAmountValid(true)
            setAmountFeedback('')
        } else{
            setIsAmountValid(false)
            setAmountFeedback('Min. Load should be 100 Ores')
        }
    }, [amount])
    useEffect(() => {
        loadPage()
    }, []) 
    const handleCreateDeposit = async() => {
        setIsDepositLoading(true)
        if(isAmountValid){
            await createDepositInvoice(amount, 'deposit')
            .then((response) => {
                setTimeout(() => {
                    setIsDepositLoading(false)
                }, 3000)
                setAllDeposit([response.data, ...allDeposits])
            })
            .catch((error) => {
                if(error.response.status === 401){
                    navigate('/register')
                }
            })
        } else{
            toast({
                title: amountFeedback,
                variant: 'subtle',
                status: 'info',
            })
            setIsDepositLoading(false)
        }
    }
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
    return(
        <>
            <Card p={5} mb={5}>
                <Flex px={3} justifyContent={"space-between"} mb={3}>
                    <Text my={"auto"} fontSize={'sm'} color={primaryColour} fontWeight={'bold'}>Load Ores</Text>
                    <Button borderRadius={"20px"} size={'sm'} fontSize={'2xs'}>{user.kollectibles.ore} Ores</Button>
                </Flex>
                <Box px={5}>
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
                    </Flex>
                </Box>
                <InputGroup px={3}>
                    <InputLeftElement pointerEvents='none'>
                    <AiOutlineUser color={primaryColour} />
                    </InputLeftElement>
                    <Input type='text' ref={amountInputRef} color={primaryColour} value={amount} onChange={handleAmountChange}  placeholder='Amount' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour} readOnly/>
                    <InputRightElement color={primaryColour}>
                    {isAmountValid ? <BiCheck role="button" color="green"/> : <BiInfoCircle role="button" color="red"/> }
                    </InputRightElement>
                </InputGroup>
                <Text mx={3} mt={2} mb={5} textAlign={'right'} color={primaryColour} fontSize={'xs'}>{amountFeedback}</Text>
                <NumPad inputValue={amount} setInputValue={setAmount}/>
                <Button marginTop={5} size={'sm'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} onClick={() => handleCreateDeposit()} isLoading={isDepositLoading}>Create Deposit</Button>
            </Card>
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
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

export default PayinTab