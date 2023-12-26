import theme from "../../theme";

const {createStyles} = require("@mui/styles");


const styles = createStyles(
    {
        wrapper: {
            textAlign: "center",
            display: "flex",
            justifyContent: "start",
            flexDirection: 'column',


        },
        slotsWrapper: {
            minWidth: '300px',
            maxWidth: '500px',
            height: '100vh',
            alignContent: "start",
            marginBottom: '50px',
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center"

        },
        mainTitle: {
            marginBottom: 5,
            fontSize: 38, fontWeight: "bold",
            color: theme.palette.primary.main,
            textAlign: 'center'
        },

    }
)

export default styles
