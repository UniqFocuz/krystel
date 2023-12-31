import { Box, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { primaryColour, primaryColourOpaced } from '../../lib/settings';

function Countdown({ minutes }) {
  const futureDate = new Date();
  futureDate.setMinutes(futureDate.getMinutes() + minutes);

  const calculateTimeRemaining = () => {
    const now = new Date();
    const timeLeft = Math.max(0, futureDate - now);
    return Math.floor(timeLeft / 1000);
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutesLeft = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  return (
    <Box textAlign={'center'} p={3} my={3} shadow={"md"} color={"white"} bg={primaryColourOpaced} rounded={5}>
      <Text>New Update in</Text>
      <Text fontSize={"3xl"}>
        {String(hours).padStart(2, '0')}h {String(minutesLeft).padStart(2, '0')}m {String(seconds).padStart(2, '0')}s
      </Text>
    </Box>
  );
}

export default Countdown;
