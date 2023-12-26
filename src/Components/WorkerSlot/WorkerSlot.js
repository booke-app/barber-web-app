import styles from "./styles";
import {useState} from "react";
import {Icon} from "@mui/material";
import {CheckOutlined, DeleteOutlined} from "@mui/icons-material";
import {motion} from "framer-motion"
import {deleteWorker} from "./actions";
import {useDispatch} from "react-redux";
import {setUpdatedWorkers} from "../../Features/authorizeUser/authorizeUser-slice";
import {setModalContent} from "../../Features/modal/modal-slice";

const WorkerSlot = ({workerData}) => {
    const dispatch = useDispatch()

    const [isSelected, setIsSelected] = useState(false)
    const [isDeletePressed, setIsDeletePressed] = useState(false)
    return (<div style={styles.wrapper}
                 onMouseLeave={() => {
                     setIsSelected(false)
                     setIsDeletePressed(false)
                 }}
                 onMouseEnter={() => {
                     setIsSelected(true)
                 }}>
        <div style={styles.wrapperOfName}>{workerData?.firstName[0]}{workerData?.lastName[0]}</div>
        <div style={styles.innerDiv}><p style={styles.title}>First Name:</p>
            {`${workerData?.firstName}`}</div>
        <div style={styles.innerDiv}><p style={styles.title}>Last Name:</p>
            {`${workerData?.lastName}`}</div>
        <div style={styles.innerDiv}><p style={styles.title}>Email:</p>
            {`${workerData?.email}`}</div>
        <motion.div onClick={() => {
            if (!isDeletePressed) {
                setIsDeletePressed(true)
            } else {
                removeWorker()
            }
        }} transition={{duration: 0.3}}
                    animate={{opacity: isSelected ? 1 : 0}} style={styles.deleteButton}>{isDeletePressed ?
            <Icon><CheckOutlined
                style={{color: 'white'}}/></Icon> : <Icon><DeleteOutlined
                style={{color: 'white'}}/></Icon>}
        </motion.div>
    </div>)
}


export default WorkerSlot
