import { Box, Card, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { BiCoinStack, BiKey, BiLock, BiLogoTelegram, BiSolidUser } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { maxWidthLayoutSm, primaryColourOpaced } from "../../lib/settings";
import PageLoader from "../collections/misc/PageLoader";
import Password from "./SettingsTab/Password";
import Profile from "./SettingsTab/Profile";
import AddressSettings from "./SettingsTab/Address";
import Address from "./SettingsTab/Address";

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
                        <TabList gap={2} overflow={'auto'} 
                            css={{'::-webkit-scrollbar': {width: '0.5em',},'::-webkit-scrollbar-thumb': {backgroundColor: 'transparent',},}}>
                            <Tab gap={2}><BiSolidUser/> <Text fontSize={'xs'}>Profile</Text></Tab>
                            <Tab gap={2}><BiKey/> <Text fontSize={'xs'}>Password</Text></Tab>
                            <Tab gap={2} isDisabled ><BiLock/> <Text fontSize={'xs'}>MFA</Text></Tab>
                            <Tab gap={2} ><BiCoinStack/> <Text fontSize={'xs'}>Payments</Text></Tab>
                            <Tab gap={2} isDisabled ><BiLogoTelegram/> <Text fontSize={'xs'}>TGAuth</Text></Tab>
                        </TabList>
                        <TabPanels my={5}>
                            <TabPanel p={0}>
                                <Profile/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <Password/>
                            </TabPanel>
                            <TabPanel></TabPanel>
                            <TabPanel p={0}>
                                <Address/>
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