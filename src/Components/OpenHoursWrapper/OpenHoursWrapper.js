import {Button} from "@mui/material";
import {styles} from "./styles";
import {useEffect, useState} from "react";
import DayAndHour from "../DayAndHour/DayAndHour";
import {useDispatch, useSelector} from "react-redux";
import {getShifts, saveWorkingDaysAndHours} from "./actions";
import {setUpdatedShifts} from "../../Features/authorizeUser/authorizeUser-slice";
import {setModalContent} from "../../Features/modal/modal-slice";

const OpenHoursWrapper = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    const dispatch = useDispatch()
    const [allWeekShiftsObject, setAllWeekShiftsObject] = useState({
        'Monday': {
            shifts: []
        }, 'Tuesday': {
            shifts: []
        }, 'Wednesday': {
            shifts: []
        }, 'Thursday': {
            shifts: []
        }, 'Friday': {
            shifts: []
        }, 'Saturday': {
            shifts: []
        }, 'Sunday': {
            shifts: []
        }
    })


    useEffect(() => {
        if (shopId) {
            getShiftsFromShop()

        }
    }, [shopId])


    const getShiftsFromShop = async () => {
        try {
            const res = await getShifts({shopId})
            if (res) {
                setAllWeekShiftsObject(res)


            }
        } catch (e) {
            dispatch(setModalContent({message: 'Could not get shifts for shop ', status: 500}))

        }


    }
    const sendShifts = async () => {
        try {
            const res = await saveWorkingDaysAndHours({shifts: allWeekShiftsObject})
            if (res) {
                dispatch(setUpdatedShifts(res))
                dispatch(setModalContent({message: 'Shifts were saved successfully', status: 200}))

            }
        } catch (e) {
            dispatch(setModalContent({message: 'Shifts were not saved ', status: 500}))

        }

    }

    return (
        <div style={styles.wrapper}>
            <p style={styles.mainTitle}>Select Open Hours</p>
            <div style={styles.dayWithHoursWrapper}> {days.map((day, index) =>
                <DayAndHour key={index} setAllWeeksShiftObject={setAllWeekShiftsObject}
                            allWeekShiftsObject={allWeekShiftsObject}
                            day={day}/>
            )}</div>

            <Button sx={{width: '200px'}} onClick={() => {
                sendShifts()
            }} variant='outlined'>Save</Button>

        </div>
    )
}


export default OpenHoursWrapper
