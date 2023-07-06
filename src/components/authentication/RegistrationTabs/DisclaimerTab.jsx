import { Box, Button, Card, Flex, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { register } from "../../../lib/api";
import { useState } from "react";

function DisclaimerTab(props){

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    const handleRegister = async() => {
        setIsLoading(true)
        console.log(props.email)
        const response = await register(props.email)
        .then((response) => {
            localStorage.setItem('registrationToken', response.data.registrationToken)
            toast({
                title: response.data.message,
                variant: 'subtle',
                status: 'success',
            })
        }).catch((error) => {
            console.log(error)
            toast({
                title: error.response.data.message,
                variant: 'subtle',
                status: 'error',
            })
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <>
            <Text fontSize={'md'} fontWeight={'bold'} my={2} color={primaryColour}>Let's Start!</Text>
            <Text fontSize={'xs'} textAlign={'justify'}>
            By clicking <b>"Register"</b>, you are initiating the registraion process with <b style={{color: primaryColour}}>krystel.io</b> and agree to it's <b role="button" style={{color: primaryColour}}>Terms and Conditions</b> and are aware of the <b role="button" style={{color: primaryColour}} onClick={onOpen}>Disclaimer</b> and <b role="button" style={{color: primaryColour}}>Privacy Policy</b>
            </Text>
            <Flex  mt={5} justifyContent={'space-between'}>
                <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
                <Button size={'sm'} ml={'auto'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} isLoading={isLoading} onClick={handleRegister}>Register</Button>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader><Text fontWeight={'bold'}color={primaryColour}>Disclaimer</Text></ModalHeader>
                <ModalCloseButton/>
                <ModalBody pt={0} mb={5}>
                    <Text fontSize={'xs'} textAlign={'justify'}>
                    Using our platform to earn carries certain risks and considerations. We would like to inform our users about the following points before engaging in any activities related to earning on our platform:
                    </Text>
                    <List my={2} spacing={3} fontSize={'xs'} textAlign={"justify"}>
                    <ListItem>
                    <b style={{color: primaryColour}}>Financial Risks:</b> Earning through our platform involves financial risks. The amount of earned may vary and is subject to market conditions, user demand, and other factors beyond our control. There is no guarantee of consistent or substantial earnings.
                    </ListItem>
                    <ListItem>
                    <b style={{color: primaryColour}}>Addiction Warning:</b> It is important to be aware that engaging in activities to earn on our platform may lead to addictive behavior. The allure of making income quickly can be enticing, and individuals may become overly focused on earning money, potentially neglecting other important aspects of their lives. We urge users to exercise self-control and be mindful of their well-being.
                    </ListItem>
                    <ListItem>
                    <b style={{color: primaryColour}}>Responsible Use:</b> We encourage responsible use of our platform. Users should prioritize their financial stability, manage their time effectively, and ensure a healthy work-life balance. It is essential to set realistic expectations and avoid excessive dependence on earning through our platform.
                    </ListItem>
                    <ListItem>
                    <b style={{color: primaryColour}}>Legal Compliance:</b> Users are responsible for complying with all applicable laws and regulations related to earning money, including taxation and reporting requirements. It is crucial to understand and adhere to the legal obligations in your jurisdiction to avoid any legal consequences.
                    </ListItem>
                    <ListItem>
                    <b style={{color: primaryColour}}>Privacy and Security:</b> Protecting your personal and financial information is of utmost importance. We implement security measures to safeguard your data, but it is essential for users to exercise caution when sharing sensitive information and to use secure and trusted payment methods.
                    </ListItem>
                    <ListItem>
                    <b style={{color: primaryColour}}>Education and Support:</b> We encourage users to educate themselves about financial management, investment strategies, and other relevant topics. Seek advice from financial professionals if needed. Additionally, if you or someone you know is experiencing financial difficulties or addictive behavior related to earning on our platform, please seek appropriate support and assistance.
                    </ListItem>
                    <ListItem>
                    Please note that our platform provides opportunities to earn money, but individual results may vary. We strive to create a fair and transparent environment; however, we do not guarantee any specific earnings or outcomes.
                    </ListItem>
                    <ListItem>
                    By using our platform, you acknowledge and accept these risks and responsibilities. It is important to make informed decisions and seek professional advice when necessary.
                    </ListItem>
                    <ListItem>
                    Remember to prioritize your well-being, be financially responsible, and make the most of the opportunities available on our platform.
                    </ListItem>
                </List>
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DisclaimerTab;