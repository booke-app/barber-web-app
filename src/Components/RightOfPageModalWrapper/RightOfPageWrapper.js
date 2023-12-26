import {styles} from "./styles";
import CloseIcon from "@mui/icons-material/Close";

const RightOfPageWrapper = ({children, onClose}) => {
    return (<div style={styles.wrapper}>
        <div style={{width: '100%', display: "flex", justifyContent: "start"}}>
            <CloseIcon onClick={onClose}
                       style={{
                           color: 'white',
                           fontWeight: 800,
                           backgroundColor: 'red',

                           borderRadius: '100%',
                           padding: 5,
                           fontSize: 25,
                           cursor: "pointer",
                       }}/>
        </div>
        {children}
    </div>)


}


export default RightOfPageWrapper
