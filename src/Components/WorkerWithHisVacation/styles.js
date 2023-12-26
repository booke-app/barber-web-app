import theme from "../../theme";

const {createStyles} = require("@mui/styles");

const styles = createStyles({
    wrapper: {
        margin: '10px',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        minWidth: '200px',
        marginRight: '10px',
        maxHeight: '36px',
    }
})


export default styles


