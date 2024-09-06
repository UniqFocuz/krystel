import { Box, Button, Card, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { maxWidthLayoutSm, primaryColourOpaced } from "../../lib/settings"
import { IoChevronBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import TransferTab from "./TransferTabs/TransferTab"
import PageLoader from "../collections/misc/PageLoader"
import { useSelector } from "react-redux"
import SOTransferTab from "./TransferTabs/SOTransferTab"

function Transfer(){
    const navigate = useNavigate()
    const user = useSelector((state) => state.userReducer);
    return(
        user.isAuthenticated ?
        <>
            <Box width={maxWidthLayoutSm} mx="auto" pt={"80px"}>
                <Card bg={primaryColourOpaced} color={"white"} padding={5} borderBottomRadius={'none'}>
                    <Flex gap={2} py={2} justifyContent={"space-between"} width={"100%"}>
                        <Flex gap={2} onClick={() => navigate(-1)} role="button">
                            <IoChevronBackOutline fontWeight={'bold'} size={25} /> <Text fontWeight={"bold"} my={"auto"}>Back</Text>
                        </Flex>
                        <Text my={"auto"} fontWeight={'bold'}>Transfer</Text>
                    </Flex>
                </Card>
                <Card borderTopRadius={0} padding={5} marginBottom={20} height={"550px"} overflowX={"auto"}>
                    <Tabs size='md' variant='soft-rounded' colorScheme="orange">
                        <TabList gap={2}>
                            <Tab><Text fontSize={'xs'}>Ore</Text></Tab>
                            <Tab><Text fontSize={'xs'}>Super Ore</Text></Tab>
                        </TabList>
                        <TabPanels my={5}>
                            <TabPanel p={0}>
                                <TransferTab/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <SOTransferTab/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </Card>
            </Box>
        </>
        : <PageLoader/>
    )
}

export default Transfer