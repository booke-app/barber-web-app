import theme from "../../theme";

const {createStyles} = require("@mui/styles");


const styles = createStyles(
    {
        wrapper: {
            display: "flex",
            flexDirection: 'column',
            textAlign: "center",
            justifyContent: 'center',
            alignItems: "center",
            padding: 20,

        }, title: {
            fontWeight: 'bolder',
            fontSize: 18
        },
        mainTitle: {
            fontSize: 50, fontWeight: "bold",
            color: theme.palette.primary.main, textAlign: 'center'
        },

    }
)

export default styles
