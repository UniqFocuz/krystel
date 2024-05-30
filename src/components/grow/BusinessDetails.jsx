import { Box, Card, Flex, Text, filter } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { maxWidthLayoutSm, primaryColour, primaryColourOpaced } from "../../lib/settings";
import PageLoader from "../collections/misc/PageLoader";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { businessDetail } from "../../lib/api";

function BusinessDetails(){

    const navigate = useNavigate()
    const user = useSelector((state) => state.userReducer);


    const [business, setBusiness] = useState({})
    const [id] = window.location.href.split('/').slice(-1)

    const fetchBusiness = async(id) => {
        await businessDetail(id)
        .then((response) => {
            setBusiness(response.data)
        })
    }
    useEffect(() =>{
        fetchBusiness(id)
    }, [])


    const excludedKeys = ['id', 'name', 'category', 'description'];
    const filteredKeys = Object.keys(business).filter(key => !excludedKeys.includes(key));
    const formatKey = (key) => {
        return key
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };
    return(
        user.isAuthenticated ?
        <>
            <Box width={maxWidthLayoutSm} mx="auto" pt={"80px"}>
                <Card bg={primaryColourOpaced} color={"white"} padding={5} borderBottomRadius={'none'}>
                    <Flex gap={2} py={2} justifyContent={"space-between"} width={"100%"}>
                        <Flex gap={2} onClick={() => navigate(-1)} role="button">
                            <IoChevronBackOutline fontWeight={'bold'} size={25} /> <Text fontWeight={"bold"} my={"auto"}>Back</Text>
                        </Flex>
                        <Text my={"auto"} fontWeight={'bold'}>{business.name}</Text>
                    </Flex>
                </Card>
                <Card borderTopRadius={0} padding={5} marginBottom={20} height={"550px"} overflowX={"auto"}>
                    <Box mb={2}>
                        <Text color={primaryColour} fontSize={'2xl'} mb={2} fontWeight={'bold'}>Organic Farming</Text>
                        <Text fontSize={'xs'}>{business.description}</Text>
                    </Box>
                    {
                        filteredKeys.map((key, index) => (
                            <Box mb={3} key={index}>
                                <Text color={primaryColour} fontSize={'sm'} fontWeight={'bold'}>{formatKey(key)}</Text>
                                <Text fontSize={'xs'}>{business[key]}</Text>
                            </Box>

                        ))
                    }
                </Card>
            </Box>
        </>
        :<PageLoader/>
    )
}

export default BusinessDetails