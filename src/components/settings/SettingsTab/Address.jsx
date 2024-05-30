import { Button, Input, InputGroup, InputLeftElement, InputRightElement, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { BiCheck, BiInfoCircle } from "react-icons/bi"
import { fetchWalletAddresFromNetwork, setWalletAddress } from "../../../lib/api"
import { useState } from "react"
import { primaryColour, primaryColourOpaced } from "../../../lib/settings"
import { CgRename } from "react-icons/cg"
import PageLoader from "../../collections/misc/PageLoader"
import { useSelector } from "react-redux"

function Address(){
    const user = useSelector((state) => state.userReducer);
    const [isLoading, setIsLoading] = useState(false)
    const [payoutAddress, setPayoutAddress] = useState(user.payoutAddress)
    const [isAddressValid, setIsAddressValid] = useState(null)
    const [addressFeedback, setAddressFeedback] = useState('')

    const toast = useToast();

    const fetchWalletAddres = async(e) => {
        var el = e.target.value
        setPayoutAddress(el)
        setIsLoading(true)
        if (el !== ""){
            if(el === user.payoutAddress){
                setIsAddressValid(null)
                setAddressFeedback('')
                setIsLoading(false)
            } else{
                await fetchWalletAddresFromNetwork(el)
                .then((response) => {
                    setIsAddressValid(response.data.result)
                    setAddressFeedback(response.data.message)
                    setIsLoading(false)
                })
            }
        } else{
            setIsAddressValid(null)
            setAddressFeedback('')
            setIsLoading(false)

        }
    }

    const handleSetWalletAddress = async() => {
        setIsLoading(true)
        await setWalletAddress(payoutAddress)
        .then((response) => {
            setIsLoading(false)
            toast({
                title: response.data.message,
                variant: 'subtle',
                status: 'info',
            })
        })
        .catch((error) => {
            setIsLoading(false)
            toast({
                title: error.response.data.message,
                variant: 'subtle',
                status: 'error',
            })
        })
    }
    return(

        user.isAuthenticated?
        <>

            <Text textAlign={'justify'} fontSize={'xs'} mb={3} color={"gray"}>
            The Payments page provides users with the functionality to manage their payout Tron address securely. As a vital aspect of account management, this feature enables users to update their Tron address to ensure seamless and accurate transactions.
            </Text>
            <InputGroup px={3}>
                <InputLeftElement pointerEvents='none'>
                <CgRename color={primaryColour} />
                </InputLeftElement>
                <Input type='text' placeholder='Payout Address' value={payoutAddress} onChange={fetchWalletAddres} fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                <InputRightElement color={primaryColour}>
                {isAddressValid === null ? '' : isAddressValid ? <BiCheck role="button" color="green"/> : <BiInfoCircle role="button" color="red"/> }
                </InputRightElement>
            </InputGroup>
            <Text mx={3} color={'red'} fontSize={'xs'} textAlign={'end'} >{addressFeedback}</Text>
            <Button marginTop={5} size={'xs'} bg={primaryColourOpaced} _hover={{backgroundColor: primaryColour}} color={"white"} isDisabled={!isAddressValid} onClick={() => handleSetWalletAddress()} isLoading={isLoading}>Set Address</Button>
        </>
        : <PageLoader/>
    )
}

export default Address