import {TimePicker} from "@mui/x-date-pickers";
import {useEffect, useState} from "react";
import styles from "./styles";
import dayjs from "dayjs";

const VacationTimePicker = ({
                                vacation,
                                setVacationLocalObject,
                                timeThatVacationEnds,
                                timeThatVacationStarts
                            }) => {


    return (<div style={styles.wrapper}>

        <TimePicker
            value={timeThatVacationStarts && dayjs(timeThatVacationStarts)}
            onAccept={(e) => {
                setVacationLocalObject({...vacation, from: dayjs(e).$d})
            }} label={"From"} sx={styles.timePicker}/>
        <TimePicker
            value={timeThatVacationEnds && dayjs(timeThatVacationEnds)}
            minTime={timeThatVacationStarts && dayjs(timeThatVacationEnds)}
            onAccept={(e) => {
                setVacationLocalObject({...vacation, to: dayjs(e).$d})
            }}
            label={"To"} sx={styles.timePicker}/>

    </div>)


}


export default VacationTimePicker
