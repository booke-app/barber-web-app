import theme from "../../theme";

const {createStyles} = require("@mui/styles");


const styles = createStyles({

    activeWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderRadius: '15px',
        minWidth: "200px",
        padding: '0 30px',
        height: "100%",
        cursor: 'pointer',
        border: "1px solid black",

    },
    inactiveWrapper: {
        height: "100%",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderRadius: '15px',
        minWidth: "200px",
        padding: '0 30px',
        cursor: 'pointer',
        border: "1px solid gray",

    },
    dropdownDiv: {
        height: '100%',
        display: "flex",
        width: '100%',
        alignContent: "center",
        top: 40,
        background: "white"

    },
    insideDivWorker: {
        textAlign: "center",
        width: '100%',
        padding: '10px 0',

    },
    wrapper: {
        display: "flex",
        flexDirection: 'column',
        textAlign: "center",
        position: "relative",
    },
    modal: {
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        fill: "white",
        background: theme.palette.primary.main,
        color: 'white',
        fontWeight: 'bolder',
        '& .MuiSvgIcon-root': {
            color: 'white',
        }
    }
})


export default styles
