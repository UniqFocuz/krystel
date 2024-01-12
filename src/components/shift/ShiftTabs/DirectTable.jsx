import { useEffect, useState } from "react";
import { fetchWorkers } from "../../../lib/api";
import { Avatar, Box, Button, Card, Flex, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { primaryColour } from "../../../lib/settings";

function DirectTable() {
    const [workers, setWorkers] = useState([]);
    const user = useSelector((state) => state.userReducer);
    const [curr, setCurr] = useState(user.username)
    const [history, setHistory] = useState([])

    const fetchWorker = async (curr) => {
        setCurr(curr)
        try {
            const response = await fetchWorkers(curr);
            setWorkers(response.data);
        } catch (error) {
            console.error("Error fetching workers:", error);
        }
    };

    useEffect(() => {
        fetchWorker(user.username);
        setHistory([...history, user.username])
    }, []);



    const handleBackCount = () => {
        setHistory((prevHistory) => {
            const newHistory = prevHistory.slice(0, -1);
            fetchWorker(newHistory[newHistory.length - 1]);
            return newHistory;
        });
    }

    const handleFetchWorker = (curr) => {
        setHistory([...history, curr])
        fetchWorker(curr)
    }
    
    return (
        <>
            <Flex px={3} mb={3} justifyContent={'space-between'}>
                <Text fontSize={"xl"} fontWeight={'bold'} color={primaryColour}>{curr}</Text>
                {
                    history.length !== 1 &&
                    <Button my={'auto'} size={'xs'} colorScheme="orange" variant={'ghost'} onClick={() => handleBackCount()}>Back</Button>
                }
            </Flex>
            {
                workers.length !== 0 ?
                workers.map((item, index) => (
                    <Card key={index} px={8} py={4} width={"100%"} mb={3} role="button" variant={"filled"} fontSize={'sm'} onClick={() => handleFetchWorker(item.username)}>
                        <Flex gap={5}>
                            <Avatar size={'md'} my={'auto'} name={[item.first_name, item.last_name].join(" ") !== " " ? [item.first_name, item.last_name].join(" ") : null} />
                            <Box my={'auto'}>
                                <Text fontWeight={'bold'} >{item.username}</Text>
                                <Text fontSize={'xs'} color={'blackAlpha.600'}>{item.first_name} {item.last_name}</Text>
                            </Box>
                        </Flex>
                    </Card>
                )) :
                <>
                <Text textAlign={'center'} fontSize={'xs'} color={'gray'}>No directs found</Text>
                </>

            }
        </>
    );
}

export default DirectTable;
