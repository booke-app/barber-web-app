import theme from "../../theme";

const {createStyles} = require("@mui/styles");


export const styles = createStyles(
    {

        wrapper: {
            flex: 1,
            padding: '10px 20px',
            marginTop: '10px',
            display: "flex",
            minHeight: '500px',
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            borderRadius: 15,
            maxWidth: '90%',
            width: '90%',
        },
        mainTitle: {
            fontSize: 30,
            margin: 0, fontWeight: "bold",
            color: theme.palette.primary.main,
            textAlign: 'center'
        },
        dayWithHoursWrapper: {
            display: "flex",
            flexDirection: "row",
            width: '100%',
            zIndex: 20,
            margin: '10px 0',

            borderRadius: '15px',
            padding: '10px',

            overflowX: "auto",
        },

    })
