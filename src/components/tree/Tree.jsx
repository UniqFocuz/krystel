import { Avatar, AvatarGroup, Badge, Box, Button, Card, Flex, Input, InputGroup, InputLeftElement, Text, useToast } from "@chakra-ui/react"
import { maxWidthLayoutSm, primaryColour, primaryColourOpaced } from "../../lib/settings"
import { IoChevronBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import BinaryTree from "./BinaryTree"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchTree } from "../../lib/api"
import PageLoader from "../collections/misc/PageLoader"
import ComponentLoader from "../collections/misc/ComponentLoader"
import { AiOutlineSearch } from "react-icons/ai"

function Tree() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.userReducer);
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [history, setHistory] = useState([])
    const [search, setSearch] = useState()
    const [searchLoading, setSearchLoading] = useState(false)
    const toast = useToast()
    useEffect(() => {
        if (user.isAuthenticated) {
            pingTree(user.username);
        }
    }, [user.isAuthenticated, user.username]);

    const pingTree = async (username) => {
        await fetchTree(username)
        .then((response) => {
            setData(response.data);
            setSearchLoading(false)
            history.push(username)
            return true
        })
        .catch((error) => {
            setData(user.username)
            nativeNavigateNode(user.username)
            console.log(error.response.data.status)
            if(error.response.data.status === 400){
                toast({
                    title: `Please enter a valid User ID!`,
                    variant: 'subtle',
                    status: 'warning',
                })
            }
            if(error.response.data.status === 401){
                toast({
                    title: `Search not Allowed!`,
                    variant: 'subtle',
                    status: 'error',
                })
            }
            setTimeout(() => {
                setIsLoading(false)
                setSearchLoading(false)
            }, 1000)
            return false
        })
    };

    const handleTop = () => {
        nativeNavigateNode(user.username)
        setHistory([])
    }

    const handleBack = () => {
        nativeNavigateNode(history.slice(-1))
        setHistory(history.slice(0,-1))

    }

    const handleSearchChange = (e) => {
        const search = e.target.value.toUpperCase()
        setSearch(search)
    }

    const handleSearchSubmit = async() => {
        setSearchLoading(true)
        if((search !== '') && (search !== null) && (search !== undefined)){
            pingTree(search)
        } else{
            toast({
                title: `Please enter a valid User ID!`,
                variant: 'subtle',
                status: 'warning',
            })
            setHistory([])
        }
    }

    const nativeNavigateNode = (username) => {
        setIsLoading(true)
        pingTree(username)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    const navigateNode = (username) => {
        setIsLoading(true)
        history.push(history.length === 0 ? user.username : data.username)
        pingTree(username)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    return (
        data.username ?
            <>
                <Box width={maxWidthLayoutSm} mx="auto" pt={"80px"}>
                    <Card bg={primaryColourOpaced} color={"white"} padding={5} borderBottomRadius={'none'}>
                        <Flex gap={2} py={2} justifyContent={"space-between"} width={"100%"}>
                            <Flex gap={2} onClick={() => navigate(-1)} role="button">
                                <IoChevronBackOutline fontWeight={'bold'} size={25} /> <Text fontWeight={"bold"} my={"auto"}>Back</Text>
                            </Flex>
                            <Text my={"auto"} fontWeight={'bold'}>Laboratory</Text>
                        </Flex>
                    </Card>
                    <Card borderTopRadius={0} padding={5} marginBottom={20} height={"550px"} overflow={'auto'} gap={5}>
                        {
                            data &&
                            <Card p={7} mb={3}>
                                {
                                    !isLoading ?
                                        <>
                                            <Text fontSize={'2xl'} color={primaryColour} mb={1} fontWeight={"bold"}>{data.username} ({data.nickname})</Text>
                                            <InputGroup mb={3}>
                                                <InputLeftElement pointerEvents='none'>
                                                <AiOutlineSearch color={primaryColour} />
                                                </InputLeftElement>
                                                <Input type='text' color={primaryColour} onChange={handleSearchChange} placeholder='User ID' fontSize={"sm"} fontWeight={'medium'} _placeholder={{fontSize: "sm", fontWeight: 'normal'}} variant={'flushed'} focusBorderColor={primaryColour}/>
                                            </InputGroup>
                                            <Flex mb={3} justifyContent={'end'}>
                                                <Button my={"auto"} fontSize={'2xs'} py={1} size={"ms"} role="button" px={3} isLoading={searchLoading} onClick={() => handleSearchSubmit()} color={"white"} bg={primaryColourOpaced} _hover={{bg: primaryColour}} borderRadius={15}>Search</Button>
                                            </Flex>
                                            <Box mb={5}>
                                                <Badge m={1} fontSize={'2xs'} py={1} px={3} borderRadius={15} colorScheme="orange">Patron: {data.patron}</Badge>
                                                <Badge m={1} fontSize={'2xs'} py={1} px={3} borderRadius={15}>Alpha: {data.alphaPopulation}</Badge>
                                                <Badge m={1} fontSize={'2xs'} py={1} px={3} borderRadius={15}>Beta: {data.betaPopulation}</Badge>
                                                <Badge m={1} fontSize={'2xs'} py={1} px={3} borderRadius={15}>Active Alpha: {data.alphaActivePopulation}</Badge>
                                                <Badge m={1} fontSize={'2xs'} py={1} px={3} borderRadius={15}>Active Beta: {data.betaActivePopulation}</Badge>
                                                <Badge m={1} fontSize={'2xs'} py={1} px={3} borderRadius={15}>Alpha Vol: {data.alphaVolume}</Badge>
                                                <Badge m={1} fontSize={'2xs'} py={1} px={3} borderRadius={15}>Beta Vol: {data.betaVolume}</Badge>
                                            </Box>
                                            <Flex gap={2} justifyContent={'space-between'}>
                                                {
                                                    history.length !== 0 && 
                                                    <Flex gap={2} px={1}>
                                                        <Badge m={"auto"} fontSize={'2xs'} py={1} role="button" px={3} onClick={handleTop} borderRadius={15}>Top</Badge>
                                                        <Badge m={"auto"} fontSize={'2xs'} py={1} role="button" px={3} onClick={handleBack} borderRadius={15}>Back</Badge>
                                                    </Flex>
                                                }
                                                <Flex gap={2} ml={"auto"}>
                                                    <AvatarGroup size='xs' max={3}>
                                                        {
                                                            data.researchers.map((item, index) => (
                                                                <Avatar key={index} name={item.name} />
                                                            ))
                                                        }
                                                    </AvatarGroup>
                                                    <Text my={"auto"} fontSize={'sm'}>{data.researchers.length} Researchers</Text>
                                                </Flex>
                                            </Flex>
                                        </>
                                    : <ComponentLoader />
                                }
                            </Card>
                                    
                        }
                        <Card p={7} mb={3}>
                            <Flex>
                                <Text color={primaryColour} mb={2} fontWeight={'bold'}>Alpha Laboratory</Text>
                            </Flex>
                            <Text mb={3} color={'gray'} textAlign={'justify'} fontSize={'xs'}>Alpha Team is a specialized and cohesive group of individuals within an organization, often assembled to tackle challenging tasks, projects, or critical missions. </Text>
                            {
                                !isLoading ?
                                    <BinaryTree data={data.alpha} navigateNode={navigateNode} />
                                    : <ComponentLoader />
                            }
                        </Card>
                        <Card p={7} mb={3}>
                            <Text color={primaryColour} mb={2} fontWeight={'bold'}>Beta Laboratory</Text>
                            <Text mb={3} color={'gray'} textAlign={'justify'} fontSize={'xs'}>Beta Team is a specialized group within an organization that works collaboratively to test and evaluate new products, services, or processes before they are released to the wider audience or market. </Text>
                            {
                                !isLoading ?
                                    <BinaryTree data={data.beta} navigateNode={navigateNode} />
                                    : <ComponentLoader />
                            }
                        </Card>
                    </Card>
                </Box>
            </>
            : <PageLoader />
    )
}

export default Tree