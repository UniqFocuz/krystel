import { AbsoluteCenter, Box, Card, Divider, Flex, Text } from "@chakra-ui/react";
import { primaryColour } from "../../lib/settings";
import { SiCrystal } from "react-icons/si"
import { MdOutlineElectricBolt } from "react-icons/md"
import { BsFillDropletFill } from "react-icons/bs";
import { IoBatteryChargingOutline } from "react-icons/io5";

function SecondaryCard(){
    return(
        <Card borderTopRadius={0} paddingX={5} paddingY={10} marginBottom={20}>
            <Box position='relative'>
                <Divider />
                <AbsoluteCenter bg='white' px='2'>
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
                        <Text fontWeight={'bolder'} fontSize={'sm'} color={"blackAlpha.800"}>0.753975 KTL</Text>
                        <Text fontSize={'xs'} color={"blackAlpha.500"}>753,975 <b>gem<sup>6</sup></b></Text>
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
                        <Text fontWeight={'bolder'} fontSize={'sm'} color={"blackAlpha.800"}>198 kWh</Text>
                        <Text fontSize={'xs'} color={"blackAlpha.500"}>1,386 kWh</Text>
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
                        <Text fontWeight={'bolder'} fontSize={'sm'} color={"blackAlpha.800"}>190 gal</Text>
                        <Text fontSize={'xs'} color={"brown"}>10 gal</Text>
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
                        <Text fontWeight={'bolder'} fontSize={'sm'} color={"blackAlpha.800"}>x3 Cards</Text>
                    </Box>
                </Flex>
            </Card>
        </Card>
    )
}

export default SecondaryCard;