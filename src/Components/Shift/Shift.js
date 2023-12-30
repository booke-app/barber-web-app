import {TimePicker} from "@mui/x-date-pickers";
import {styles} from "./styles";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import RightOfPageEditShift
    from "../RightOfPageEditShift/RightOfPageEditShift";
import {Tooltip} from "@mui/material";
import {
    PlusIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import {classNames} from "../../Utilities/utilities";
import CustomTimePicker
    from "../CustomTimePicker/CustomTimePicker";

const Shift = ({
                   day,
                   allWeeksShifts,
                   setAllWeeksShiftObject,
                   index,
                   shift
               }) => {
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


    return (<div
        style={styles.wrapper}>


        {/*<span onClick={() => {*/}
        {/*    setIsShiftPressed(true)*/}
        {/*}}*/}
        {/*      className={'bg-indigo-600'}*/}
        {/*      style={styles.span}>{from && dayjs(from).format('HH:mm')}*/}

        {/*</span>*/}
        <CustomTimePicker
            noLessThanTime={allWeeksShifts[day]?.shifts?.[index - 1]?.to}
            onChange={setFrom}
            givenTime={from}/>
        <div className={'text-indigo-600'}
             style={styles.text}>to
        </div>

        {/*<span onClick={() => {*/}
        {/*    setIsShiftPressed(true)*/}
        {/*}}*/}
        {/*      className={'bg-indigo-600'}*/}
        {/*      style={styles.span}>{to && dayjs(to).format('HH:mm')}</span>*/}
        <CustomTimePicker
            noLessThanTime={allWeeksShifts[day]?.shifts?.[index]?.from}
            onChange={setTo}
            givenTime={to}/>
        <div
            style={styles.iconDiv}>
            <Tooltip title={'Add Shift'}>
                <PlusIcon
                    onClick={() => {
                        const newAllWeekShiftsObject = {...allWeeksShifts}
                        newAllWeekShiftsObject[day].shifts = [...newAllWeekShiftsObject[day].shifts, {
                            from: null,
                            to: null
                        }]
                        setAllWeeksShiftObject(newAllWeekShiftsObject)
                    }}
                    className={classNames(
                        'text-white rounded bg-indigo-600 hover:bg-indigo-500 h-6 w-6 shrink-0 '
                    )}/>
            </Tooltip>

            <Tooltip title={'Delete Shift'}>
                <XMarkIcon onClick={() => {
                    let newArr = {...allWeeksShifts}
                    newArr[day].shifts?.splice(index, 1)
                    setAllWeeksShiftObject(newArr)

                }} className={classNames(
                    'text-white ml-1 rounded bg-indigo-600 hover:bg-indigo-500 h-6 w-6 shrink-0 '
                )}/>
            </Tooltip>


        </div>
    </div>)
}


export default Shift
