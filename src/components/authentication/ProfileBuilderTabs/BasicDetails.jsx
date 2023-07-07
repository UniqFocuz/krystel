import { Box, Button, Flex, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Text, useColorModeValue } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { BiCheck, BiChevronRight, BiInfoCircle, BiUserCheck, BiUserPlus } from "react-icons/bi"
import { useEffect, useState } from "react"
import { AiOutlineUser } from "react-icons/ai"
import { validateUsername } from "../../../lib/api"
import { LuCalendarHeart, LuCaseLower } from "react-icons/lu"


function BasicDetails(props){
    const grayColorModeValue = useColorModeValue("gray.600")
    const [isUsernameValid, setIsUsernameValid] = useState(null)
    const [isSponsorValid, setisSponsorValid] = useState(null)
    const [hasSplChars, setHasSplChars] = useState(null)
    const regex = (username) => {
        return /^[a-zA-Z0-9]{6,}$/.test(username)
    }

    useEffect(() => {
        const validate = async () => {
            try {
                if (props.progress.data.username === '') {
                  setIsUsernameValid(null); // Reset to null when the username field is empty
                  setHasSplChars(null)
                } else {
                    if(regex(props.progress.data.username) === true){
                        const response = await validateUsername(props.progress.data.username)
                        setIsUsernameValid(!response.data.exists)
                        setHasSplChars(false)
                    } else{
                        setIsUsernameValid(false)
                        setHasSplChars(true)
                    }
                }
              } catch (error) {
                setIsUsernameValid(true);
              }
        };
    

    const typingTimeout = setTimeout(validate, 1000); // Wait for 500ms after typing stops before validating

    return () => clearTimeout(typingTimeout); // Cleanup the timeout on unmount or when the username changes
    }, [props.progress.data.username]);

    useEffect(() => {
        const validate = async () => {
            try {
                if (props.progress.data.sponsor === '') {
                  setisSponsorValid(null); // Reset to null when the username field is empty
                  setHasSplChars(null)
                } else {
                    const response = await validateUsername(props.progress.data.sponsor)
                    setisSponsorValid(response.data.exists)
                    setHasSplChars(true)
                }
              } catch (error) {
                setisSponsorValid(false);
              }
        };
    

    const typingTimeout = setTimeout(validate, 1000); // Wait for 500ms after typing stops before validating

    return () => clearTimeout(typingTimeout); // Cleanup the timeout on unmount or when the username changes
    }, [props.progress.data.sponsor]);
    
    const handleUsernameChange = (e) => {
        const username = e.target.value.toUpperCase()
        props.setProgress({ ...props.progress, data: {
            ...props.progress.data,username
        } })
    };

    const handleSponsorChange = (e) => {
        const sponsor = e.target.value.toUpperCase()
        props.setProgress({ ...props.progress, data: {
            ...props.progress.data, sponsor
        } })
    };

    const handleFirstNameChange = (e) => {
        const firstName = e.target.value.toUpperCase()
        props.setProgress({ ...props.progress, data: {
            ...props.progress.data, firstName
        } })
    };

    const handleLastNameChange = (e) => {
        const lastName = e.target.value.toUpperCase()
        props.setProgress({ ...props.progress, data: {
            ...props.progress.data, lastName
        } })
    };

    return (
        <>
        <Text fontSize='md' fontWeight='bold' color={primaryColour}>
            Heads up for a Quick Start!
        </Text>
        <Text marginY={5} fontSize={"sm"} textAlign={"justify"} color={grayColorModeValue}>
            Let's fill in few important details!
        </Text>
        <Box>
            <InputGroup mb={2}>
                <InputLeftElement pointerEvents='none'>
                <AiOutlineUser color={primaryColour} />
                </InputLeftElement>
                <Input type='text' color={primaryColour} value={props.progress.data.username} onChange={handleUsernameChange}  placeholder='Username' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                <InputRightElement color={primaryColour}>
                {isUsernameValid == null ? '' : isUsernameValid ? <BiCheck role="button" color="green"/> : <BiInfoCircle role="button" color="red"/> }
                </InputRightElement>
            </InputGroup>
            <Flex justifyContent={'end'}>
                <Text fontSize={'2xs'} width={"70%"} mt={1} textAlign={'end'} fontWeight={'bold'} color={primaryColour}>{
                isUsernameValid === null
                ? '' : hasSplChars == null ? '' : hasSplChars === true
                ?  'Username must be atleast 6 chars and only be combination of letters and numbers. Other characters are not allowed!'
                : '' }</Text>
            </Flex>
            <InputGroup my={2}>
                <InputLeftElement pointerEvents='none'>
                <BiUserCheck color={primaryColour} />
                </InputLeftElement>
                <Input type='text' color={primaryColour} value={props.progress.data.sponsor} onChange={handleSponsorChange}  placeholder='Patron' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                <InputRightElement color={primaryColour}>
                {isSponsorValid == null ? '' : isSponsorValid ? <BiCheck role="button" color="green"/> : <BiInfoCircle role="button" color="red"/> }
                </InputRightElement>
            </InputGroup>
            <Flex justifyContent={'end'}>
                <Text fontSize={'2xs'} width={"70%"} mt={1} textAlign={'end'} fontWeight={'bold'} color={primaryColour}>{isSponsorValid === null ? '' : !isSponsorValid && 'Cannot find the Patron!'}</Text>
            </Flex>
            <Flex gap={5}>
                <InputGroup my={2}>
                    <InputLeftElement pointerEvents='none'>
                    <LuCaseLower color={primaryColour} />
                    </InputLeftElement>
                    <Input type='text' color={primaryColour} value={props.progress.data.firstName} onChange={handleFirstNameChange}  placeholder='First Name' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                </InputGroup>
                <InputGroup my={2}>
                    <InputLeftElement pointerEvents='none'>
                    <LuCaseLower color={primaryColour} />
                    </InputLeftElement>
                    <Input type='text' color={primaryColour} value={props.progress.data.lastName} onChange={handleLastNameChange}  placeholder='Last Name' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                </InputGroup>
            </Flex>
            <Flex gap={5}>
                <InputGroup my={3} width={"50%"}>
                    <InputLeftElement pointerEvents='none'>
                    <LuCalendarHeart color={primaryColour} />
                    </InputLeftElement>
                    <Input type='date' color={primaryColour} value={props.progress.data.lastName} onChange={handleLastNameChange}  placeholder='Last Name' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                </InputGroup>
                <Flex width={"50%"}>
                <Text my={"auto"} color={"gray"} fontSize={'xs'}>Must be 18 years or above!</Text>
                </Flex>
            </Flex>
        </Box>
        <Flex mt={5} justifyContent={'space-between'}>
            <Button my={"auto"} size={'sm'} colorScheme='orange' variant='ghost' onClick={props.decrementStepper}>Back</Button>
            <IconButton size={'md'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} rounded={"50%"} isLoading={props.isLoading} onClick={props.incrementStepper}  icon={<BiChevronRight size={25}/>}/> 
        </Flex>
        </>
    )
}

export default BasicDetails;