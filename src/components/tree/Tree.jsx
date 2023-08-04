import { Badge, Box, Card, Flex, Text } from "@chakra-ui/react"
import { maxWidthLayoutSm, primaryColour, primaryColourOpaced } from "../../lib/settings"
import { IoChevronBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import BinaryTree from "./BinaryTree"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchTree } from "../../lib/api"

function Tree(){
    const navigate = useNavigate()
    const user = useSelector((state) => state.userReducer);
    const [currentUser, setCurrentUser] = useState(null);
    const [data, setData] = useState()
    // const [history, setHistory] = useState([])
    
    useEffect(() => {
        if (user.isAuthenticated) {
          setCurrentUser(user.username);
          pingTree(user.username);
        }
      }, [user.isAuthenticated, user.username]);
    
      const pingTree = async (username) => {
        try {
          const response = await fetchTree(username);
          setData(response.data);
        } catch (error) {
        }
      };
    
      const navigateNode = (username) => {
        setCurrentUser(username);
        pingTree(username)
      }
    return(
        user.isAuthenticated &&
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
                            {data.username}
                        </Card>
                    }
                    <Card p={7} mb={3}>
                        <Flex>
                            <Text color={primaryColour} mb={2} fontWeight={'bold'}>Alpha Laboratory</Text> <Badge>Volume</Badge>
                        </Flex>
                        <Text mb={3} color={'gray'} textAlign={'justify'} fontSize={'xs'}>Alpha Team is a specialized and cohesive group of individuals within an organization, often assembled to tackle challenging tasks, projects, or critical missions. </Text>
                        {
                             data &&
                             <BinaryTree  data={data.alpha} navigateNode={navigateNode} />
                        }
                    </Card>
                    <Card p={7} mb={3}>
                        <Text color={primaryColour} mb={2} fontWeight={'bold'}>Beta Laboratory</Text>
                        <Text mb={3} color={'gray'} textAlign={'justify'} fontSize={'xs'}>Beta Team is a specialized group within an organization that works collaboratively to test and evaluate new products, services, or processes before they are released to the wider audience or market. </Text>
                        {
                             data &&
                             <BinaryTree data={data.beta} navigateNode={navigateNode}  />
                        }
                    </Card>
                </Card>
            </Box>
        </>
    )
}

export default Tree