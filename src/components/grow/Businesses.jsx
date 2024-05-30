import { Box, Button, Card, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { maxWidthLayoutSm, primaryColourOpaced } from "../../lib/settings";
import PageLoader from "../collections/misc/PageLoader";
import { useNavigate } from "react-router-dom";
import { businesses } from "../../lib/api";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom';

function Businessess(){
    const navigate = useNavigate()
    const user = useSelector((state) => state.userReducer);
    const [category, setCategory] = useState({})
    const [id] = window.location.href.split('/').slice(-1)

    const fetchBusinesses = async(id) => {
        await businesses(id)
        .then((response) => {
            setCategory(response.data)
        })
    }
    useEffect(() =>{
        fetchBusinesses(id)
    }, [])

    return(
        user.isAuthenticated && category.id ?
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
                    <Text fontSize={'lg'} fontWeight={'bold'} mb={3}>{category.name}</Text>
                    <SimpleGrid columns={1} spacing={3}>
                        {
                            category.businesses.length !== 0 &&
                            category.businesses.map((item, index) => (
                                <Button key={index} onClick={() => navigate(`/grow/${id}/${item.id}`)} width={"100%"} size='md' height={"50px"}>
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

export default Businessess