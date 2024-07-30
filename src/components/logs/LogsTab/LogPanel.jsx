import { Avatar, Badge, Box, Card, Flex, Text, VStack, WrapItem, useColorModeValue } from "@chakra-ui/react"
import { convertToCountryTime, countValuer, getTimeDifferenceFromNow } from "../../../lib/support"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

function All({logs}){
    const user = useSelector((state) => state.userReducer);
    const grayColorModeValue = useColorModeValue("#2D3748", "white")
    const [currentLogs, setCurrentLogs] = useState()
    useEffect(() => {
        setCurrentLogs(logs)
    }, [])
    return(
        currentLogs &&
        <>
            <VStack gap={4}>
            {   
                currentLogs.length !== 0 ?
                currentLogs.map((log, index)=> (
                    <Card key={index} p={3} py={4} width={"100%"} role="button" variant={"filled"} fontWeight={'bold'} fontSize={'sm'}>
                        <Flex width={"100%"}>
                            <Flex width={"20%"}>
                                { log.coordinate ?
                                    <WrapItem m={"auto"}>
                                        <Avatar name={log.fullName} size={'md'} m={"auto"} src='' bg={"gray.400"} />
                                    </WrapItem>
                                    :log.type === 'Super Ore' ?
                                    <WrapItem m={"auto"}>
                                        <Avatar name='Super Ore' size={'md'} m={"auto"} src='' bg={"gray.400"} />
                                    </WrapItem>
                                    : log.type === 'Power Card' ?
                                    <WrapItem m={"auto"}>
                                        <Avatar name='Power Card' size={'md'} m={"auto"} src='' bg={"red.400"} />
                                    </WrapItem>
                                    : log.type === 'Purchase' ?
                                    <WrapItem m={"auto"}>
                                        <Avatar name='Purchase' size={'md'} m={"auto"} src='' bg={"green.400"} />
                                    </WrapItem>
                                    : log.type === 'Internal Conversion' ?
                                    <WrapItem m={"auto"}>
                                        <Avatar name='Internal Conversion' size={'md'} m={"auto"} src='' bg={"purple.400"} />
                                    </WrapItem>
                                    : log.type === 'Pay In' ?
                                    <WrapItem m={"auto"}>
                                        <Avatar name='Pay In' size={'md'} m={"auto"} src='' bg={"blue.400"} />
                                    </WrapItem>
                                    : log.type === 'Krystel' ?
                                    <WrapItem m={"auto"}>
                                        <Avatar name='Krystel' size={'md'} m={"auto"} src='' bg={"orange.400"} />
                                    </WrapItem>
                                    :<Text>{countValuer(log.amount)}</Text> // Krystel
                                }
                            </Flex>
                            <Flex width={"55%"}>
                                <Box my={"auto"}>
                                    <Text color={grayColorModeValue}>{log.type}
                                    {
                                        log.type === 'Transfer' && (log.user === user.username ? ` to ${log.coordinate}` : ` from ${log.user}`)
                                    }
                                    </Text>
                                    <Text fontSize={'2xs'} color={"gray"}>{getTimeDifferenceFromNow(convertToCountryTime(log.timeStamp, user.timezone))} - <i>#{log.txnId}</i></Text>
                                </Box>
                            </Flex>
                            <Flex width={"20%"} justifyContent={'center'}>
                                {
                                    log.type === 'Krystel' | log.type === 'Pay In' ?
                                    <Badge px={3} borderRadius={15} py={1} display={"flex"} my={"auto"} gap={1} variant={'subtle'} colorScheme={log.user === user.username ? "green" : "red"}>
                                            <Flex gap={1}>{log.user === user.username ? "+ " : "- "}
                                                {
                                                    <Text>{countValuer(log.amount)} </Text>
                                                }
                                            </Flex>
                                        </Badge>
                                    : log.type === 'Internal Conversion' ?
                                        <Badge px={3} borderRadius={15} py={1} display={"flex"} my={"auto"} gap={1} variant={'subtle'} colorScheme={log.direction === 'receive' ? "green" : "red"}>
                                            <Flex gap={1}>{log.direction === 'receive' ? "+ " : "- "}
                                                    <Text>{countValuer(log.amount)}</Text>
                                            </Flex>
                                        </Badge>
                                    :
                                    <Badge px={3} borderRadius={15} py={1} display={"flex"} my={"auto"} gap={1} variant={'subtle'} colorScheme={log.direction === 'receive' ? "green" : "red"}>
                                        <Flex gap={1}>
                                            {
                                                log.type === 'Super Ore' ?
                                                <Text>{log.direction === 'receive' ? "+ " : "- "} {countValuer(log.amount)}</Text>
                                                : log.type === 'Power Card' ?
                                                <Text>{log.direction === 'receive' ? "+ " : "- "} {log.amount}</Text>
                                                : <Text>{log.direction === 'receive' ? "+ " : "- "} {countValuer(log.amount)} </Text>
                                            }
                                        </Flex>
                                    </Badge>
                                }
                            </Flex>
                            {/* <Flex width={"5%"}  justifyContent={'end'}>
                                <Box my={"auto"}><BiChevronRight size={20}/></Box>
                            </Flex> */}
                        </Flex>
                    </Card>
                )) : <Text fontSize={'xs'} color={"gray"}>No Transactions</Text>
            }
            </VStack>
        </>
    )
}

export default All