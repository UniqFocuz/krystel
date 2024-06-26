import { Box, Card, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { dashboard } from "../../lib/api"
import { useNavigate } from "react-router-dom"
import { maxWidthLayoutSm, primaryColourOpaced } from "../../lib/settings"
import { useDispatch, useSelector } from "react-redux"
import { setUserProfile } from "../../redux/userProfile/actions"
import { IoBatteryChargingOutline, IoChevronBackOutline } from "react-icons/io5"
import { BiSolidBattery, BiStar } from "react-icons/bi"
import { MdOutlineElectricBolt } from "react-icons/md"
import { BsFillDropletFill } from "react-icons/bs"
import KrystelizerTab from "./FacilityTabs/KrystelizerTab"
import PageLoader from "../collections/misc/PageLoader"
import SuperOreTransfer from "./FacilityTabs/SuperOreTransfer"
import FragmentationTab from "./FacilityTabs/FragmentationTab"
import SuperFabricator from "./FacilityTabs/SuperFabricator"

function Facility() {
    const navigate = useNavigate()
    const toast = useToast()
    const dispatch = useDispatch()

    useEffect(() => {
        dashboard()
            .then((response) => {
                dispatch(setUserProfile(response.data.default))
            })
            .catch(error => {
                toast({
                    title: error.response.data,
                    variant: 'subtle',
                    status: 'error',
                })
                navigate(error.response.data.route)
            });
    }, [navigate, toast])
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
                        <Text my={"auto"} fontWeight={'bold'}>Facility</Text>
                    </Flex>
                </Card>
                <Card borderTopRadius={0} padding={5} marginBottom={20} height={"550px"} overflowX={"auto"}>
                    <Tabs variant='soft-rounded' colorScheme="orange">
                        <TabList gap={2} overflow={'auto'} 
                            css={{'::-webkit-scrollbar': {width: '0.5em',},'::-webkit-scrollbar-thumb': {backgroundColor: 'transparent',},}}>
                            <Tab><BiStar/></Tab>
                            <Tab><Text fontSize={"xs"} whiteSpace="nowrap">Super Fabricator</Text></Tab>
                            <Tab><Text fontSize={"xs"}>Defabricator</Text></Tab>
                            <Tab><Text fontSize={"xs"}>Fragmentor</Text></Tab>
                            <Tab isDisabled><Text fontSize={"xs"}>IPCE</Text></Tab>
                        </TabList>
                        <TabPanels my={5}>
                            <TabPanel p={0}>
                                <KrystelizerTab/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <SuperFabricator/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <SuperOreTransfer/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <FragmentationTab/>
                            </TabPanel>
                            <TabPanel p={0}>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Card>
            </Box>
        </>
        : <PageLoader/>
    )
}

export default Facility