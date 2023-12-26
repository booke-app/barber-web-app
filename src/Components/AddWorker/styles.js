import theme from "../../theme";

const {createStyles} = require("@mui/styles");

const styles = createStyles({
    formWrapper: {
        display: "flex",
        flexDirection: 'row',
        overflowY: "auto",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        width: '80%',
        maxWidth: '80%',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        borderRadius: "15px",
        padding: '10px 8px'


    }, mainTitle: {
        marginBottom: 5,
        fontSize: 38, fontWeight: "bold",
        color: theme.palette.primary.main,
        textAlign: 'center'
    },
    confirmButton: {

        width: 25,
        height: 25,
        borderRadius: '100%',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.main
    },
    cancelButton: {
        marginTop: '2px',
        width: 25,
        height: 25,
        borderRadius: '100%',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: 'pointer',
        backgroundColor: 'red'
    },
    wrapperOfIcons: {
        display: "flex",
        flexDirection: "column", position: "absolute",
        right: 0,
        marginRight: '15px',
    }
})


export default styles


