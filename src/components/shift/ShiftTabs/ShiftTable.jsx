import { Box, Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchShifts } from "../../../lib/api"
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from "react-redux";
import { primaryColour } from "../../../lib/settings";

function ShiftTable(kit){
    const navigate = useNavigate()
    const user = useSelector((state) => state.userReducer);
    const [shifts, setShifts] = useState([])
    const [curr, setCurr] = useState(user.username)
    const [history, setHistory] = useState([])
    const [fetching, setFetching] = useState(false)
    const fetchShift = async(curr) => {
        setCurr(curr)
        await fetchShifts(curr, kit.kit)
        .then((response) => {
            setShifts(response.data)
        })
        setFetching(false)
    }
    useEffect(() => {
        fetchShift(user.username)
        setHistory([...history, user.username])
    }, [])

    const handleFetchShift = (curr) => {
        setHistory([...history, curr])
        fetchShift(curr)
    }

    const handleBackCount = () => {
        setHistory((prevHistory) => {
          const newHistory = prevHistory.slice(0, -1);
          fetchShift(newHistory[newHistory.length - 1]);
          return newHistory;
        });
      }
      
    return(
        <>
        <Flex px={3} mb={3} justifyContent={'space-between'}>
            <Text fontSize={"xl"} fontWeight={'bold'} color={primaryColour}>{curr}</Text>
            {
                history.length !== 1 &&
                <Button my={'auto'} size={'xs'} colorScheme="orange" variant={'ghost'} onClick={() => handleBackCount()}>Back</Button>
            }
        </Flex>
        <TableContainer>
            <Table variant='striped' colorScheme="orange">
                <Thead>
                <Tr>
                    <Th isNumeric fontSize={13} textAlign={'center'}></Th>
                    <Th fontSize={13} textAlign={'center'}>alpha</Th>
                    <Th fontSize={13} textAlign={'center'}>beta</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        shifts.length !== 0 ?
                        [...shifts].reverse().map((shift, index,) => (
                            <Tr key={index}>
                                <Td isNumeric fontSize={13} textAlign={'center'}>{shifts.length - index}</Td>
                                <Td fontSize={13} textAlign={'center'}>{shift.alpha ? <span role="button" onClick={() => handleFetchShift(shift.alpha.username)}>{shift.alpha.username}</span> : '-'}</Td>
                                <Td fontSize={13} textAlign={'center'}>{shift.beta ? <span role="button" onClick={() => handleFetchShift(shift.beta.username)}>{shift.beta.username}</span> : '-'}</Td>
                            </Tr>
                        ))
                        :
                        <Tr>
                            <Td colSpan={3} textAlign={'center'} fontSize={'xs'}>
                                No shifts Available
                            </Td>
                        </Tr>
                    }
                </Tbody>
            </Table>
        </TableContainer>
        </>
    )
}

export default ShiftTable