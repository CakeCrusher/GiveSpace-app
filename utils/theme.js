import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      200: '#66071A',
      300: '#c9042c',
      400: '#FC839c',
      500: '#D95F78',
    },
    secondary: {
      200: '#1C1C1C',
      300: '#484848',
      400: '#9F9F9F',
      500: '#F2F2F2',
      600: '#FDFDFD',
    },
    buttonPrimary: {
      50: '#ecfeff',
      100: '#FFF',
      200: '#66071A',
      300: '#c9042c',
      400: '#FC839c',
      500: '#D95F78',
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'full',
        color: '#fff',
      },
      variant: {
        outline: {
          borderWidth: '2',
        },
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
  },
});

export default theme;
