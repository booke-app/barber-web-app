import theme from "../../theme";

const {createStyles} = require("@mui/styles");


export const styles = createStyles(
    {
        wrapper: {
            minHeight: '100%',
            width: '30%',
            position: "fixed",
            right: 0,
            top: 0,
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            padding: 20,
            zIndex: 4,
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',

        },
    })



