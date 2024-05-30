import { Box, Button, Card, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { maxWidthLayoutSm, primaryColour, primaryColourOpaced } from "../../lib/settings";
import PageLoader from "../collections/misc/PageLoader";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { categories } from "../../lib/api";
import { useEffect, useState } from "react";

function Grow(){
    const user = useSelector((state) => state.userReducer);
    const navigate = useNavigate()
    const [categoriesList, setCategoriesList] = useState([])

    const fetchCategories = async() => {
        await categories()
        .then((response) => {
            setCategoriesList(response.data)
        })
    }
    useEffect(() =>{
        fetchCategories()
    }, [])
    
    return(
        user.isAuthenticated ?
        <>
            <Box width={maxWidthLayoutSm} mx="auto" pt={"80px"}>
                <Card bg={primaryColourOpaced} color={"white"} padding={5} borderBottomRadius={'none'}>
                    <Flex gap={2} py={2} justifyContent={"space-between"} width={"100%"}>
                        <Flex gap={2} onClick={() => navigate(-1)} role="button">
                            <IoChevronBackOutline fontWeight={'bold'} size={25} /> <Text fontWeight={"bold"} my={"auto"}>Back</Text>
                        </Flex>
                        <Text my={"auto"} fontWeight={'bold'}>Grow</Text>
                    </Flex>
                </Card>
                <Card borderTopRadius={0} padding={5} marginBottom={20} height={"550px"} overflowX={"auto"}>
                    <SimpleGrid columns={3} spacing={3}>
                        {
                            categoriesList.length !== 0 &&
                            categoriesList.map((item, index) => (
                                <Button onClick={() => navigate(`/grow/${item.id}`)} key={index} width={"100%"} size='md' height={"100px"}>
                                    <Text fontWeight={400} fontSize={'sm'}>{item.name}</Text>
                                </Button>
                            ))
                        }
                    </SimpleGrid>
                </Card>
            </Box>
        </>
        :<PageLoader/>
    )
}

export default Grow