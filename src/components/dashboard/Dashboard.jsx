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