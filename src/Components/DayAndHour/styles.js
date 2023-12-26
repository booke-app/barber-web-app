import theme from "../../theme";

const {createStyles} = require("@mui/styles");


export const styles = createStyles(
    {

        day: {
            padding: '10px 20px',
            display: "flex",
            flexDirection: "column",
            width: '150px',
            alignItems: "center",
            backgroundColor: theme.palette.primary.gray,
            paddingTop: '5px',
            paddingBottom: '5px',
            borderWidth: 1,
            borderColor: "white",
            borderStyle: "solid",


        },
        addIcon: {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            padding: '2px',
            marginRight: '5px',
            borderRadius: '100%'
        },
        iconDiv: {
            display: "flex",
            marginTop: '2px',
            marginLeft: '10px',
            flexDirection: "row",
            justifyContent: "space-evenly",

        }
    })
