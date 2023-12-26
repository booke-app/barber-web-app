import theme from "../../theme";

const {createStyles} = require("@mui/styles");


export const styles = createStyles(
    {

        title: {
            textAlign: "center",
            fontSize: 24
        },
        titleSmaller: {
            textAlign: "center",
            fontSize: 18,
            color: theme.palette.primary.main

        },

        servicesContainer: {
            width: '100%',
            display: "flex",
            maxWidth: '100%',
            overflowX: "auto",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: 'wrap'

        },
    })



