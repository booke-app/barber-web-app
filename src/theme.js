import {createTheme} from '@mui/material/styles';
import {red} from "@mui/material/colors";

let theme;
export default theme = createTheme({
    palette: {
        primary: {
            dark: '#3e2abf',
            main: '#210082',
            secondary: '#3e2abf',
            lighter: '#a59bf8',
            gray: '#f2f2f7',
            darkGray: '#c4c4c7',
            superLight: '#c4bdfb',
            textForDarkBackGround: 'white',
            textForLightBackGround: 'black',
        },
    },
});

