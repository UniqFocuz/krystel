import { Box, Card, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { maxWidthLayoutSm, primaryColourOpaced } from "../../lib/settings";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Profile from "./SettingsTab/Profile";
import { BiSolidUser } from "react-icons/bi";

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
                        <Text my={"auto"} fontWeight={'bold'}>Settings</Text>
                    </Flex>
                </Card>
                <Card borderTopRadius={0} padding={5} marginBottom={20} height={"550px"} overflowX={"auto"}>
                    <Tabs size='md' variant='soft-rounded' colorScheme="orange">
                        <TabList gap={2}>
                            <Tab gap={2}><BiSolidUser/> <Text fontSize={'xs'}>Profile</Text></Tab>
                        </TabList>
                        <TabPanels my={5}>
                            <TabPanel p={0}>
                                <Profile/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Card>
            </Box>
        </>
        :
        <></>
    )
}

export default Settings