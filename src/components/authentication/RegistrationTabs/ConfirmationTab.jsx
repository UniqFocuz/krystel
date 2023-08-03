import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { register } from "../../../lib/api";
import { useState } from "react";
import Disclaimer from "./Legals/Disclaimer";
import PrivacyPolicy from "./Legals/PrivacyPolicy";
import TermsAndConditions from "./Legals/TermsAndConditions";
import { useNavigate } from "react-router-dom";

function ConfirmationTab(props){

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ legal, setLegal ] = useState('')
    const toast = useToast()
    const navigate = useNavigate()
    const handleRegister = async() => {
        props.setIsLoading(true)
        const response = await register(props.email)
        .then((response) => {
            localStorage.setItem('registrationToken', response.data.registrationToken)
            toast({
                title: response.data.message,
                variant: 'subtle',
                status: 'success',
            })
            setTimeout(() => {
                props.setIsLoading(false)
                navigate('/welcome')
            }, 3000)
        }).catch((error) => {
            toast({
                title: error.response.data.message,
                variant: 'subtle',
                status: 'error',
            })
            props.setIsLoading(false)
        })
    }

    return (
        <>
            <Text fontSize={'md'} fontWeight={'bold'} my={2} color={primaryColour}>Let's Start!</Text>
            <Text fontSize={'xs'} textAlign={'justify'}>
            By clicking <b>"Register"</b>, you are initiating the registraion process with <b style={{color: primaryColour}}>krystel.io</b> and agree to it's <b role="button" style={{color: primaryColour}}  onClick={() => { onOpen(); setLegal('termsandconditions') }}>Terms and Conditions</b> and are aware of the <b role="button" style={{color: primaryColour}} onClick={() => { onOpen(); setLegal('disclaimer') }}>Disclaimer</b> and <b role="button" style={{color: primaryColour}} onClick={() => { onOpen(); setLegal('privacypolicy') }}>Privacy Policy</b>
            </Text>
            <Flex  mt={5} justifyContent={'space-between'}>
                <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
                <Button size={'sm'} ml={'auto'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} isLoading={props.isLoading} onClick={handleRegister}>Register</Button>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader><Text fontWeight={'bold'}color={primaryColour}>{legal === 'disclaimer' ? 'Disclaimer' : legal === 'privacypolicy' ? 'Privacy Policy' : legal === 'termsandconditions' && 'Terms & Conditions' }</Text></ModalHeader>
                <ModalCloseButton/>
                <ModalBody pt={0} mb={5}>
                    { legal === 'disclaimer' ? <Disclaimer/> : legal === 'privacypolicy' ? <PrivacyPolicy/> : legal === 'termsandconditions' && <TermsAndConditions/>}
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ConfirmationTab;