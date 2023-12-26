import theme from "../../theme";

const {createStyles} = require("@mui/styles");

const dashboardStyles = createStyles({
    wrapper: {
        display: "flex",
        flexDirection: 'column',
        width: "100%",
        height: "100vh",
        overflowY: "scroll",

    },
    upperBar: {
        position: "fixed",
        height: '5vh',
        zIndex: 4,
        display: "flex",
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 15,
        minWidth: '800px',
        backgroundColor: theme.palette.primary.gray,
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    },
    wrapperOfDay: {
        // display: "flex",
        // flexDirection: "row",
        width: "100%",
        // justifyContent: "space-evenly"
    },
    wrapperOfCalendar: {
        position: "relative",
        display: "flex",
        width: '100%',
        maxWidth: '100%',
    }

})


export default dashboardStyles


