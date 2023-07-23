import { Avatar, Box, Button, ChakraProvider, Drawer, DrawerContent, DrawerOverlay, Flex, HStack, Text, VStack, WrapItem, extendTheme, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { BiSolidLockAlt, BiSolidMoon, BiSolidSun, BiX } from "react-icons/bi";
import { BsFillGrid1X2Fill, BsPlus } from "react-icons/bs";
import { maxWidthLayoutSm, primaryColour, buttonTheme } from "../../lib/settings";
import { useEffect, useRef, useState } from "react";
import "../../index.css"
import { TbMailExclamation } from "react-icons/tb";
import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { HiMiniCog } from "react-icons/hi2";
import { GoArrowSwitch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const whiteColorModeValue = useColorModeValue("white", "white")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const navigate = useNavigate()
    
    const user = useSelector((state) => state.userReducer);
    console.log(user)
    const handleNavigate = (route) => {
        onClose()
        if(route === '/logout'){
            localStorage.removeItem('accessToken')
            navigate('/login')
        } else{
            navigate(route)
        }
    }
    return (
        <ChakraProvider theme={buttonTheme}>
            <Box display={"flex"} padding={5} position={'fixed'} width={"100%"} zIndex={999}>
                <Text fontSize={"2xl"} fontWeight={"bolder"} my="auto" mr="auto" color={primaryColour}>krystel.io</Text>
                <Button gap={1} borderRadius={10} size={"sm"} my="auto" ml="auto" shadow={"md"} variant={'solid'} colorScheme={whiteColorModeValue} ref={btnRef} onClick={onOpen}>
                    <BsFillGrid1X2Fill color={primaryColour} />
                </Button>
                <Drawer isOpen={isOpen} placement='top' onClose={onClose} finalFocusRef={btnRef}>
                    <DrawerOverlay className="backdrop" zIndex={"modal"}/>
                    <DrawerContent height={"100vh"} width={maxWidthLayoutSm} marginX={"auto"} shadow={"none"} bgColor={"inherit"} pt={10}>
                        <VStack gap={5} marginX={"auto"}>
                            <Flex width={"100%"} justifyContent={"end"} textAlign={"end"} gap={2}>
                                <BiSolidLockAlt color="white" />
                                <TbMailExclamation color="white" />
                            </Flex>
                            <Flex gap={5}>
                                <Button display={"flex"} height={"180px"} width={"180px"} colorScheme="whiteAlpha">
                                    <VStack gap={5}>
                                        <WrapItem>
                                            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={"xl"} />
                                        </WrapItem>
                                        <Text fontWeight={'bold'} color={whiteColorModeValue} fontSize={'sm'}>KY12345678</Text>
                                    </VStack>
                                </Button>
                                <VStack gap={5}>
                                    <Flex width={"180px"} gap={5}>
                                        <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={() => {handleNavigate('/dashboard')}}><RiDashboardFill color={whiteColorModeValue} size={30}/></Button>
                                        <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={onClose}><BiX color={whiteColorModeValue} size={35} /></Button>
                                    </Flex>
                                    <Flex width={"180px"} gap={5}>
                                        <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={() => {handleNavigate('/register')}}><BsPlus color={whiteColorModeValue} size={40}/></Button>
                                        <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={() => {handleNavigate('/logout')}}><IoMdLogOut color={whiteColorModeValue} size={30} /></Button>
                                    </Flex>
                                </VStack>
                            </Flex>
                            <Flex gap={5}>
                                <VStack gap={5}>
                                    <Flex width={"180px"} gap={5}>
                                        <Button height={"80px"} width={"180px"} colorScheme="whiteAlpha">
                                            <VStack color={"white"}>
                                            <Text fontWeight={'bold'}>0.567 Krystel</Text>
                                            <Text fontWeight={'thin'} fontSize={'xs'}>fabricated</Text>
                                            </VStack>
                                        </Button>
                                    </Flex>
                                    <Flex width={"180px"} gap={5}>
                                        <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha"><GoArrowSwitch color={whiteColorModeValue} size={30}/></Button>
                                        <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha"><FaUsers color={whiteColorModeValue} size={30}/></Button>
                                    </Flex>
                                </VStack>
                                <VStack gap={5}>
                                    <Flex width={"180px"} gap={5}>
                                        <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha"></Button>
                                        <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha"></Button>
                                    </Flex>
                                    <Flex width={"180px"} gap={5}>
                                        <Button height={"80px"} width={"180px"} colorScheme="whiteAlpha">

                                        </Button>
                                    </Flex>
                                </VStack>
                            </Flex>
                            <Flex gap={5}>
                                <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" fontSize={'2xl'}>D</Button>
                                <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" fontSize={'2xl'}>W</Button>
                                <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha"><HiMiniCog color={whiteColorModeValue} size={30} /></Button>
                                <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={toggleColorMode}>{colorMode === "light" ? <BiSolidMoon color={whiteColorModeValue} size={30} /> : <BiSolidSun color={whiteColorModeValue} size={30} />}</Button>
                            </Flex>
                        </VStack>
                    </DrawerContent>
                </Drawer>
            </Box>
        </ChakraProvider>
    )
}

export default Navbar