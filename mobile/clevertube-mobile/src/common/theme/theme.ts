import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      150: '#DEDEDE',
      200: '#A2D4EC',
      250: '#FFFFFF',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
    neutral: {
      50: '#E6E6E6',
      100: '#CCCCCC',
      200: '#B3B3B3',
      300: '#999999',
      400: '#808080',
      500: '#666666',
      600: '#4D4D4D',
      700: '#333333',
      800: '#1A1A1A',
    },
    secondary: {
      100: '#ECF7FB',
      200: '#D4A418',
    },
    warning: '#FFC107',
    success: '#28A745',
    error: '#DC3545',
    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
})
