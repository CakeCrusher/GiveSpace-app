import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      500: '#C9042C',
      600: '#7e001a',
      700: '#7e001a',
    },
    secondary: {
      50: '#ffffff',
      100: '#f4bfcb',
      200: '#e897a8',
      300: '#dd6f85',
      400: '#D95F78',
      500: '#D95F78',
      600: '#B82D49',
      700: '#B82D49',
    },
    tertiary: {
      500: '#D95F78',
      500: '#D95F78',
      500: '#D95F78',
      500: '#D95F78',
      500: '#D95F78',
      500: '#D95F78',
    },
  },
  sizes: {
    42: 168,
    44: 176,
    50: 202,
    52: 214,
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'full',
      },
      variants: {
        outline: {
          borderWidth: '2',
        },
      },
      defaultProps: {
        colorScheme: 'secondary',
      },
    },
    Input: {
      baseStyle: {
        bg: '#FFFFFF',
        flex: 1,
        maxH: 16,
      },
    },
  },
});

export default theme;
