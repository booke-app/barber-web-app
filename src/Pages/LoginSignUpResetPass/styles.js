import theme from "../../theme";

const {createStyles} = require("@mui/styles");

const styles = createStyles({
    wrapper: {
        left: 0,
        paddingLeft: 30,
        paddingRight: 30,

        right: 0,
        marginLeft: "auto",
        marginRight: " auto",
        borderRadius: 15,
        minHeight: '500px',
        maxWidth: '300px',
        minWidth: '300px',
        marginTop: "10%",
        display: "flex",
        alignItems: "center",
        alignContent: 'center',
        justifyContent: "space-evenly",
        flexDirection: "column",
        // background: 'rgb(96,216,222) linear-gradient(50deg, rgba(96,216,222,1) 0%, rgba(232,58,248,1) 78%)',

    },

    title: {fontSize: 50, fontWeight: "bold", color: "black", textAlign: 'center'},
    forgotPassword: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "lighter",
        textAlign: "center",
        marginTop: '15px',
        cursor: "pointer",
        color: "black",
    },
    form: {
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    signUp: {
        fontSize: 18,
        fontWeight: "lighter",
        textAlign: "center",
        cursor: "pointer",
        color: "black",
    },
    inputField: {
        marginBottom: "15px"
    }
})


export default styles


