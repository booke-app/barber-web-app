import {TimePicker} from "@mui/x-date-pickers";
import {styles} from "./styles";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import RightOfPageEditShift from "../RightOfPageEditShift/RightOfPageEditShift";

const Shift = ({day, allWeeksShifts, setAllWeeksShiftObject, index, shift}) => {
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [isShiftPressed, setIsShiftPressed] = useState(false)

    useEffect(() => {
        if (shift?.from) {
            setFrom(shift.from)
        }
        if (shift?.to) {
            setTo(shift.to)
        }

    }, [])

    useEffect(() => {

        if (allWeeksShifts[day]?.shifts[index] && to && from) {
            const newObject = {...allWeeksShifts}
            newObject[day].shifts[index].from = from
            newObject[day].shifts[index].to = to
            setAllWeeksShiftObject(newObject)
        }


    }, [to, from])


    return (<div style={styles.wrapper}>
        <span onClick={() => {
            setIsShiftPressed(true)
        }} style={styles.span}>{from && dayjs(from).format('HH:mm')}-{to && dayjs(to).format('HH:mm')}</span>
        {isShiftPressed && <RightOfPageEditShift onClose={() => {
            setIsShiftPressed(false)
        }}/>}
    </div>)
}


export default Shift
