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
        .then((response) => {
          setDashboardItems(response.data)
        })
        .catch(error => {
            toast({
                title: error.response.data.message,
                variant: 'subtle',
                status: 'error',
            })
            navigate(error.response.data.route)
        });
    },[navigate, toast])
    return(
        dashboardItems &&
        <>
            <Box width={{base: "90%", md: "45%", lg: "30%"}} mx="auto" pt={"80px"}>
                <PrimaryCard/>
                <SecondaryCard/>
                {dashboardItems.message}
                <MenuBar/>
            </Box>
        </>
    )
}

export default Dashboard