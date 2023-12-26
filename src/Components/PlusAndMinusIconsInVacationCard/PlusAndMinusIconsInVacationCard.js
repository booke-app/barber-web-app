import {Icon, Tooltip} from "@mui/material";
import {styles} from "./styles";
import {AddOutlined, DeleteOutlined} from "@mui/icons-material";

const PlusAndMinusIconsInVacationCard = ({setVacationsObject, vacationsObject, _id}) => {
    return (
        <div style={styles.wrapper}>
            <Tooltip title={'Add Vacation'}>
                <Icon sx={styles.addIcon} onClick={() => {
                    const newVacationObject = {...vacationsObject}
                    if (newVacationObject?.[_id]) {
                        newVacationObject[_id] = [...newVacationObject?.[_id], {
                            date: '', hasSpecificHours: false,
                            from: '', to: '',
                            repeat: 'no'
                        }]
                    }
                    if (!newVacationObject?.[_id]) {
                        newVacationObject[_id] = [{
                            date: '', hasSpecificHours: false,
                            from: '', to: '',
                            repeat: 'no'
                        }]
                    }
                    setVacationsObject(newVacationObject)
                }}><AddOutlined/>
                </Icon>
            </Tooltip>
            <Tooltip title={'Delete Vacation'}>
                <Icon sx={styles.addIcon} onClick={() => {
                    const newVacationObject = {...vacationsObject}
                    if (newVacationObject?.[_id]) {
                        if (newVacationObject?.[_id]?.length > 1) {
                            newVacationObject?.[_id].splice(-1, 1)
                            return setVacationsObject(newVacationObject)

                        }
                        if (newVacationObject?.[_id]?.length === 1) {
                            newVacationObject[_id] = []
                            return setVacationsObject(newVacationObject)

                        }
                        if (newVacationObject?.[_id]?.length === 0) {
                            delete newVacationObject?.[_id]
                            setVacationsObject(newVacationObject)

                        }
                    }

                }}><DeleteOutlined/>
                < /Icon></Tooltip></div>
    )
}


export default PlusAndMinusIconsInVacationCard
