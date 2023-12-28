import styles from "./styles";
import {useState} from "react";
import {Icon} from "@mui/material";
import {DeleteOutlined} from "@mui/icons-material";
import {motion} from "framer-motion";
import {deleteService} from "./actions";
import {useDispatch, useSelector} from "react-redux";
import {
    setUpdateCategoriesWithItsServices
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";

const ServiceSlot = ({data}) => {
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    const [isSelected, setIsSelected] = useState(false)
    const dispatch = useDispatch()
    const removeService = async () => {
        try {
            const res = await deleteService({
                shopId,
                serviceId: data._id
            })
            if (res) {
                dispatch(setUpdateCategoriesWithItsServices(res))
                dispatch(setModalContent({
                    message: 'Service was deleted successfully',
                    status: 200
                }))

            }
        } catch (e) {
            dispatch(setModalContent({
                message: 'Service was not deleted successfully',
                status: 500
            }))

        }

    }
    return (<div onMouseLeave={() => {
        setIsSelected(false)
    }}
                 onMouseEnter={() => {
                     setIsSelected(true)
                 }} style={styles.wrapper}>
        <div style={styles.innerDiv}><p
            style={styles.title}>Type:</p> {data.name}</div>
        <div style={styles.innerDiv}><p
            style={styles.title}>Duration:</p> {data.duration} minutes
        </div>
        <motion.div onClick={() => {

            removeService()

        }} transition={{duration: 0.3}}
                    animate={{opacity: isSelected ? 1 : 0}}
                    style={styles.deleteButton}>
            <Icon><DeleteOutlined
                style={{color: 'white'}}/></Icon>
        </motion.div>
    </div>)
}


export default ServiceSlot
