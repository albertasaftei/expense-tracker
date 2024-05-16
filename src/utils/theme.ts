import { createTheme } from "@mui/material";
import colors from "./colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: colors.red,
        },
    },
    typography: {
        fontFamily: 'Poppins, Arial',
    },

});