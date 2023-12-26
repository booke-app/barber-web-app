const {createStyles} = require("@mui/styles");

const useStyles = createStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        boxSizing: 'content-box',
        justifyContent: 'flex-start',
        maxWidth: '100%',
        width: '100%',
        height: '100%',
        maxHeight: '100vh',
        overflowY: "hidden",
        overflowX: "hidden",


    },
    wrapperOfDashboard: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        overflowX: "auto",
        maxWidth: "100%",
        width: "100%",


    },
    nonAuthenticatedWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: "100%",
        borderWidth: 1,
        borderColor: "black",
        borderStyle: 'solid',
        background: 'rgb(96,216,222) linear-gradient(50deg, rgba(96,216,222,1) 0%, rgba(232,58,248,1) 78%)',
    },
    alert: {
        position: "absolute",
        top: 20,
        zIndex: 100,
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',

    }
})
export default useStyles
