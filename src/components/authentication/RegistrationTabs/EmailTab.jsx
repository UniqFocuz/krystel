import { Box, Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { BiCheck, BiCheckDouble, BiCross, BiInfoCircle, BiKey, BiLike, BiLock, BiMailSend, BiTime, BiUserCheck } from "react-icons/bi";
import { LuHeartHandshake } from "react-icons/lu";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { validatePreRegisterEmail } from "../../../lib/api";
import { useState } from "react";
import { color } from "framer-motion";

function EmailTab (props){
    const [emailFeedback, setEmailFeedback] = useState('')
    function validateEmail(email) {
        const regex = /^[A-Za-z0-9._%+-]+@(?:gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|yahoo\.[a-z]+|icloud\.com|aol\.com|zoho\.com|protonmail\.com|mail\.com|gmx\.com|yandex\.com)$/i;
        if(regex.test(email)){
            validatePreRegisterEmail(email).then((response) => {
                if(response.data.exists === true){
                    props.setIsValid(false)
                    setEmailFeedback('Ah, This email is already registered!')
                } else{
                    props.setIsValid(true)
                    setEmailFeedback('')
                }
            })
        } 
        else{
            props.setIsValid(false)
            setEmailFeedback('Looks like an invalid email!')
        }
    }
    const handleEmailChange = (event) => {
        const mail = event.target.value.toLowerCase()
        props.setEmail(mail)
        if(mail === ''){
            props.setIsValid(null)
            setEmailFeedback('')
        }else {
            validateEmail(mail)
        }
    };
    
    return (
        <>
        <Text size={'md'} color={primaryColour} fontWeight={"bold"} mb={3}>Your Email is important to us!</Text>
        <List my={2} spacing={3} fontSize={'xs'} textAlign={"justify"}>
            <ListItem>
                <ListIcon as={BiCheckDouble} fontSize={'md'} color={primaryColour} />
                Effective communication, important updates and announcements
            </ListItem>
            <ListItem>
                <ListIcon as={BiUserCheck} fontSize={'md'} color={primaryColour} />
                An email gives credibility and verification for an account in krystel.io
            </ListItem>
            <ListItem>
                <ListIcon as={BiKey} fontSize={'md'} color={primaryColour} />
                An email provides support and recovery features like resetting your password
            </ListItem>
            <ListItem>
                <ListIcon as={BiLock} fontSize={'md'} color={primaryColour} />
                Your email can also be used for Multi-Factor Authentication
            </ListItem>
            <ListItem>
                <ListIcon as={BiLike} fontSize={'md'} color={primaryColour} />
                Your email is confidential with us and we never comprise to any third-parties
            </ListItem>
            <ListItem>
                <ListIcon as={LuHeartHandshake} fontSize={'md'} color={primaryColour} />
                By submitting your email, you will be added to our subscription list, ensuring seamless access to the above-mentioned features
            </ListItem>
        </List>
        <Box>
        <InputGroup>
            <InputLeftElement pointerEvents='none'>
            <BiMailSend color={primaryColourOpaced} />
            </InputLeftElement>
            <Input type='text' value={props.email} placeholder='Enter you Email ...' fontSize={'sm'} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={props.isValid ? "green" : primaryColour} onChange={handleEmailChange}/>
            <InputRightElement pointerEvents='none' >
                { props.isValid === null ? '' : props.isValid ? <BiCheck color={"green"} /> : <BiInfoCircle color={"red"} /> }
            </InputRightElement>
        </InputGroup>
        <Flex justifyContent={'end'}>
            <Text fontSize={'2xs'} mt={2} fontWeight={'bold'} color={primaryColour}> {emailFeedback}</Text>
        </Flex>
        </Box>
        <Flex mt={5} justifyContent={'space-between'}>
            <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
            <Button size={'sm'} ml={'auto'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} onClick={props.incrementStepper} isDisabled={!props.isValid} >Submit</Button>
        </Flex>
        </>
    )
}

export default EmailTab;