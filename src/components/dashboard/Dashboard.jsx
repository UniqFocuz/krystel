import { Box } from "@chakra-ui/react"
import PrimaryCard from "../collections/PrimaryCard"
import SecondaryCard from "../collections/SecondaryCard"
import { maxWidthLayoutSm } from "../../lib/settings"
import { useSelector } from "react-redux";

function Dashboard(){

    const user = useSelector((state) => state.userReducer);
    return(
        user.isAuthenticated ?
        <>
            <Box width={maxWidthLayoutSm} mx="auto" pt={"80px"}>
                <PrimaryCard/>
                <SecondaryCard/>
            </Box>
        </>
        :
        <>Loading ...</>
    )
}

export default Dashboard