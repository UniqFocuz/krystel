import { Button, Card, Grid, GridItem } from "@chakra-ui/react"
import { BiBarChartSquare } from "react-icons/bi"
import { HiCog6Tooth, HiMiniArrowsRightLeft, HiMiniShoppingBag } from "react-icons/hi2"
import { FaPeopleGroup } from "react-icons/fa6"
import { primaryColour } from "../../lib/settings"
import { MdOutlineAttachMoney } from "react-icons/md"
function MenuBar(){
    return (
        <Card position="fixed" bottom="0" width={{base: "90%", md: "45%", lg: "30%"}}>
        <Grid templateColumns='repeat(6, 1fr)'>
            <GridItem>
                <Button width={'100%'} borderBottomColor={primaryColour} borderBottomWidth={3} borderRadius={0} bg={'white'} height={"50px"}><BiBarChartSquare color={primaryColour} size={20}/></Button>
            </GridItem>
            <GridItem>
                <Button width={'100%'} borderRadius={0} bg={'white'} _hover={{borderBottomWidth: 3, borderBottomColor: primaryColour, transition: "0.1s"}}  height={"50px"}><HiMiniArrowsRightLeft color={primaryColour} size={20}/></Button>
            </GridItem>
            <GridItem>
                <Button width={'100%'} borderRadius={0} bg={'white'} _hover={{borderBottomWidth: 3, borderBottomColor: primaryColour, transition: "0.1s"}} height={"50px"}><FaPeopleGroup color={primaryColour} size={20}/></Button>
            </GridItem>
            <GridItem>
                <Button width={'100%'} borderRadius={0} bg={'white'} _hover={{borderBottomWidth: 3, borderBottomColor: primaryColour, transition: "0.1s"}} height={"50px"}><HiMiniShoppingBag color={primaryColour} size={20}/></Button>
            </GridItem>
            <GridItem>
                <Button width={'100%'} borderRadius={0} bg={'white'} _hover={{borderBottomWidth: 3, borderBottomColor: primaryColour, transition: "0.1s"}} height={"50px"}><MdOutlineAttachMoney color={primaryColour} size={20}/></Button>
            </GridItem>
            <GridItem>
                <Button width={'100%'} borderRadius={0} bg={'white'} _hover={{borderBottomWidth: 3, borderBottomColor: primaryColour, transition: "0.1s"}} height={"50px"}><HiCog6Tooth color={primaryColour} size={20}/></Button>
            </GridItem>
        </Grid>
        </Card>
    )
}

export default MenuBar