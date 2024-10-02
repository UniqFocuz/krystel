import { Box, Divider } from "@chakra-ui/react";
import Navbar from "./homepage/Navbar";
import Banner from "./homepage/Banner";
import About from "./homepage/About";
import Motto from "./homepage/Motto";
import Fabrication from "./homepage/Fabrication";
import Contact from "./homepage/Contact";
import Footer from "./homepage/Footer";

function HomePage() {

    return (
        <Box position={'relative'}>
            <Navbar />
            <Banner/>
            <About/>
            <Divider/>
            <Motto/>
            <Fabrication/>
            <Contact/>
            <Footer/>
        </Box>
    )
}

export default HomePage;
