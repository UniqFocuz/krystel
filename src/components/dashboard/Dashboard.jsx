import { Box, useToast } from "@chakra-ui/react"
import Navbar from "../collections/Navbar"
import PrimaryCard from "../collections/PrimaryCard"
import MenuBar from "../collections/MenuBar"
import SecondaryCard from "../collections/SecondaryCard"
import { useEffect, useState } from "react"
import { dashboard } from "../../lib/api"
import { useNavigate } from "react-router-dom"
function Dashboard(){
    const navigate = useNavigate()
    const [dashboardItems, setDashboardItems] = useState(null)
    const toast = useToast()
    
    useEffect(()=>{
        dashboard(localStorage.getItem('accessToken'))
        .then(response => {
          setDashboardItems(response.data)
        })
        .catch(error => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            if(error.response.status === 401){
                toast({
                  title: `Your session expired. Please Login again!`,
                  variant: 'subtle',
                  status: 'error',
                })
                navigate('/login')
            }
            if(error.response.status === 308){
                toast({
                  title: `Multi-Factor Authentication Required`,
                  variant: 'subtle',
                  status: 'error',
                })
                navigate('/login/mfa')
            }
        });
    },[navigate, toast])
    return(
        dashboardItems &&
        <>
            <Navbar/>
            <Box width={{base: "90%", md: "45%", lg: "30%"}} mx="auto">
                <PrimaryCard/>
                <SecondaryCard/>
                <MenuBar/>
            </Box>
        </>
    )
}

export default Dashboard