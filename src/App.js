import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routes/Routers';
import store from './redux/store/store';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import options from './lib/particles';
import "./index.css"
import { Box, Button, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { primaryColour } from './lib/settings';
import { BiSolidMoon, BiSolidSun } from 'react-icons/bi';
function App() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  const { colorMode, toggleColorMode } = useColorMode();
  const whiteColorModeValue = useColorModeValue("white")
  return (
    <Provider store={store}>
      <Box display={"flex"} padding={5} position={'fixed'} width={"100%"} zIndex={999999}>
          <Text fontSize={"2xl"} fontWeight={"bolder"} my="auto" mr="auto" color={primaryColour}>krystel.io</Text>
          <Button gap={1} size={"sm"} my="auto" ml="auto" shadow={"md"} variant={'solid'} colorScheme={whiteColorModeValue} onClick={toggleColorMode}>
              {colorMode === "light" ? <BiSolidMoon color={primaryColour} /> : <BiSolidSun color={primaryColour} />}
          </Button>
      </Box>
      <BrowserRouter>
        <div className="app-container">
          <Routers />
          <Particles id="tsparticles" init={particlesInit} options={options} />
        </div>
      </BrowserRouter>
    </Provider >
  );
}

export default App;
