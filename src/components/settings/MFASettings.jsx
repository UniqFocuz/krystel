import { Box, Button, Center, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { primaryColour, primaryColourOpaced } from "../../lib/settings";
import { BiCheck, BiLockAlt, BiSolidLockAlt, BiSolidLockOpenAlt, BiX } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { mfaAddNewDevice, mfaSettingsPing } from "../../lib/api";
import QRCode from 'qrcode.react';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import ViewKeyModal from "./Modal/ViewKeyModal";

function MFASetting(){
    const [devices, setDevices] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [currentDevice, setCurrentDevice] = useState()
    useEffect(() => {
        const loadPage = async() => {
            await mfaSettingsPing().then((response) => {
                setDevices(response.data)
            }).catch((error) => {
            }).finally(() => {
            })
        }
        loadPage()
    }, [])

    const handleAddNewDevice = async() => {
        setIsLoading(true)
        await mfaAddNewDevice()
        .then((response) => {
            setTimeout(() => {
                setIsLoading(false)
            setDevices([...devices, response.data.mfaURI])
            }, 3000)
        })
    }
    const handleDeviceConfirmation = (id) => {
        const updatedDevices = devices.map((device) =>
          device.id === id ? { ...device, confirmed: true } : device
        );
        setDevices(updatedDevices);
      };
      
    const handleOpenModal = (obj) => {
        setCurrentDevice(obj)
        onOpen()
    }

    return (
        <>
            <Text fontSize={'sm'} fontWeight={'bold'} mb={3} color={primaryColour}>Your Devices</Text>
            <TableContainer>
                <Table size='sm'>
                    <Thead>
                    <Tr>
                        <Th>Device Name</Th>
                        <Th textAlign>Refresh Time</Th>
                        <Th textAlign={'center'}>Active</Th>
                        <Th textAlign={'center'}>View</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                            devices.length !== 0 ? devices.map((device, index) => (
                                <Tr key={index}>
                                    <Td>{device.name}</Td>
                                    <Td textAlign={'center'}>{device.step}s</Td>
                                    <Td>{device.confirmed === true ? (<Center><BiCheck mx={'auto'}/></Center>) : (<Center><BiX mx={'auto'}/></Center>)}</Td>
                                    {device.confirmed !== true ? 
                                    <Td role="button" onClick={() => handleOpenModal(device)}><Center><VscEye mx={'auto'}/></Center></Td>
                                    : (<Td><Center>-</Center></Td>)}
                                </Tr>
                            )) : <Tr><Td colSpan={3} textAlign={'center'} color={'gray'}>No devices</Td></Tr>
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <Flex justifyContent={'end'}>
                <Button marginTop={5} size={'xs'} bg={primaryColourOpaced} _hover={{ backgroundColor: primaryColour }} color={"white"} onClick={handleAddNewDevice} isLoading={isLoading}>Add New Device</Button>
            </Flex>
            <Text fontSize={'sm'} my={5} textAlign={'justify'}>Having atleast one Active Multi-Factor Authentication device enables MFA during the future logins. If you wish the remove this additional authentication, you can always disable it.</Text>
            <Flex><Text fontSize={'sm'} fontWeight={'bolder'} color={"gray"}>Multi-Factor Authentication: </Text> { devices.some((device) => device.confirmed) ? <Center><BiSolidLockAlt color={primaryColour}/></Center> : <Center><BiSolidLockOpenAlt color={primaryColour}/></Center> } </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Multi-Factor Authentication</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ViewKeyModal {...{currentDevice, setCurrentDevice, onClose, handleDeviceConfirmation}} />
                </ModalBody>
                <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MFASetting;