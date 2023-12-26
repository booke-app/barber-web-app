import theme from "../../theme";

const {createStyles} = require("@mui/styles");

const styles = createStyles({
    formWrapper: {
        display: "flex",
        flexDirection: 'column',
        maxHeight: '80vh',
        overflowY: 'auto'
    }, mainTitle: {
        marginBottom: 5,
        fontSize: 38, fontWeight: "bold",
        color: theme.palette.primary.main,
        textAlign: 'center'
    },
})


export default styles


