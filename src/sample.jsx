import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { maxWidthLayoutSm } from "../../lib/settings";
import PageLoader from "../collections/misc/PageLoader";
import { useNavigate } from "react-router-dom";

function Sample(){

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
                        <Text my={"auto"} fontWeight={'bold'}>Settings</Text>
                    </Flex>
                </Card>
                <Card borderTopRadius={0} padding={5} marginBottom={20} height={"550px"} overflowX={"auto"}>
                    {/* Main Body */}
                </Card>
            </Box>
        </>
        :<PageLoader/>
    )
}

export default Sample