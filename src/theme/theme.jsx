import { extendTheme } from '@chakra-ui/react';
import "@fontsource/raleway";
import "@fontsource/poppins";

const theme = extendTheme({
  fonts: {
    heading: `'Arial', Arial, sans-serif`,
    body: `'Poppins', Arial, sans-serif`,
  },
  colors: {
    primary: {
      500: '#2196f3',
      600: '#1e88e5',
      700: '#ffffff1f',
      800: '#1e1e1e',
      900: '#1e1e1e',
      modal: '#1b1d1e',
      1000: '#0f1419',
      1100: '#0d1116',
      1200: '#0b0e13',
      1300: '#090b10',
      1400: '#07080d',
    },
  },
})

export default theme
