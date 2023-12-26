import theme from "../../theme";

const {createStyles} = require("@mui/styles");


const styles = createStyles(
    {
        settingsPageWrapper: {
            width: '100%',
            padding: 20,
            textAlign: "center",
            overflowY: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",


        },
        titleOfSettingsPage: {

            marginBottom: 5,
            fontSize: 38, fontWeight: "bold",
            color: theme.palette.primary.main,
            textAlign: 'center',
        },
    }
)

export default styles
