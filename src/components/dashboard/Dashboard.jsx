import { Box } from "@chakra-ui/react"
import PrimaryCard from "../collections/PrimaryCard"
import SecondaryCard from "../collections/SecondaryCard"
import { maxWidthLayoutSm } from "../../lib/settings"
import { useSelector } from "react-redux";
import PageLoader from "../collections/misc/PageLoader";
import Countdown from "./Countdown"

function Dashboard(){

    const user = useSelector((state) => state.userReducer);
    const futureDate = new Date('2023-12-19T11:59:59').toISOString()
    return(
        user.isAuthenticated ?
        <>
            <Box width={maxWidthLayoutSm} mx="auto" pt={"80px"}>
                <PrimaryCard/>
                <Countdown futureDate={futureDate} />
                <SecondaryCard/>
            </Box>
        </>
        :<PageLoader/>
    )
}

export default Dashboard