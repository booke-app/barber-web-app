import theme from "../../theme";

const {createStyles} = require("@mui/styles");


export const styles = createStyles(
    {
        arrowApp: {
            width: 0,
            height: 0,
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderBottom: '20px solid #f2f2f7',
            left: 35,
            top: 10,
            zIndex: 5,
            position: "absolute"
        },
        wrapper: {
            position: "absolute",
            display: "flex",
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
            width: '100%',
            maxWidth: '200px'

        },
        servicesContainer: {
            display: "flex",
            maxWidth: '90%',
            overflowX: "auto",
            flexWrap: 'wrap'

        },
        bookButton: {
            height: '100%',
            marginLeft: '5px',
            padding: '5px',
            color: 'white',
            backgroundColor: theme.palette.primary.main,
            fontWeight: "bolder"
        },
        outerDiv: {
            cursor: "pointer",
            marginBottom: '15px',
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
        },
        editCancelWrapper: {
            width: '100%',
            display: "flex",
            justifyContent: "space-evenly"
        },
        serviceTitle: {
            fontWeight: "bolder",
            color: theme.palette.primary.main,
            marginBottom: '5px'
        }
    })



