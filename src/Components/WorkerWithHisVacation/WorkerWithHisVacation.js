import styles from "./styles";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import VacationCard from "../VacationCard/VacationCard";

const WorkerWithHisVacation = ({worker, vacationsObject, setVacationsObject}) => {
    const [isSelected, setIsSelected] = useState(false)
    useEffect(() => {
        if (vacationsObject?.[worker._id]) {
            setIsSelected(true)
        }
    }, [])
    useEffect(() => {

        if (vacationsObject?.[worker._id]) {
            setIsSelected(true)
        }
        if (!vacationsObject?.[worker._id]) {
            setIsSelected(false)
        }
    }, [vacationsObject])
    return (<div style={styles.wrapper}>
        <Button sx={styles.button} onClick={() => {
            if (isSelected) {
                let newVacationObj = {...vacationsObject}
                delete newVacationObj?.[worker._id]
                setVacationsObject({...newVacationObj})
            } else {
                const newVacationObj = {...vacationsObject}
                newVacationObj[worker._id] = []
                setVacationsObject({...newVacationObj})
            }

        }} variant={isSelected ? 'contained' : 'outlined'}>{worker.firstName} {worker.lastName}</Button>
        {isSelected && vacationsObject?.[worker._id]?.map((vacation, i) => <VacationCard
            key={worker._id + i}
            setVacationsObject={setVacationsObject}
            allVacationsObject={vacationsObject}
            indexOfVacation={i}
            _id={worker._id}/>)}
    </div>)
}

export default WorkerWithHisVacation
