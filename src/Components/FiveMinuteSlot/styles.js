import theme from "../../theme";

const {createStyles} = require("@mui/styles");


export const styles = createStyles(
    {

        minutesDiv: {
            height: '40px',
            width: '100%',
            background: "white",
            border: '1px solid',
            borderColor: theme.palette.primary.gray,
            color: "transparent",
            paddingLeft: 3,
            alignItems: "center",
            fontSize: 15,
            display: "flex",


        },

        timeLeft: {marginLeft: 5, marginRight: 5, minWidth: 40, fontSize: 15},

        minutesDivActive: {
            width: '100%',
            height: '100%',
            paddingLeft: 3,
            background: theme.palette.primary.main,
            fontSize: 15,
            color: "white",
            border: '0 1px solid',
            alignItems: "center",
            display: "flex",

            borderColor: 'transparent'
        },
        wrapper: {
            height: 40,
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: '100%'
        },
        appointment: {
            background: "red",
            color: "red",
            width: '100%',
            height: '100%',
            alignItems: "center",
            display: "flex",

            padding: 3,
            fontSize: 10,
        }
        , appointmentFirst: {
            padding: '5px',
            height: '100%',
            display: "flex",
            alignItems: "center",
            background: "red",
            zIndex: 3,
            color: "white",
            width: '100%',
            fontWeight: "bolder",
            fontSize: 15,
        },
        inactive: {
            height: '100%',
            alignItems: "center",
            border: '1px gray solid',
            opacity: 0.5,
            background: 'repeating-linear-gradient(45deg,#D3D3D3,gray 10px)',
            width: '100%',
            color: "transparent"
        }
    })



