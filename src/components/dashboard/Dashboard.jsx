import { Box, Flex, Text } from "@chakra-ui/react"
import PrimaryCard from "../collections/PrimaryCard"
import SecondaryCard from "../collections/SecondaryCard"
import { maxWidthLayoutSm, primaryColour } from "../../lib/settings"
import { useSelector } from "react-redux";
import PageLoader from "../collections/misc/PageLoader";
import Countdown from "./Countdown"
import { krystelValuer } from "../../lib/support";

function Dashboard(){

    const user = useSelector((state) => state.userReducer);
    const futureDate = new Date('2023-12-19T11:59:59').toISOString()
    const timeZone = 'America/New_York'
    return(
        user.isAuthenticated ?
        <>
            <Box width={maxWidthLayoutSm} mx="auto" pt={"80px"}>
                <PrimaryCard/>
                {/* <Countdown minutes={84}/> */}
                <Box p={5} bg={'white'} boxShadow={"md"} justifyContent={'center'} gap={2} fontSize={'sm'}>
                    <Flex justifyContent={'center'} fontSize={'xs'} gap={2}>
                        <Text color={primaryColour} fontWeight={'bold'}>Total Supply:</Text>
                        <Text>{krystelValuer(user.kollectibles.totalKrystels)}</Text>
                        <Text color={"blackAlpha.600"}>(~ ${(user.kollectibles.totalKrystels/10000).toFixed(2)})</Text>
                    </Flex>
                    <Flex mt={2} justifyContent={'center'} gap={2} fontSize={'md'}>
                        <Text color={primaryColour} fontWeight={'bold'}>Total Yield:</Text>
                        <Text>{krystelValuer(user.kollectibles.totalKrystels + (user.kollectibles.totalSuperOre*1000))}</Text>
                        <Text color={"blackAlpha.600"}>(~ ${((user.kollectibles.totalKrystels + (user.kollectibles.totalSuperOre*1000))/10000).toFixed(2)})</Text>
                    </Flex>
                </Box>
                <SecondaryCard/>
            </Box>
        </>
        :<PageLoader/>
    )
}

export default Dashboard