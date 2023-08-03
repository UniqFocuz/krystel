import { Box, Button, ChakraProvider, Flex, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoBackspaceOutline } from 'react-icons/io5';
import { numPadButtons } from '../../../lib/settings';

const NumPad = ({ inputValue, setInputValue }) => {

  const handleNumberButtonClick = (number) => {
    setInputValue(prevValue => prevValue + number);
  };
  const handleClearButtonClick = () => {
    setInputValue(10);
  };
  const handleBackspaceButtonClick = () => {
    setInputValue((prevValue) => prevValue.slice(0, -1))
  };

  return (
    <ChakraProvider theme={numPadButtons}>
        <VStack gap={3} width={"100%"}>
            <Flex gap={3} width={"100%"}>
                <Button onClick={() => handleNumberButtonClick('1')}>1</Button>
                <Button onClick={() => handleNumberButtonClick('2')}>2</Button>
                <Button onClick={() => handleNumberButtonClick('3')}>3</Button>
            </Flex>
            <Flex gap={3} width={"100%"}>
                <Button onClick={() => handleNumberButtonClick('4')}>4</Button>
                <Button onClick={() => handleNumberButtonClick('5')}>5</Button>
                <Button onClick={() => handleNumberButtonClick('6')}>6</Button>
            </Flex>
            <Flex gap={3} width={"100%"}>
                <Button onClick={() => handleNumberButtonClick('7')}>7</Button>
                <Button onClick={() => handleNumberButtonClick('8')}>8</Button>
                <Button onClick={() => handleNumberButtonClick('9')}>9</Button>
            </Flex>
            <Flex gap={3} width={"100%"}>
                <Button onClick={() => handleClearButtonClick()}>C</Button>
                <Button onClick={() => handleNumberButtonClick('0')}>0</Button>
                <Button onClick={() => handleBackspaceButtonClick()}><IoBackspaceOutline/></Button>
            </Flex>
        </VStack>
    </ChakraProvider>
  );
};

export default NumPad;
