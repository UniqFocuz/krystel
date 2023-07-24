import { Box, Button, Card, Flex, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { BsFillDropletFill } from "react-icons/bs";
import { IoBatteryChargingOutline } from "react-icons/io5"
import { primaryColour, primaryColourOpaced } from "../../lib/settings";
import { useDispatch, useSelector } from "react-redux";
import { krystelValuer } from "../../lib/support";
import { harvestKrystel } from "../../lib/api";
import { setUserProfile } from "../../redux/userProfile/actions";
import { useNavigate } from "react-router-dom";

function PrimaryCard() {
    const dispatch = useDispatch()
    const toast = useToast()
    const whiteColorModeValue = useColorModeValue(primaryColour, "white")
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
    return (
        user.isAuthenticated &&
        <Card bg={primaryColourOpaced} border={"none"} padding={5} display={"block"} borderBottomRadius={'none'}>
            {
                user.currentFabrication ?
                    <Box>
                        <Flex justifyContent={"end"} gap={2}>
                            <Button bg={"white"} gap={2} size={'xs'} padding={3} >
                                <Text fontSize={"2xs"}>Power Card Activated</Text> <IoBatteryChargingOutline color="green" size={20} />
                            </Button>
                            <Button bg={"white"} gap={1} size={'xs'} padding={3} >
                                <BsFillDropletFill color="brown" size={12} /> <Text fontSize={"2xs"}>89%</Text>
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
                    </Box>
                : <Flex p={5}>
                    <Box m={"auto"} textAlign={"center"}>
                    <Text fontSize={'sm'} color={"white"}>Start now, by installing a Krystelizer</Text>
                    <Button size={'sm'} mt={3} color={whiteColorModeValue} onClick={() => navigate('/facility')}>Go to Facility</Button>
                    </Box>

                </Flex>
            }
        </Card>
    )
}

export default PrimaryCard;