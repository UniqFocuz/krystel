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
    const toast = useToast()
    const dispatch = useDispatch()
    const [pageLoading, setIsPageLoading] = useState(false)
    useEffect(()=>{
        dashboard()
        .then((response) => {
            dispatch(setUserProfile(response.data.default))
        })
        .catch(error => {
            toast({
                title: error.response.data,
                variant: 'subtle',
                status: 'error',
            })
            navigate(error.response.data.route)
        });
    },[navigate, toast])
    const user = useSelector((state) => state.userReducer);
    return(
        user.isAuthenticated ?
        <>
            <Box width={maxWidthLayoutSm} mx="auto" pt={"80px"}>
                <PrimaryCard/>
                <SecondaryCard/>
            </Box>
        </>
        : <>
        Loading ...
        </>
    )
}

export default Dashboard