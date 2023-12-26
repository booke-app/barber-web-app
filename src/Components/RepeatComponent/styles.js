import theme from "../../theme";

const {createStyles} = require("@mui/styles");

const styles = createStyles({
    wrapper: {
        marginTop: '5px',
        display: "flex",
        flexDirection: "row",
        borderRadius: '10px',
    },
    text: {
        marginRight: '5px',
        color: theme.palette.primary.main,
        fontWeight: "bolder"
    }

})


export default styles


