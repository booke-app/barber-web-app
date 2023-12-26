import styles from "./styles";
import {DatePicker, TimePicker} from "@mui/x-date-pickers";
import RepeatComponent from "../RepeatComponent/RepeatComponent";
import {Checkbox} from "@mui/material";
import CheckBoxWrapper from "../CheckBoxWrapper/CheckBoxWrapper";
import {useEffect, useState} from "react";
import Shift from "../Shift/Shift";
import VacationTimePicker from "../VacationTimePicker/VacationTimePicker";
import dayjs from "dayjs";

const VacationCard = ({indexOfVacation, _id, setVacationsObject, allVacationsObject,}) => {
    const [vacationLocalObject, setVacationLocalObject] = useState({
        date: allVacationsObject[_id][indexOfVacation].date || null,
        from: allVacationsObject[_id][indexOfVacation].from || null,
        to: allVacationsObject[_id][indexOfVacation].to || null,
        repeat: allVacationsObject[_id][indexOfVacation].repeat || null,
        hasSpecificHours: allVacationsObject[_id][indexOfVacation].hasSpecificHours == null ? null : allVacationsObject[_id][indexOfVacation].hasSpecificHours,
    })

    useEffect(() => {

        if (vacationLocalObject) {
            const newObj = {...allVacationsObject}
            newObj[_id][indexOfVacation] = vacationLocalObject
            setVacationsObject(newObj)
        }
    }, [vacationLocalObject])


    return (
        <div style={styles.wrapper}>
            <DatePicker
                maxDate={dayjs(Date.now()).add(6, 'M')}

                closeOnSelect={true}
                value={vacationLocalObject.date && dayjs(vacationLocalObject.date)}
                onAccept={(e) => {
                    setVacationLocalObject({...vacationLocalObject, date: dayjs(e).$d})

                }}
                disablePast
                format="DD-MM-YYYY"/>
            <CheckBoxWrapper setVacationLocalObject={setVacationLocalObject}
                             vacationLocalObject={vacationLocalObject}
                             isCheckedFromParent={vacationLocalObject.hasSpecificHours}
                             text={'Set Specific Hours'}/>
            {vacationLocalObject.hasSpecificHours &&
                <VacationTimePicker vacation={vacationLocalObject} timeThatVacationStarts={vacationLocalObject.from}
                                    setVacationLocalObject={setVacationLocalObject}
                                    timeThatVacationEnds={vacationLocalObject.to}
                />}
            <RepeatComponent repeat={vacationLocalObject.repeat} vacation={vacationLocalObject}
                             setVacationLocalObject={setVacationLocalObject}/>
        </div>)
}


export default VacationCard
