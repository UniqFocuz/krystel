import { Card, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useSteps, useToast } from "@chakra-ui/react"
import { maxWidthLayoutMd } from "../../lib/settings"
import WelcomeTab from "./ProfileBuilderTabs/WelcomeTab"
import PasswordSetup from "./ProfileBuilderTabs/PasswordSetup"
import EmailVerify from "./ProfileBuilderTabs/EmailVerify"
import BasicDetails from "./ProfileBuilderTabs/BasicDetails"
import MFASetup from "./ProfileBuilderTabs/MFASetup"
import WalletAddress from "./ProfileBuilderTabs/WalletAddress"
import { useEffect, useState } from "react"
import { pingProfileBuilder } from "../../lib/api"
import { useNavigate } from "react-router-dom"
import TelegramSetup from "./ProfileBuilderTabs/TelegramSetup"


function ProfileBuilder() {
    const [isPageLoading, setIsPageLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const toast = useToast()
    const [progress, setProgress] = useState({
        isPasswordSet: false,
        isPatronSet: false,
        isEmailVerified: false,
        data: {
            username: '',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date().toLocaleDateString('en-GB'),
            patron: '',
            nickname: '',
        }
    })
    useEffect(() => {
        const loadPage = async() => {
            await pingProfileBuilder().then((response) => {
                setIsPageLoading(false)
                setProgress(response.data)
            }).catch((error) => {
                navigate('/register')
                toast({
                title: `An error occured!`,
                variant: 'subtle',
                status: 'error',
                })
            }).finally(() => {
                setIsPageLoading(false)
            })
        }
        loadPage()
    }, [])

    const incrementStepper = () => {
        setIsLoading(true)
        setTimeout(() => {
            if(activeStep < tabs.length){
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

    const tabs = [
        { component : <WelcomeTab {...{incrementStepper, isLoading, setIsLoading, progress }} /> },
        { component : <PasswordSetup {...{incrementStepper, decrementStepper, isLoading, setIsLoading, progress, setProgress}} /> },
        { component : <EmailVerify {...{incrementStepper, decrementStepper, isLoading, setIsLoading, progress}} /> },
        { component : <BasicDetails {...{incrementStepper, decrementStepper, isLoading, setIsLoading, progress, setProgress}} /> },
        { component : <MFASetup {...{incrementStepper, decrementStepper, isLoading, setIsLoading, progress}} /> },
        { component : <WalletAddress {...{incrementStepper, decrementStepper, isLoading, setIsLoading, progress}} /> },
        { component : <TelegramSetup {...{incrementStepper, decrementStepper, isLoading, setIsLoading, progress}} /> },
    ]

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: tabs.length,
    })

    return (
        isPageLoading ?(
        <>
        Loading ...
        </>) :(
        <>
            <Flex height={"100vh"}>
                <Card padding={10} width="90%" maxWidth={maxWidthLayoutMd} m="auto">
                <Tabs index={activeStep} isLazy>
                    <TabPanels>
                    {tabs.map((tab, index) => (
                        <TabPanel px={0} key={index}>{tab.component}</TabPanel>
                    ))}
                    </TabPanels>
                </Tabs>
                </Card>
            </Flex>
        </>)
    )
}

export default ProfileBuilder