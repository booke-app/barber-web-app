import theme from "../../theme";

const {createStyles} = require("@mui/styles");


export const styles = createStyles(
    {
        wrapper: {
            margin: "5px 5px",
            padding: '10px 5px',
            width: '100px',
            backgroundColor: theme.palette.primary.main,
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
            borderRadius: '10px',
            display: "flex",
            flexDirection: "column",
            cursor: "pointer"

        },
        timePicker: {
            margin: '5px 0',
            minWidth: '200px'
        },
        span: {
            color: "white",
            fontWeight: "bold",
        }
    })
