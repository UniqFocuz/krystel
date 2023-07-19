import { Box, Spinner, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, TabPanel, TabPanels, Tabs, Text, useSteps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NewInvoice from "./status/New";
import { GoDotFill } from "react-icons/go";
import Finished from "./status/Finished";
import Pending from "./status/Pending";
import { verifyDeposit } from "../../lib/api";
import Status from "./status/Status";

function DepositInvoice(props){
    const [countdown, setCountdown] = useState('');
    const [targetTimestamp, setTargetTimeStamp] = useState(new Date().getTime());
    const [deposit, setDeposit] = useState({})
    const [isRefreshLoading, setIsRefreshLoading] = useState(false)
    const [settledAmount, setSettledAmount] = useState(0)
    const verifyDepositStatus = async() => {
        setIsRefreshLoading(true)
        await verifyDeposit(props.currentDeposit.txnId)
        .then((response) => {
            let pending = (parseFloat(response.data.data.sum) - parseFloat(response.data.data.pending_sum)).toFixed(6)
            setDeposit({...response.data.data, 
                pending: pending,
            })
            setSettledAmount(parseFloat(response.data.data.pending_sum).toFixed(6))
            switch(deposit === {} ? deposit : response.data.data.status) {
                case "new":
                setActiveStep(0)
                break
                case "pending":
                (parseFloat(response.data.data.sum) - parseFloat(response.data.data.pending_sum)) !== 0 ? setActiveStep(1) : setActiveStep(2)
                break
                case "pending internal":
                (parseFloat(response.data.data.sum) - parseFloat(response.data.data.pending_sum)) !== 0 ? setActiveStep(1) : setActiveStep(2)
                break
            }
            if(response.data.data.status === 'completed' || response.data.data.status === 'mismatch'){

            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setIsRefreshLoading(false)
        })
    }
    const steps = [
        { title: 'Intializing Deposit', component: <NewInvoice {...{deposit, countdown, verifyDepositStatus, isRefreshLoading, settledAmount}}/> },
        { title: 'Awaiting Deposit', component: <Pending {...{deposit, countdown, verifyDepositStatus, isRefreshLoading, settledAmount}}/> },
        { title: 'Finished', component: <Finished {...{deposit, verifyDepositStatus, isRefreshLoading, settledAmount}}/> },
      ]
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })
    useEffect(() => {
        props.currentDeposit && setTargetTimeStamp(new Date(props.currentDeposit.createdAt).getTime() + 30 * 60 * 1000)
        props.currentDeposit && setDeposit(props.currentDeposit)
    }, [])

    useEffect(() => {
        verifyDepositStatus()
        if(deposit.status === "new" || deposit.status === "pending" || deposit.status === "pending internal"){
        const intervalId = setInterval(verifyDepositStatus, 5000);
        return () => {
            clearInterval(intervalId);
        };}
    }, [])

    useEffect(() => {
        const updateCountdown = () => {
            const timeDifference = targetTimestamp - Date.now();
            if (timeDifference <= 0) {
                setCountdown('~');
                return;
            }
            const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
            const seconds = Math.floor((timeDifference / 1000) % 60);
            setCountdown(`<b>${minutes.toString().padStart(2, '0')}</b>m <b>${seconds.toString().padStart(2, '0')}</b>s`);
        };
        const intervalId = setInterval(updateCountdown, 1000);
        return () => {
        clearInterval(intervalId);
        };
    }, [targetTimestamp]);

    return (
        deposit.status?
        <>
        {
            deposit.status === "new" || deposit.status === "pending" || deposit.status === "prnding internal" ?
                <Stepper size={'sm'} colorScheme={'red'} index={activeStep} orientation='vertical'  gap='0'>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                            complete={<StepIcon />}
                            incomplete={<GoDotFill />}
                            active={<Spinner size={'xs'}  />}
                            />
                        </StepIndicator>
                        <Box flexShrink='0'>
                            <StepTitle fontWeight={"bold"} >{step.title}</StepTitle>
                            { activeStep === index ? <StepDescription p={5}>{step.component}</StepDescription> : <Box p={5}></Box> }
                        </Box>
                        <StepSeparator />
                    </Step>
                ))}
                </Stepper>
            :
            <Status {...{deposit}} canEdit={props.canEdit} payoutAddress={props.payoutAddress}/>


        }
        <Box p={3} color={'gray'} textAlign={'end'}>{deposit.params && <Text as="i" fontSize={'xs'}>For {deposit.params.order_name} </Text>}</Box>
        </> :
        <>
            Loading...
        </>
    )
}
export default DepositInvoice;