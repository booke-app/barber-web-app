import {Box, Button, Modal} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import styles from './styles'
import {setModalContent, toggleVisibilityOfModal} from "../../Features/modal/modal-slice";

const ModalWrapper = () => {
    const isModalOpen = useSelector((state) => state.modal.isVisible)
    const modalData = useSelector((state) => state.modal.modalContent)
    const dispatch = useDispatch()

    return (
        <Modal open={isModalOpen}>
            <Box sx={{
                width: 300,
                minHeight: "50%",
                backgroundColor: "white",
                position: "absolute",
                top: "50%",
                left: " 50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "30px",
            }}>
                {modalData?.status !== 201 && <div style={styles.mainTitle}>Error</div>
                }{modalData?.status === 201 && <div style={styles.mainTitle}>Success</div>
            }
                <div style={styles.wrapper}>
                    <div style={styles.title}>Message:</div>
                    {modalData?.message}<br/>
                    <div style={{...styles.title, marginTop: "20px"}}>Code:</div>
                    {modalData?.status}

                </div>
                <Button onClick={() => {
                    dispatch(toggleVisibilityOfModal(false))
                    dispatch(setModalContent({}))
                }} fullWidth={true} variant="outlined">
                    Close</Button>

            </Box>
        </Modal>

    )
}


export default ModalWrapper
