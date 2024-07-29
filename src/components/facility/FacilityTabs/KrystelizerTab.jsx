import { Button, Card, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Select, Text, useToast } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { primaryColour, primaryColourOpaced } from "../../../lib/settings";
import { purchaseKrystelizer, validatePreRegisterEmail, validateUsername } from "../../../lib/api";
import { AiOutlineUser } from "react-icons/ai";
import { BiCheck, BiInfoCircle } from "react-icons/bi";
import { setUserProfile } from "../../../redux/userProfile/actions";

function KrystelizerTab(){
    const user = useSelector((state) => state.userReducer);
    const [username, setUsername] = useState('')
    const [kit, setkit] = useState('mastery')
    const [isUsernameValid, setIsUsernameValid] = useState(null); 
    const [usernameFeedback, setUsernameFeedback] = useState('')
    const usernameInputRef = useRef(null);
    const toast = useToast()
    const dispatch = useDispatch()
    const [buyLoader, setBuyLoader] = useState(false)
    const handleUsernameChange = (e) => {
        const username = e.target.value
        setUsername(username)
    }
    const handleKitChange = (e) => {
        const kit = e.target.value
        setkit(kit)
    }
    const handleUsernameSubmit = async() => {
        setBuyLoader(true)
        await purchaseKrystelizer(username, kit)
        .then((response) => {
            setBuyLoader(false)
            dispatch(setUserProfile({...user, kollectibles : {
                ...user.kollectibles, ore : user.kollectibles.ore - 1000
            }}))
            toast({
                title: response.data.message,
                variant: 'subtle',
                status: 'success',
                duration: 15000,
                position: 'top'
            })
        })
        .catch((error) => {
            setBuyLoader(false)
            toast({
                title: error.response.data.message,
                variant: 'subtle',
                status: 'info',
                duration: 10000,
                position: 'top',
            })
        })
    }
    useEffect(() => {
        const validate = async () => {
            try {
                    if (username === '') {
                    setIsUsernameValid(null);
                    setUsernameFeedback('')
                    } else {
                        let response
                        if(username.includes('@') === true){
                            response = await validatePreRegisterEmail(username)
                            setIsUsernameValid(response.data.exists);
                        } else {
                            response = await validateUsername(username)
                            setIsUsernameValid(response.data.exists);
                        }
                            console.log(response.data)
                        if(!response.data.exists){
                            setUsernameFeedback('Invalid User ID or Email!')
                        } else{
                            setUsernameFeedback(`You are purchasing for ${response.data.name}!`)
                        }
                    }
                } catch (error) {
                    setIsUsernameValid(false);
                    setUsernameFeedback('An Error occured!')
                }
        };
    

    const typingTimeout = setTimeout(validate, 500);

    return () => clearTimeout(typingTimeout);
    }, [username]); 

    return(
        <>
        <Card p={5}>
            <Flex px={3} justifyContent={"space-between"} mb={3}>
                <Text mb={3} my={"auto"} fontWeight={'bold'} fontSize={'sm'} color={primaryColour}>Purchase Kit</Text>
                <Button borderRadius={"20px"} size={'sm'} fontSize={'2xs'}>{user.kollectibles.ore.toFixed(0)} Ores</Button>
            </Flex>
        
            <InputGroup px={3}>
                <InputLeftElement pointerEvents='none'>
                <AiOutlineUser color={primaryColour} />
                </InputLeftElement>
                <Input type='text' ref={usernameInputRef} color={primaryColour} value={username} onChange={handleUsernameChange}  placeholder='Receiver User ID or Email' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                <InputRightElement color={primaryColour}>
                {isUsernameValid === null ? '' : isUsernameValid ? <BiCheck role="button" color="green"/> : <BiInfoCircle role="button" color="red"/> }
                </InputRightElement>
            </InputGroup>
            <Text mt={2} mx={3} textAlign={'right'} color={primaryColour} fontSize={'xs'}>{usernameFeedback}</Text>
            <Select px={3} value={kit} color={primaryColour}  fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour} onChange={handleKitChange}>
                <option value='starter'>Starter Kit</option>
                <option value='mastery'>Fabrication Kit</option>
                <option value='craft'>Mastery Kit</option>
            </Select>
            <Button marginTop={5} size={'sm'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} onClick={() => handleUsernameSubmit()} isLoading={buyLoader}>Buy</Button>
        </Card>
        </>
    )
}

export default KrystelizerTab