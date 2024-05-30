import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { primaryColour } from "../../../lib/settings";
function Status(props){
    return (
        props.deposit.user_id ?
        <>
            {
                props.deposit.status === "completed" || props.deposit.status === "mismatch" ?
                <Box>
                    <Flex justifyContent={'center'}>
                        <HiOutlineBadgeCheck color={primaryColour} size={100}/>
                    </Flex>
                    <Text my={3} fontWeight={'bold'} textAlign={"center"}>Deposit Successful!{props.canEdit}</Text>

                </Box>
                : props.deposit.status === "cancelled" ?
                 <Box>
                    <Flex justifyContent={"center"}>
                        <MdOutlineReportGmailerrorred color={primaryColour} size={100}/>
                    </Flex>
                        <Box textAlign={'justify'} color={'gray'} mt={5}>
                            <Text fontSize={'xs'}>We see that your deposit has been cancelled since the transaction has expired already. No deposit has been received within the transaction period given. Please initiate a new deposit.</Text>
                        </Box>
                </Box>
                : props.deposit.status !== 'expired' ?
                <Box>
                    <Flex justifyContent={"center"}>
                        <IoWarningOutline color={primaryColour} size={100}/>
                    </Flex>
                        <Box textAlign={'justify'} color={'gray'} mt={5}>
                            <Text fontSize={'xs'}>We see that your deposit has been cancelled since the transaction has expired already. <b>Any amount sent to the address will be not be recovered after the expiry time</b>, which should be 30 mins from the time of deposit!</Text>
                    </Box>
                </Box>
                : 
                <Box>
                    <Flex justifyContent={"center"}>
                        <IoWarningOutline color={primaryColour} size={100}/>
                    </Flex>
                        <Box textAlign={'justify'} color={'gray'} mt={5}>
                            <Text fontSize={'xs'}>
                                Your deposit is expired, however any amount settled will be reflected to your account. Please contact us if there's a deposit that is not reflected with the <b>Deposit ID - {props.deposit.params.order_number}</b>
                            </Text>
                    </Box>
                </Box>
            }
        </>
        :
        <>
        <Flex justifyContent={"center"}>
            <Spinner color={primaryColour}/>
        </Flex>
        </>
    )
}

export default Status;