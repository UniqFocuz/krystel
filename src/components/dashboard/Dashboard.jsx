import { Box, useToast } from "@chakra-ui/react"
import PrimaryCard from "../collections/PrimaryCard"
import SecondaryCard from "../collections/SecondaryCard"
import { useEffect, useState } from "react"
import { dashboard } from "../../lib/api"
import { useNavigate } from "react-router-dom"
import { maxWidthLayoutSm } from "../../lib/settings"
import { useDispatch, useSelector } from "react-redux"
import { setUserProfile } from "../../redux/userProfile/actions"
function Dashboard(){
    const navigate = useNavigate()
    const [dashboardItems, setDashboardItems] = useState(null)
    const toast = useToast()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setUserProfile({
        user : "MOWZLI"
        }))
    }, [])
    
    const user = useSelector((state) => state.userReducer);
    // useEffect(()=>{
    //     dashboard(localStorage.getItem('accessToken'))
    //     .then((response) => {
    //       setDashboardItems(response.data)
    //     })
    //     .catch(error => {
    //         toast({
    //             title: error.response.data,
    //             variant: 'subtle',
    //             status: 'error',
    //         })
    //         navigate(error.response.data.route)
    //     });
    // },[navigate, toast])
    return(
        <>
            <Box width={maxWidthLayoutSm} mx="auto" pt={"80px"}>
                <PrimaryCard/>
                <SecondaryCard/>
            </Box>
        </>
    )
}

export default Dashboard