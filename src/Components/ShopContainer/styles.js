import theme from "../../theme";

const {createStyles} = require("@mui/styles");


const styles = createStyles(
    {
        mainTitle: {
            marginBottom: 15,
            fontSize: 38, fontWeight: "bold",
            color: theme.palette.primary.main,
            textAlign: 'center',

        }, title: {
            margin: 0,
            fontWeight: 'bolder',
            color: theme.palette.primary.main,
            fontSize: 18
        },
        innerDiv: {
            display: "flex",
            flexDirection: 'column',
            padding: 20,
            minWidth: '200px',
            maxWidth: '300px',
            borderRadius: 15,
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
        },
        inlineTitleContent: {
            width: '100%',
            display: "flex",
            justifyContent: 'space-between',
            alignItems: "center",
            marginTop: '5px'
        },
        wrapper: {
            flex: 1,
            width: '80%',
            minWidth: '80%',
            marginTop: '50px',
            display: "flex",
            alignItems: "center",
            flexDirection: 'column'
        }
    }
)

export default styles
