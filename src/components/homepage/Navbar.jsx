import { Button, Flex, Text, IconButton, Box, Collapse } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { primaryColour, primaryColourOpaced } from "../../lib/settings";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { isOpen, onToggle } = useDisclosure();
    const navbarRef = useRef(null); // Create a ref for the Navbar
    const navigate = useNavigate()
    // Function to handle link clicks
    const handleLinkClick = () => {
        if (isOpen) {
            onToggle(); // Close the collapse if it's open
        }
    };

    // Handle clicks outside the Navbar
    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            if (isOpen) {
                onToggle(); // Close the collapse if the click is outside
            }
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <Flex ref={navbarRef} height={"70px"} position={'fixed'} top={0} zIndex={1000} width={"100%"} px={10}>
            <Flex width={"100%"} mx={{ md: 20 }}>
                <Flex>
                    <Text fontSize={"2xl"} fontWeight={"bolder"} my="auto" mr="auto" color={"white"}>
                        krystel.io
                    </Text>
                </Flex>
                <Flex ml={'auto'} mr={0} display={{ base: "none", md: "flex" }} gap={5}>
                    <Text my={'auto'} color={"white"}>
                        <a href="#aboutus" onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'white' }}>About Us</a>
                    </Text>
                    <Text my={'auto'} color={"white"}>
                        <a href="#motto" onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'white' }}>Our Motto</a>
                    </Text>
                    <Text my={'auto'} color={"white"}>
                        <a href="#fabrication" onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'white' }}>Fabrication</a>
                    </Text>
                    <Text my={'auto'} color={"white"}>
                        <a href="#contact" onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'white' }}>Contact</a>
                    </Text>

                    <Button onClick={() => navigate('/login')} my={'auto'} fontWeight="bolder" color="white" bg="transparent" border="2px solid white" borderRadius={20} _hover={{ bg: "white", color: primaryColour }}>
                        login
                    </Button>
                </Flex>
            </Flex>
            <Flex>
                <IconButton
                    my={'auto'}
                    aria-label="Toggle Navigation"
                    icon={isOpen ? <CloseIcon my={'auto'} fontSize={15} /> : <HamburgerIcon my={'auto'} fontSize={25} />}
                    onClick={onToggle}
                    display={{ md: "none" }}
                    color="white"
                    bg="transparent"
                    _hover={{ bg: "white", color: primaryColour }}
                />
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <Box
                    display={{ md: "none" }}
                    position="absolute"
                    top="70px"
                    left="0"
                    right="0"
                    bg={primaryColourOpaced}
                    p={4}
                >
                    <Flex direction="column" gap={3}>
                        <Text my={'auto'} color={"white"}>
                            <a href="#aboutus" onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'white' }}>About Us</a>
                        </Text>
                        <Text my={'auto'} color={"white"}>
                            <a href="#motto" onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'white' }}>Our Motto</a>
                        </Text>
                        <Text my={'auto'} color={"white"}>
                            <a href="#fabrication" onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'white' }}>Fabrication</a>
                        </Text>
                        <Text my={'auto'} color={"white"}>
                            <a href="#contact" onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'white' }}>Contact</a>
                        </Text>
                        <Button onClick={() => navigate('/login')} fontWeight="bolder" color="white" bg="transparent" border="2px solid white" borderRadius={20} _hover={{ bg: "white", color: primaryColour }}>
                            login
                        </Button>
                    </Flex>
                </Box>
            </Collapse>
        </Flex>
    );
};

export default Navbar;
