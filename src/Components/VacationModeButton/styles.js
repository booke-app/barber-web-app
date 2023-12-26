import theme from "../../theme";

const {createStyles} = require("@mui/styles");

const styles = createStyles({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        flex: 1,

        height: '500px',
    },
    mainTitle: {
        color: theme.palette.primary.main,
        fontSize: 32,
        fontWeight: "bolder",
        margin: 0,
        textAlign: "center",
    },
    wrapperOfButton: {
        display: "flex",
        flexDirection: "row",
        width: '100%',
        justifyContent: "center",
        alignItems: "center",

    },
    buttonText: {
        fontWeight: "bolder",
        fontSize: 20,
        color: theme.palette.primary.main,
    }, disabledText: {
        fontWeight: "bolder",
        fontSize: 20,
        color: theme.palette.primary.gray,
    },
    text: {
        textAlign: 'center',
        fontSize: 12,
        color: theme.palette.primary.darkGray,

    }
})


export default styles


