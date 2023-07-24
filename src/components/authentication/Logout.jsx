import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function Logout(){
    const navigate = useNavigate()
    const toast = useToast()
    useEffect(() => {
        localStorage.removeItem('accessToken')
        navigate('/login')
        toast({
            title: `You have been logged out!`,
            variant: 'subtle',
            status: 'info',
        })
    }, [])
}

export default Logout;