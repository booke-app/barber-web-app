import theme from "../../theme";

const {createStyles} = require("@mui/styles");


export const styles = createStyles(
    {

        wrapper: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: '100%',
        },
     
        dayWithHoursWrapper: {
            display: "flex",
            flexDirection: "column",
            width: '100%',
            margin: '10px 0',


        },

    })
