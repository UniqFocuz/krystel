import { extendTheme } from "@chakra-ui/react"

export const primaryColour = "#f6601d"
export const primaryColourOpaced = "#f6601dAA"
export const secondaryColour = "#F841B0"
export const secondaryColourOpaced = "#FF2288AA"
export const menuLight = "#ffffff33"
export const menuDark = "#000000bb"
export const menuBgColor = "#ffffff33"
export const maxWidthLayoutSm = "450px"
export const maxWidthLayoutMd = "650px"

export const buttonTheme = extendTheme({
    components: {
      Button: {
        baseStyle: {
          borderRadius: "15px",
        },
      },
    },
  });


export const numPadButtons = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: 10,
        width: "100%",
      },
      variants: {
        solid: {
          bg: "white",
          color: primaryColour,
          _hover: {
            bg: primaryColourOpaced,
            color: "white",
          },
          _active: {
            bg: primaryColourOpaced,
            color: "white",
          },
        },
      },
    },
  },
});