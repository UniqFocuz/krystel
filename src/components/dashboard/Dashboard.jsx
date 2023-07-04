import { Box, Button, Card, Flex, Text } from "@chakra-ui/react"
import Navbar from "../collections/Navbar"
import PrimaryCard from "../collections/PrimaryCard"
import MenuBar from "../collections/MenuBar"
import SecondaryCard from "../collections/SecondaryCard"
function Dashboard(){
    return(
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