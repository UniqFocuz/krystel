import { Box, Card, Flex, Step, StepIcon, StepIndicator, StepSeparator, StepStatus, Stepper, TabPanel, TabPanels, Tabs, Text, useColorMode, useColorModeValue, useSteps } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { layout_lg, maxWidthLayoutSm, primaryColour } from "../../lib/settings";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";
import WelcomeTab from "./RegistrationTabs/WelcomeTab";
import EmailTab from "./RegistrationTabs/EmailTab";
import ConfirmationTab from "./RegistrationTabs/ConfirmationTab";



function Register(){
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(null)

    
    const incrementStepper = () => {
        setIsLoading(true)
        setTimeout(() => {
            if(activeStep < steps.length){
                setActiveStep(activeStep+1)
                setIsLoading(false)
            }}, 1000
            )
        }

    const decrementStepper = () => {
        if(activeStep > 0){
            setActiveStep(activeStep-1)
        }
    }

    const steps = [
        { component : <WelcomeTab {...{isValid, setIsValid, isLoading, setIsLoading, incrementStepper}} /> },
        { component : <EmailTab {...{ isValid, setIsValid, isLoading, setIsLoading, email, setEmail, incrementStepper, decrementStepper }} /> },
        { component : <ConfirmationTab {...{isValid, setIsValid, email, isLoading, setIsLoading, decrementStepper}} /> },
      ]
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })
    return(
        <>
        <Flex height={"100vh"}>
            <Card padding={10} width="90%" maxWidth={maxWidthLayoutSm} m="auto">
            <Box>
                <Text fontSize={"2xl"} textAlign={"center"} fontWeight={"bold"} color={primaryColour}>
                registration
                </Text>
                <Stepper my={10} size={'xs'} index={activeStep} colorScheme="orange">
                {steps.map((step, index) => (
                    <Step key={index} onClick={() => setActiveStep(index)}>
                    <StepIndicator role="button">
                        <StepStatus
                        complete={<StepIcon />}
                        incomplete={<GoDotFill color={primaryColour} />}
                        active={<GoDotFill color={primaryColour} />}
                        />
                    </StepIndicator>

                    <StepSeparator />
                    </Step>
                ))}
                </Stepper>
                <Tabs index={activeStep}>
                    <TabPanels>
                    {steps.map((tab, index) => (
                        <TabPanel p={0} key={index}>
                        {tab.component}
                        </TabPanel>
                    ))}
                    </TabPanels>
                </Tabs>
            </Box>
            </Card>
        </Flex>
    </>
    )
}

export default Register;