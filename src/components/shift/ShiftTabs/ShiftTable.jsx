import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchShifts } from "../../../lib/api"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ShiftTable(){
    const navigate = useNavigate()
    const user = useSelector((state) => state.userReducer);
    const [shifts, setShifts] = useState([])
    const [fetching, setFetching] = useState(false)
    const fetchShift = async(curr) => {
        await fetchShifts(curr)
        .then((response) => {
            setShifts(response.data)
        })
        setFetching(false)
    }
    useEffect(() => {
        fetchShift(user.username)
    }, [])
    return(
        <>
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
                                <Td fontSize={13} textAlign={'center'}>{shift.alpha ? shift.alpha.username : '-'}</Td>
                                <Td fontSize={13} textAlign={'center'}>{shift.beta ? shift.beta.username : '-'}</Td>
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