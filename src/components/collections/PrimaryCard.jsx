import { Box, Button, Card, Flex, Text } from "@chakra-ui/react";
import { BsFillDropletFill } from "react-icons/bs";
import {IoBatteryChargingOutline} from "react-icons/io5"
import { primaryColour, primaryColourOpaced } from "../../lib/settings";

function PrimaryCard(){
    return(
        <Card bg={primaryColourOpaced} border={"none"} padding={5} display={"block"} borderBottomRadius={'none'}>
            <Flex justifyContent={"end"} gap={2}>
                <Button bg={"white"} gap={2} size={'xs'} padding={3} >
                    <Text fontSize={"2xs"}>Power Card Activated</Text> <IoBatteryChargingOutline color="green" size={20}/>
                </Button>
                <Button bg={"white"} gap={1} size={'xs'} padding={3} >
                    <BsFillDropletFill color="brown" size={12}/> <Text fontSize={"2xs"}>89%</Text>
                </Button>
            </Flex>
            <Flex color={"white"} mt={5}>
                <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_5kg5gsqjaK.json" mode="bounce"  background="transparent"  speed="0.5"  style={{width: "50%", height: "50%"}}  loop  autoplay></lottie-player>
                <Box display={"flex"} width={"50%"}>
                    <Box margin={"auto"}textAlign={"end"}>
                        <Text fontSize={'3xl'} >753,975 <b>gem<sup>6</sup></b></Text>
                        <Text fontSize={"md"} >
                            total supply in <b>83 days</b>
                        </Text>
                        <Button size={'sm'} mt={10} color={primaryColour}>Harvest 384 gem<sup>6</sup></Button>
                        <Text fontSize={"2xs"} mt={2}>krystelization time: <b>3 days</b></Text>
                    </Box>
                </Box>
            </Flex>
        </Card>
    )
}

export default PrimaryCard;