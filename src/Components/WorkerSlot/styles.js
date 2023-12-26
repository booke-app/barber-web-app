import theme from "../../theme";

const {createStyles} = require("@mui/styles");


const styles = createStyles(
    {
        wrapper: {
            borderRadius: "15px",
            paddingTop: 20,
            flexWrap: "wrap",
            paddingBottom: 20,
            display: "flex",
            width: '80%',
            flexDirection: 'row',
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
        wrapperOfName: {
            fontWeight: 800,
            color: "white",
            background: theme.palette.primary.main,
            borderRadius: '100%',
            width: 40,
            height: 40,

            justifyContent: "center",
            display: "flex",
            alignItems: "center",
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
