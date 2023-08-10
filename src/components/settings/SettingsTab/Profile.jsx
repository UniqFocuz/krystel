import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Stack, Text, useToast } from "@chakra-ui/react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { LuCalendarHeart, LuCaseLower } from "react-icons/lu";
import { BiSolidHeart } from "react-icons/bi";
import { updateProfile } from "../../../lib/api";

function Profile(){
    const user = useSelector((state) => state.userReducer);
    const [isAgeValid, setIsAgeValid] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    const [userInstance, setUserInstance] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        nickname: user.nickName,
        dateOfBirth: user.dateOfBirth
    })
    function verifyAge(birthDate) {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        if (age >= 18) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (userInstance.dateOfBirth === null) {
            setIsAgeValid(null)
        } else {
            setIsAgeValid(verifyAge(userInstance.dateOfBirth))
        }
    }, [userInstance.dateOfBirth])
    const isAlphanumeric = (value) => {
        const alphanumericRegex = /^[a-zA-Z0-9]*$/;
        return alphanumericRegex.test(value);
    }
    
    const handleFirstNameChange = (e) => {
        const first_name = e.target.value;
        if (!isAlphanumeric(first_name)) {
            return;
        }
        setUserInstance({
            ...userInstance,
            first_name: first_name
        });
    }
    const handleLastNameChange = (e) => {
        const last_name = e.target.value;
        if (!isAlphanumeric(last_name)) {
            return;
        }
        setUserInstance({
            ...userInstance,
            last_name: last_name
        });
    }
    const handleNickNameChange = (e) => {
        const nickname = e.target.value;
        if (!isAlphanumeric(nickname)) {
            return;
        }
        setUserInstance({
            ...userInstance,
            nickname: nickname
        });
    }
    const handleDateOfBirthChange = (e) => {
        const dateOfBirth = e.target.value
        setUserInstance({...userInstance, dateOfBirth:dateOfBirth })
    }
    const handleSubmit = async() => {
        setIsLoading(true)
        await updateProfile(userInstance)
        .then((response) => {
            toast({
                title: response.data.message,
                variant: 'subtle',
                status: 'success',
            })
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <>
        <Box mx={2}>
            <Text textAlign={'justify'} fontSize={'xs'} mb={3} color={"gray"}>Your profile will be the identity for you amongst the Research Community. Your nickname can be used to identify yourself with your peers while collaborating researches and transfering resources.</Text>
            <Stack rowGap={3}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                    <AiOutlineUser color={primaryColour} />
                    </InputLeftElement>
                    <Input type='text' color={primaryColour} value={user.username} fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour} readOnly />
                </InputGroup>
                <Text fontSize={'2xs'} textAlign={'end'} color={"gray"}>User ID cannot be edited!</Text>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <LuCaseLower color={primaryColour} />
                    </InputLeftElement>
                    <Input type='text' color={primaryColour} value={userInstance.first_name} onChange={handleFirstNameChange} placeholder='First Name' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} focusBorderColor={primaryColour} />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <LuCaseLower color={primaryColour} />
                    </InputLeftElement>
                    <Input type='text' color={primaryColour} value={userInstance.last_name} onChange={handleLastNameChange} placeholder='Last Name' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} focusBorderColor={primaryColour} />
                </InputGroup>
                <InputGroup width={"50%"}>
                    <InputLeftElement pointerEvents='none'>
                        <LuCalendarHeart color={primaryColour} />
                    </InputLeftElement>
                    <Input type='date' color={primaryColour} value={userInstance.dateOfBirth}  onChange={handleDateOfBirthChange} placeholder='Last Name' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} focusBorderColor={primaryColour} readOnly={user.dobBool} />
                </InputGroup>
                <Flex width={"50%"}>
                    <Text my={"auto"} color={primaryColour} fontSize={'xs'}>{isAgeValid !== null && !isAgeValid && 'Must be 18 years or above!'}</Text>
                </Flex>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <BiSolidHeart color={primaryColour} />
                    </InputLeftElement>
                    <Input type='text' color={primaryColour} value={userInstance.nickname} onChange={handleNickNameChange} placeholder='Nick Name' fontSize={"sm"} fontWeight={'medium'} _placeholder={{ fontSize: "sm", fontWeight: 'normal' }} variant={'flushed'} focusBorderColor={primaryColour} />
                </InputGroup>
                <Flex mb={3} justifyContent={'end'}>
                    <Button my={"auto"} fontSize={'2xs'} py={1} size={"xs"} role="button" px={3} color={"white"} bg={primaryColourOpaced} onClick={() => handleSubmit()} _hover={{bg: primaryColour}} isLoading={isLoading} borderRadius={15}>Update</Button>
                </Flex>
            </Stack>
        </Box>
        </>
    )
}

export default Profile