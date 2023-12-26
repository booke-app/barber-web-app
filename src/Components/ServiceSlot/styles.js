import theme from "../../theme";

const {createStyles} = require("@mui/styles");


const styles = createStyles(
    {
        wrapper: {
            borderRadius: "15px",
            display: "flex",
            width: '80%',
            paddingTop: 20,
            paddingBottom: 20,
            flexDirection: 'column',
            textAlign: "center",
            justifyContent: 'space-evenly',
            alignItems: "center",
            margin: '10px 0',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            position: "relative",

        }, title: {
            margin: 0,
            fontWeight: 'bolder',
            color: theme.palette.primary.main,
            fontSize: 18
        },
        innerDiv: {

            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"
        },
        deleteButton: {
            position: "absolute",
            right: 0,
            cursor: "pointer",
            width: '35px',
            backgroundColor: theme.palette.primary.main,
            borderTopRightRadius: '15px',
            borderBottomRightRadius: '15px',
            height: '100%',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }

    }
)

export default styles
