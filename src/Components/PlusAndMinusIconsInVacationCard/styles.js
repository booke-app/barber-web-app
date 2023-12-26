import theme from "../../theme";

const {createStyles} = require("@mui/styles");


export const styles = createStyles(
    {

        addIcon: {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            padding: '2px',
            marginTop: '5px',
            borderRadius: '100%'
        },
        iconDiv: {
            display: "flex",
            marginTop: '2px',
            marginLeft: '10px',
            flexDirection: "column",
            justifyContent: "space-evenly",

        },
        wrapper: {
            display: "flex",
            flexDirection: "column",
        }
    })
