import { AbsoluteCenter, Box, Card, Divider, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { primaryColour } from "../../lib/settings";
import { SiCrystal } from "react-icons/si"
import { MdOutlineElectricBolt } from "react-icons/md"
import { BsFillDropletFill } from "react-icons/bs";
import { IoBatteryChargingOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { energyValuer, krystelValuer } from "../../lib/support";

function SecondaryCard(){
    const user = useSelector((state) => state.userReducer);
    const grayColorModeValue = useColorModeValue("white", "#2D3748")
    return(
        user.isAuthenticated &&
        <Card borderTopRadius={0} paddingX={5} paddingY={10} marginBottom={20}>
            <Box position='relative'>
                <Divider />
                <AbsoluteCenter bg={grayColorModeValue} px='2'>
                    <Text color={primaryColour} fontWeight={'light'}>my kollection</Text>
                </AbsoluteCenter>
            </Box>
            <Card padding={5} mt={10}>
                <Flex gap={3}>
                    <Box my={'auto'} width={"12%"} display="flex" justifyContent="center" alignItems="center">
                        <SiCrystal color={primaryColour} size={30}/>
                    </Box>
                    <Box my={'auto'} mr={'auto'} width={"55%"}>
                        <Text color={primaryColour} fontSize={'sm'}> Krystel</Text>
                        <Text color={'blackAlpha.500'} fontSize={'2xs'}> Krystels are crafted by the process of krystelization by a Krystelizer, making it rare and expensive </Text>
                    </Box>
                    <Box my={'auto'} textAlign={"end"}>
                        <Text fontWeight={'bolder'} fontSize={'sm'} color={"blackAlpha.800"}>{krystelValuer(user.kollectibles.krystel)}</Text>
                        <Text fontSize={'xs'} color={"blackAlpha.500"}>{krystelValuer(user.kollectibles.totalKrystels)}</Text>
                    </Box>
                </Flex>
            </Card>
            <Card padding={5} mt={5}>
                <Flex gap={3}>
                    <Box my={'auto'} width={"12%"} display="flex" justifyContent="center" alignItems="center">
                    <MdOutlineElectricBolt color={"gold"} size={30}/>
                    </Box>
                    <Box my={'auto'} mr={'auto'} width={"55%"}>
                        <Text color={'goldenrod'} fontSize={'sm'}> Energy</Text>
                        <Text color={'blackAlpha.500'} fontSize={'2xs'}> Energy will be used to increase the efficiency of the Krystelizer</Text>
                    </Box>
                    <Box my={'auto'} textAlign={"end"}>
                        <Text fontWeight={'bolder'} fontSize={'sm'} color={"blackAlpha.800"}>{energyValuer(user.kollectibles.energy)}</Text>
                        <Text fontSize={'xs'} color={"blackAlpha.500"}>{energyValuer(user.kollectibles.energyCap)}</Text>
                    </Box>
                </Flex>
            </Card>
            <Card padding={5} mt={5}>
                <Flex gap={3}>
                    <Box my={'auto'} width={"12%"} display="flex" justifyContent="center" alignItems="center">
                    <BsFillDropletFill color={"brown"} size={30}/>
                    </Box>
                    <Box my={'auto'} mr={'auto'} width={"55%"}>
                        <Text color={'brown'} fontSize={'sm'}> Fuel</Text>
                        <Text color={'blackAlpha.500'} fontSize={'2xs'}>A Krystelizer needs fuel to consistently run. Fuel can be collected every <b>3 hours</b></Text>
                    </Box>
                    <Box my={'auto'} textAlign={"end"}>
                        <Text fontWeight={'bolder'} fontSize={'sm'} color={"blackAlpha.800"}>{user.kollectibles.fuel} gal</Text>
                        <Text fontSize={'xs'}>{user.kollectibles.fuelCap} gal</Text>
                    </Box>
                </Flex>
            </Card>
            <Card padding={5} mt={5}>
                <Flex gap={3}>
                    <Box my={'auto'} width={"12%"} display="flex" justifyContent="center" alignItems="center">
                    <IoBatteryChargingOutline color={"green"} size={30}/>
                    </Box>
                    <Box my={'auto'} mr={'auto'} width={"55%"}>
                        <Text color={'green'} fontSize={'sm'}> Power</Text>
                        <Text color={'blackAlpha.500'} fontSize={'2xs'}> Power cards are required to start a Krystelizer</Text>
                    </Box>
                    <Box my={'auto'} textAlign={"end"}>
                        <Text fontWeight={'bolder'} fontSize={'sm'} color={"blackAlpha.800"}>x{user.kollectibles.powerCards}</Text>
                        <Text fontSize={'xs'}>Max. x{user.kollectibles.powerCardsCap}</Text>
                    </Box>
                </Flex>
            </Card>
        </Card>
    )
}

export default SecondaryCard;