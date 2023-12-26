import theme from "../../theme";

const {createStyles} = require("@mui/styles");


export const styles = createStyles(
    {
        wrapper: {
            marginTop: 220,
            height: '3840px',
            position: "relative",
            width: '10%',
            maxWidth: '100%',
            overflowY: "visible",
        },
        leftTextOfTime: {
            paddingLeft: 10,
            fontWeight: 800,
            color: '#101928',
            fontSize: 16,
            margin: '0',
            position: "absolute",
        },
    })



