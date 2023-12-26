import theme from "../../theme";

const {createStyles} = require("@mui/styles");


export const styles = createStyles(
    {

        wrapper: {
            height: '2880px',
            position: "relative",
            width: '100%',
            minWidth: '200px',
            overflowY: "hidden",
            overflowX: "hidden",
            marginBottom: 50,


        },
        multipleView: {

            display: "flex",
            justifyContent: "space-evenly",
            maxWidth: '95%',

        },

        divOfHour: {

            padding: '60px 0 0 0',
            height: '120px',
            border: '1px solid',
            borderColor: 'rgba(203,213,224,0.4)',
            position: "absolute",

            width: '100%',
            minWidth: '100px',
            maxWidth: "100%"
        },

        activeFifteenMinute: {
            position: "absolute",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            textAlign: "center",
            // margin: '0 0 0 70px',

            color: "white",
            fontWeight: 800,
            fontSize: 16,

            background: '#4f46e5',
            width: '100%', maxWidth: '100%', height: '30px',
        },

        currentTimeWrapper: {
            width: '100%',
            alignItems: "center",
            display: "flex",
            position: "absolute",

        }
    })



