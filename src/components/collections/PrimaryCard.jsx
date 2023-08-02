import { Box, Button, Card, Flex, TabPanel, TabPanels, Tabs, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { BsFillDropletFill } from "react-icons/bs";
import { IoBatteryChargingOutline } from "react-icons/io5"
import { primaryColour, primaryColourOpaced, secondaryColourOpaced } from "../../lib/settings";
import { useDispatch, useSelector } from "react-redux";
import { krystelValuer } from "../../lib/support";
import { harvestKrystel } from "../../lib/api";
import { setUserProfile } from "../../redux/userProfile/actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CrystalPyramid from "../CrystalPyramid";

function PrimaryCard() {
    const dispatch = useDispatch()
    const toast = useToast()
    const whiteColorModeValue = useColorModeValue(primaryColour, "white")
    const [activeIndex, setActiveIndex] = useState(0)
    const navigate = useNavigate()
    const handleHarvestKrystel = async () => {
        user.harvestVolume >= 1 ?
            await harvestKrystel()
                .then((response) => {
                    dispatch(setUserProfile(response.data.default))
                    toast({
                        title: response.data.message,
                        variant: 'subtle',
                        status: 'info',
                    })
                })
            :
            toast({
                title: "Minimum Harvest should be 100 gem6",
                variant: 'subtle',
                status: 'warning',
            })

    }
    const user = useSelector((state) => state.userReducer);
    const handleToggle = (index) => {
        setActiveIndex(index)
    }
    return (
        user.isAuthenticated &&
        <Tabs size='sm' variant='enclosed' index={activeIndex}>
            <TabPanels>
                <TabPanel p={0}>
                    <Card bg={primaryColourOpaced} border={"none"} padding={5} display={"block"} borderBottomRadius={'none'}>
                        {
                            user.currentFabrication ?
                                <Box>
                                    <Flex justifyContent={"end"} gap={2}>
                                        <Button bg={"white"} gap={2} size={'xs'} padding={3} >
                                            <Text fontSize={"2xs"}>Power Card Activated</Text> <IoBatteryChargingOutline color="green" size={20} />
                                        </Button>
                                        <Button bg={"white"} gap={1} size={'xs'} padding={3} >
                                            <BsFillDropletFill color="brown" size={12} /> <Text fontSize={"2xs"}>{user.fuel}%</Text>
                                        </Button>
                                        <Button bg={"white"} gap={1} size={'xs'} padding={3} >
                                            <Text fontWeight={"bold"} fontSize={"2xs"}>{user.multiplier}x</Text>
                                        </Button>
                                    </Flex>
                                    <Flex color={"white"} mt={5}>
                                        <CrystalPyramid/>
                                        <Box display={"flex"} width={"50%"}>
                                            <Box margin={"auto"} textAlign={"end"}>
                                                <Text fontSize={'3xl'} >{krystelValuer(user.currentFabrication.fabricatedVolume)}</Text>
                                                <Text fontSize={"md"} >
                                                    supplied in <b>{user.currentFabrication.daysFromCreation.slice(1)}</b>
                                                </Text>
                                                <Button size={'sm'} mt={10} onClick={() => handleHarvestKrystel()} color={primaryColour}>Harvest {user.harvestVolume} gem<sup>6</sup></Button>
                                                <Text fontSize={"xs"} mt={2}>last harvest: <b>{user.harvestTime.slice(1)}</b> ago</Text>
                                            </Box>
                                        </Box>
                                    </Flex>
                                    <Button size={'sm'} mt={10} onClick={() => handleToggle(1)} color={primaryColour}>Super Fabrication</Button>

                                </Box>
                                : <Flex p={5}>
                                    <Box m={"auto"} textAlign={"center"}>
                                        <Text fontSize={'sm'} color={"white"}>Start now, by installing a Krystelizer</Text>
                                        <Button size={'sm'} mt={3} color={whiteColorModeValue} onClick={() => navigate('/facility')}>Go to Facility</Button>
                                    </Box>

                                </Flex>
                        }
                    </Card>
                </TabPanel>
                <TabPanel p={0}>
                    <Card bg={secondaryColourOpaced} border={"none"} padding={5} display={"block"} borderBottomRadius={'none'}>
                        {
                            user.currentFabrication ?
                                <Box>
                                    <Flex justifyContent={"end"} gap={2}>
                                        <Button bg={"white"} gap={2} size={'xs'} padding={3} >
                                            <Text fontSize={"2xs"}>Power Card Activated</Text> <IoBatteryChargingOutline color="green" size={20} />
                                        </Button>
                                    </Flex>
                                    <Flex color={"white"} mt={5}>
                                        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_5kg5gsqjaK.json" mode="bounce" background="transparent" speed="0.5" style={{ width: "50%", height: "50%" }} loop autoplay></lottie-player>
                                        <Box display={"flex"} width={"50%"}>
                                            <Box margin={"auto"} textAlign={"end"}>
                                                <Text fontSize={'3xl'} >{krystelValuer(user.currentFabrication.fabricatedVolume)}</Text>
                                                <Text fontSize={"md"} >
                                                    supplied in <b>{user.currentFabrication.daysFromCreation.slice(1)}</b>
                                                </Text>
                                                <Button size={'sm'} mt={10} onClick={() => handleHarvestKrystel()} color={primaryColour}>Harvest {user.harvestVolume} gem<sup>6</sup></Button>
                                                <Text fontSize={"xs"} mt={2}>last harvest: <b>{user.harvestTime.slice(1)}</b> ago</Text>
                                            </Box>
                                        </Box>
                                    </Flex>
                                    <Button size={'sm'} mt={10} onClick={() => handleToggle(0)} color={primaryColour}>Krystelizer</Button>
                                </Box>
                                : <Flex p={5}>
                                    <Box m={"auto"} textAlign={"center"}>
                                        <Text fontSize={'sm'} color={"white"}>Start now, by installing a Krystelizer</Text>
                                        <Button size={'sm'} mt={3} color={whiteColorModeValue} onClick={() => navigate('/facility')}>Go to Facility</Button>
                                    </Box>

                                </Flex>
                        }
                    </Card>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default PrimaryCard;