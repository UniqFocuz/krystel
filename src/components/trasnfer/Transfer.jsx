import { Box, Card, Flex, Text } from "@chakra-ui/react"
import { maxWidthLayoutSm, primaryColourOpaced } from "../../lib/settings"
import { IoChevronBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

function Transfer(){
    const navigate = useNavigate()
    return(
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
            </Box>
        </>
    )
}

export default Transfer