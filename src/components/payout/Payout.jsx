import { Box, Card, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { maxWidthLayoutSm, primaryColourOpaced } from "../../lib/settings";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BiCoinStack } from "react-icons/bi";
import { GoArrowSwitch } from "react-icons/go";
import PageLoader from "../collections/misc/PageLoader";
import PayoutMain from "./PayoutTabs/PayoutMain";
import Invoices from "./PayoutTabs/Invoices";

function Settings() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.userReducer);
    return (
        user.isAuthenticated?
        <>
            <Box width={maxWidthLayoutSm} mx="auto" pt={"80px"}>
                <Card bg={primaryColourOpaced} color={"white"} padding={5} borderBottomRadius={'none'}>
                    <Flex gap={2} py={2} justifyContent={"space-between"} width={"100%"}>
                        <Flex gap={2} onClick={() => navigate(-1)} role="button">
                            <IoChevronBackOutline fontWeight={'bold'} size={25} /> <Text fontWeight={"bold"} my={"auto"}>Back</Text>
                        </Flex>
                        <Text my={"auto"} fontWeight={'bold'}>Payout</Text>
                    </Flex>
                </Card>
                <Card borderTopRadius={0} padding={5} marginBottom={20} height={"550px"} overflowX={"auto"}>
                    <Tabs size='md' variant='soft-rounded' colorScheme="orange">
                        <TabList gap={2} overflow={'auto'} 
                            css={{'::-webkit-scrollbar': {width: '0.5em',},'::-webkit-scrollbar-thumb': {backgroundColor: 'transparent',},}}>
                            <Tab gap={2}><BiCoinStack/> <Text fontSize={'xs'}>Payout</Text></Tab>
                            <Tab gap={2}><GoArrowSwitch/> <Text fontSize={'xs'}>Invoices</Text></Tab>

                        </TabList>
                        <TabPanels my={5} >
                            <TabPanel p={0}>
                                <PayoutMain/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <Invoices/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Card>
            </Box>
        </>
        : <PageLoader/>
    )
}

export default Settings