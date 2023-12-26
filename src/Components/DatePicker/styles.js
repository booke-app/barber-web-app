import theme from "../../theme";

const {createStyles} = require("@mui/styles");

const datePickerStyles = createStyles({
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: '1px black solid',
        borderRadius: "30px",
        padding: '0px 20px',
        cursor: "pointer",
    }
})


export default datePickerStyles
