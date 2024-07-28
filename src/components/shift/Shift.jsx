import { Box, Button, Card, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { maxWidthLayoutSm, primaryColourOpaced } from "../../lib/settings"
import { IoChevronBackOutline } from "react-icons/io5"
import { useLocation, useNavigate } from "react-router-dom"
import PageLoader from "../collections/misc/PageLoader"
import { useSelector } from "react-redux"
import { BiStar } from "react-icons/bi"
import ShiftTable from "./ShiftTabs/ShiftTable"
import { AiOutlineUser } from "react-icons/ai"
import DirectTable from "./ShiftTabs/DirectTable"
import { useEffect, useState } from "react"
import { BsGem } from "react-icons/bs"
import { GiGems } from "react-icons/gi"

function Shift(){
    const navigate = useNavigate()
    const user = useSelector((state) => state.userReducer);
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(0)
    const queryParams = new URLSearchParams(location.search);
    const initialTab = queryParams.get("tab");
    
    useEffect(() => {
        initialTab === "1" && setActiveTab(parseInt(initialTab))
    }, [])
    
    return(
        user.isAuthenticated ?
        <>
            <Box width={maxWidthLayoutSm} mx="auto" pt={"80px"}>
                <Card bg={primaryColourOpaced} color={"white"} padding={5} borderBottomRadius={'none'}>
                    <Flex gap={2} py={2} justifyContent={"space-between"} width={"100%"}>
                        <Flex gap={2} onClick={() => navigate(-1)} role="button">
                            <IoChevronBackOutline fontWeight={'bold'} size={25} /> <Text fontWeight={"bold"} my={"auto"}>Back</Text>
                        </Flex>
                        <Text my={"auto"} fontWeight={'bold'}>Shifts</Text>
                    </Flex>
                </Card>
                <Card borderTopRadius={0} padding={5} marginBottom={20} height={"550px"} overflowX={"auto"}>
                    <Tabs size='md' variant='soft-rounded' colorScheme="orange" defaultIndex={activeTab}>
                        <TabList gap={2}>
                            <Tab><BiStar/></Tab>
                            <Tab><BsGem/></Tab>
                            <Tab><GiGems/></Tab>
                            <Tab><AiOutlineUser/></Tab>
                        </TabList>
                        <TabPanels my={5}>
                            <TabPanel p={0}>
                                <ShiftTable kit="starter"/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <ShiftTable kit="mastery"/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <ShiftTable kit="craft"/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <DirectTable/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </Card>
            </Box>
        </>
        : <PageLoader/>
    )
}

export default Shift