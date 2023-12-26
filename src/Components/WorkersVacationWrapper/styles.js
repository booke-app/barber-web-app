import theme from "../../theme";

const {createStyles} = require("@mui/styles");

const styles = createStyles({
    wrapper: {
        height: '60%',
        flex: 1,
        margin: '40px 0',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: '10px',


    },
    mainTitle: {
        color: theme.palette.primary.main,
        fontSize: 32,
        fontWeight: "bolder",
        margin: 0,
        textAlign: "center",
    },
    wrapperOfVacationAndIcons: {
        display: "flex",
        marginBottom: '10px',
        alignItems: "center"
    },
    wrapperOfAllVacations: {
        display: "flex",
        flexDirection: "column",
        marginTop: '10px',
        borderRadius: '10px',
        width: '100%',
        alignItems: "center",
        overflowX: "auto",
        padding: '20px',
    }

})


export default styles


