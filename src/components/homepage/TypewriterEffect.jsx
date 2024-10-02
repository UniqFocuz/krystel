import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function TypewriterEffect({ texts }) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (textIndex < texts.length) {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => prev + texts[textIndex][currentIndex]);
        currentIndex++;
        if (currentIndex === texts[textIndex].length) {
          clearInterval(intervalId);
          setTimeout(() => {
            setDisplayedText("");
            setTextIndex((prevIndex) => prevIndex + 1);
          }, 1000); // Delay between words
        }
      }, 100); // Adjust typing speed here

      return () => clearInterval(intervalId);
    }
  }, [textIndex, texts]);

  return <Box fontWeight="bolder" color="white">{displayedText}</Box>;
}

export default function App() {
  const textArray = ["Welcome to the website!", "Enjoy your stay!", "Explore our features!"];

  return (
    <Box bg="black" p="5">
      <TypewriterEffect texts={textArray} />
    </Box>
  );
}
