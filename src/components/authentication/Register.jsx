import { Box, Button, Card, Flex, Input, InputGroup, InputLeftElement, InputRightElement, List, ListIcon, ListItem, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorMode, useColorModeValue, useSteps } from "@chakra-ui/react";
import { BiCheck, BiCheckCircle, BiCheckDouble, BiKey, BiLike, BiLock, BiMailSend, BiSolidMoon, BiSolidSun, BiSupport, BiUserCheck } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { primaryColour, primaryColourOpaced } from "../../lib/settings";
import { GoDotFill } from "react-icons/go";
import { LuHeartHandshake } from "react-icons/lu";
import { useState } from "react";
import WelcomeTab from "./RegistrationTabs/WelcomeTab";
import EmailTab from "./RegistrationTabs/EmailTab";
import DisclaimerTab from "./RegistrationTabs/DisclaimerTab";



function Register(){
    const { colorMode, toggleColorMode } = useColorMode();
    const whiteColorModeValue = useColorModeValue("white")
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(null)

    
    const incrementStepper = () => {
        if(activeStep < steps.length){
            setActiveStep(activeStep+1)
        }
    }

    const decrementStepper = () => {
        if(activeStep > 0){
            setActiveStep(activeStep-1)
        }
    }

    const steps = [
        { component : <WelcomeTab incrementStepper={incrementStepper}/> },
        { component : <EmailTab isValid={isValid} setIsValid={setIsValid} email={email} setEmail={setEmail} incrementStepper={incrementStepper} decrementStepper={decrementStepper}  /> },
        { component : <DisclaimerTab decrementStepper={decrementStepper} email={email} /> },
      ]
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })
    return(
        <>
        <Box display={"flex"} padding={5} position={'fixed'} width={"100%"}>
            <Text fontSize={"2xl"} fontWeight={"bolder"} my="auto" mr="auto" color={primaryColour}>krystel.io</Text>
            <Button gap={1} size={"sm"} my="auto" ml="auto" shadow={"md"} variant={'solid'} colorScheme={whiteColorModeValue} onClick={toggleColorMode}>
                {colorMode === "light" ? <BiSolidMoon color={primaryColour} /> : <BiSolidSun color={primaryColour} />}
            </Button>
        </Box>
        <Flex height={"100vh"}>
            <Card padding={10} width={{ base: "80%", md: "55%", lg: "45%", xl: "30%" }} m="auto">
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