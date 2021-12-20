import { extendTheme } from "native-base";
import {
  useFonts,
  Source_Sans_Pro_ExtraLight200,
  Source_Sans_Pro_ExtraLight200_Italic,
  Source_Sans_Pro_Light300,
  Source_Sans_Pro_Light300_Italic,
  Source_Sans_Pro_Regular400,
  Source_Sans_Pro_Regular400_Italic,
  Source_Sans_Pro_SemiBold600,
  Source_Sans_Pro_SemiBold600_Italic,
  Source_Sans_Pro_Bold700,
  Source_Sans_Pro_Bold700_Italic,
  Source_Sans_Pro_Black900,
  Source_Sans_Pro_Black900_Italic,
} from "@expo-google-fonts/source-sans-pro";

let [fontsLoaded] = useFonts({
  Source_Sans_Pro_ExtraLight200,
  Source_Sans_Pro_ExtraLight200_Italic,
  Source_Sans_Pro_Light300,
  Source_Sans_Pro_Light300_Italic,
  Source_Sans_Pro_Regular400,
  Source_Sans_Pro_Regular400_Italic,
  Source_Sans_Pro_SemiBold600,
  Source_Sans_Pro_SemiBold600_Italic,
  Source_Sans_Pro_Bold700,
  Source_Sans_Pro_Bold700_Italic,
  Source_Sans_Pro_Black900,
  Source_Sans_Pro_Black900_Italic,
});

const theme = extendTheme({
  colors: {
    primary: {
      50: "#e75472",
      100: "#e54364",
      200: "#e23054",
      300: "#df1b43",
      400: "#dc0430",
      500: "#c9042c",
      600: "#b40427",
      700: "#a40423",
      800: "#950420",
      900: "#87041d",
    },
    secondary: {
      50: "#f2aabb",
      100: "#e592a2",
      200: "#e28799",
      300: "#df7b8f",
      400: "#dc6e84",
      500: "#d95f78",
      600: "#c5566d",
      700: "#b34e63",
      800: "#a3475a",
      900: "#944152",
    },
  },
  fontConfig: {},
  sizes: {
    22: 88,
    42: 168,
    44: 176,
    50: 202,
    52: 214,
    18: 72,
  },
  fontConfig: {
    SansPro: {
      200: {
        normal: "Source_Sans_Pro_ExtraLight200",
        italic: "Source_Sans_Pro_ExtraLight200_Italic",
      },
      300: {
        normal: "Source_Sans_Pro_ExtraLight300",
        italic: "Source_Sans_Pro_ExtraLight300_Italic",
      },
      400: {
        normal: "Source_Sans_Pro_Regular400",
        italic: "Source_Sans_Pro_Regular400_Italic",
      },
    },
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
    mono: "Roboto",
  },
  components: {
    Button: {
      baseStyle: {
        _stack: { m: -1 },
        rounded: "full",
      },
      variants: {
        outline: {
          borderWidth: "3",
        },
      },
      defaultProps: {
        colorScheme: "secondary",
      },
    },
    Input: {
      baseStyle: {
        bg: "#FFFFFF",
        color: "#3a3a3a",
        flex: 1,
        maxH: 16,
      },
    },
    Text: {
      baseStyle: {
        color: "#3a3a3a",
      },
    },
  },
});

export default theme;
