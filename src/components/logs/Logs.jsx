import { Box, Card, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { maxWidthLayoutSm, primaryColourOpaced } from "../../lib/settings"
import { IoChevronBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { fetchTransactions } from "../../lib/api"
import { useEffect, useState } from "react"
import { GoArrowSwitch } from "react-icons/go"
import LogPanel from "./LogsTab/LogPanel"
import { useSelector } from "react-redux"
import PageLoader from "../collections/misc/PageLoader"
import { Loader } from "three"

function Logs(){
    const navigate = useNavigate()
    const [logs, setLogs] = useState()
    const [fetching, setFetching] = useState(false)
    useEffect(() => {
        setFetching(true)
        const fetchLogs = async() => {
            await fetchTransactions('all')
            .then((response) => {
                setLogs(response.data)
            })
            setFetching(false)
        }
        fetchLogs()
    }, [])
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
                        <Text my={"auto"} fontWeight={'bold'}>Logs</Text>
                    </Flex>
                </Card>
                <Card borderTopRadius={0} padding={5} marginBottom={20} height={"550px"} overflowX={"auto"}>
                    <Tabs size='md' variant='soft-rounded' colorScheme="orange">
                        <TabList gap={2}>
                            <Tab><GoArrowSwitch/></Tab>
                        </TabList>
                        <TabPanels my={5}>
                            <TabPanel p={0}>{
                                !fetching ?
                                <LogPanel {...{logs}} />
                                : 
                                <PageLoader/>
                                }
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </Card>
            </Box>
        </>
        : <PageLoader/>
    )
}

export default Logs