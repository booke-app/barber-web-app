import theme from "../../theme";

const {createStyles} = require("@mui/styles");


const styles = createStyles(
    {
        wrapper: {
            textAlign: "center",
            display: "flex",
            width: '100%',
            alignContent: "center",
            justifyContent: "space-evenly",
            flexDirection: "column",
            alignItems: "center",

        },
        slotsWrapper: {
            width: '100%',
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            height: '80vh',
            overflowY: 'auto',

        },
        mainTitle: {
            fontSize: 38, fontWeight: "bold",
            color: theme.palette.primary.main,
            textAlign: 'left', flex: 1,
        },
        leftDivWrapper: {
            display: "flex",
            flexDirection: 'column',
            alignItems: "center",
            width: '100%',
        },
        wrapperOfTitle: {
            width: '80%',
            justifyContent: "space-around",
            textAlign: "center",
            position: "relative",
            display: "flex",
            alignItems: "center",
        },
        addButton: {
            backgroundColor: theme.palette.primary.main,
            fontWeight: 800,
            color: "white",
            padding: '15px 10px ',
            display: "flex",
            alignContent: "center",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 18,
        }

    }
)

export default styles
