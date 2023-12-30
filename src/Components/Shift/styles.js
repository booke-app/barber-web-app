import theme from "../../theme";

const {createStyles} = require("@mui/styles");


export const styles = createStyles(
    {
        wrapper: {
            alignItems: "center",
            margin: "5px 0px",
            padding: '5px 0px',
            width: '100%',
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            cursor: "pointer",

        },
        timePicker: {
            margin: '5px 0',
            minWidth: '200px'
        },
   
        text: {
            margin: '0 5px',
            alignItems: "center",
            display: "flex",
            textAlign: "center",
            fontWeight: "bold"
        },
        iconDiv: {
            display: "flex",
            marginTop: '2px',
            marginLeft: '10px',
            flexDirection: "row",
            justifyContent: "space-evenly",

        }
    })
