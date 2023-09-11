import { Avatar, Box, Button, ChakraProvider, Drawer, DrawerContent, DrawerOverlay, Flex, Text, VStack, WrapItem, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { BiSolidLockAlt, BiSolidLockOpen, BiSolidMoon, BiSolidSun, BiSolidUserX, BiX } from "react-icons/bi";
import { BsFillGrid1X2Fill, BsFillJournalBookmarkFill, BsPlus } from "react-icons/bs";
import { maxWidthLayoutSm, primaryColour, buttonTheme } from "../../lib/settings";
import { useRef } from "react";
import "../../index.css"
import { TbMailExclamation } from "react-icons/tb";
import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { HiBeaker, HiMiniCog } from "react-icons/hi2";
import { GoArrowSwitch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { krystelValuer, countValuer } from "../../lib/support";

function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const whiteColorModeValue = useColorModeValue("white", "white")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const navigate = useNavigate()
    
    const user = useSelector((state) => state.userReducer);
    const handleNavigate = (route) => {
        onClose()
        navigate(route)
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
                            {
                            user.isAuthenticated ? 
                            <VStack>
                            <Flex width={"100%"} justifyContent={"end"} textAlign={"end"} gap={2} color={whiteColorModeValue}>
                                <Flex gap={1}>{ user.isMFAEnabled ? <BiSolidLockAlt /> : <BiSolidLockOpen /> } <Text fontWeight={'bolder'} fontSize={'xs'}>MFA</Text></Flex>
                                { !user.isVerified && <TbMailExclamation/> }
                                { user.isProfileComplete && <BiSolidUserX size={18}/> }
                            </Flex>
                            <VStack gap={5}>
                                <Flex gap={5}>
                                    <Button display={"flex"} height={"180px"} width={"180px"} colorScheme="whiteAlpha">
                                        <VStack gap={5}>
                                            <WrapItem>
                                                <Avatar name={user.full_name} size={"xl"} />
                                            </WrapItem>
                                            <Text fontWeight={'bold'} color={whiteColorModeValue} fontSize={'sm'}>{user.username}</Text>
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
                                                <Text fontWeight={'bold'}>{krystelValuer(user.kollectibles.totalKrystels)}</Text>
                                                <Text fontWeight={'thin'} fontSize={'xs'}>fabricated</Text>
                                                </VStack>
                                            </Button>
                                        </Flex>
                                        <Flex width={"180px"} gap={5}>
                                            <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={() => handleNavigate('/transfer')}><GoArrowSwitch color={whiteColorModeValue} size={30}/></Button>
                                            <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" /*onClick={() => handleNavigate('/buddies')}*/><FaUsers color={whiteColorModeValue} size={30}/></Button>
                                        </Flex>
                                    </VStack>
                                    <VStack gap={5}>
                                        <Flex width={"180px"} gap={5}>
                                            <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={() => handleNavigate('/logs')}><BsFillJournalBookmarkFill color={whiteColorModeValue} size={25}/></Button>
                                            <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={() => handleNavigate('/facility')}><HiBeaker color={whiteColorModeValue} size={30} /></Button>
                                        </Flex>
                                        <Flex width={"180px"} gap={5}>
                                            <Button height={"80px"} width={"180px"} colorScheme="whiteAlpha" onClick={() => handleNavigate('/laboratory')}>
                                                <VStack color={"white"}>
                                                    <Text fontWeight={'bold'}>{countValuer(user.alphaPopulation)} + {countValuer(user.betaPopulation)} subjects</Text>
                                                    <Text fontSize={'xs'}>{countValuer(user.alphaVolume)} alpha | {countValuer(user.betaVolume)} beta</Text>
                                                </VStack>
                                            </Button>
                                        </Flex>
                                    </VStack>
                                </Flex>
                                <Flex gap={5}>
                                    <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" fontSize={'2xl'}><GiPayMoney className="flip" size={30}  /></Button>
                                    <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={() => handleNavigate('/payout')} fontSize={'2xl'}><GiReceiveMoney size={30}/></Button>
                                    <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={() => handleNavigate('/settings')}><HiMiniCog color={whiteColorModeValue} size={30} /></Button>
                                    <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={toggleColorMode}>{colorMode === "light" ? <BiSolidMoon color={whiteColorModeValue} size={30} /> : <BiSolidSun color={whiteColorModeValue} size={30} />}</Button>
                                </Flex>
                            </VStack>
                            </VStack>
                            :
                            <Flex gap={5} mt={5}>
                                <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={toggleColorMode}>{colorMode === "light" ? <BiSolidMoon color={whiteColorModeValue} size={30} /> : <BiSolidSun color={whiteColorModeValue} size={30} />}</Button>
                                <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={() => {handleNavigate('/register')}}><BsPlus color={whiteColorModeValue} size={40}/></Button>
                                <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={() => {handleNavigate('/logout')}}><IoMdLogOut color={whiteColorModeValue} size={30} /></Button>
                                <Button height={"80px"} width={"80px"} colorScheme="whiteAlpha" onClick={onClose}><BiX color={whiteColorModeValue} size={35} /></Button>
                            </Flex>
                            }
                        </VStack>
                    </DrawerContent>
                </Drawer>
            </Box>
        </ChakraProvider>
    )
}

export default Navbar