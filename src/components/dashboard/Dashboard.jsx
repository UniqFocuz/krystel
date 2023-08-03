import { Box } from "@chakra-ui/react"
import PrimaryCard from "../collections/PrimaryCard"
import SecondaryCard from "../collections/SecondaryCard"
import { maxWidthLayoutSm } from "../../lib/settings"

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