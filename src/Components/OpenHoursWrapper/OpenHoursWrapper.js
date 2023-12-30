import {Button} from "@mui/material";
import {styles} from "./styles";
import {useEffect, useState} from "react";
import DayAndHour from "../DayAndHour/DayAndHour";
import {useDispatch, useSelector} from "react-redux";
import {
    getShifts,
    saveWorkingDaysAndHours
} from "./actions";
import {
    setUpdatedShifts
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";

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
            dispatch(setModalContent({
                message: 'Could not get shifts for shop ',
                status: 500
            }))

        }


    }
    const sendShifts = async () => {
        try {
            const res = await saveWorkingDaysAndHours({shifts: allWeekShiftsObject})
            if (res) {
                dispatch(setUpdatedShifts(res))
                dispatch(setModalContent({
                    message: 'Shifts were saved successfully',
                    status: 200
                }))

            }
        } catch (e) {
            dispatch(setModalContent({
                message: 'Shifts were not saved ',
                status: 500
            }))

        }

    }

    return (
        <div
            className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
            <div
                style={{justifyContent: "space-around"}}
                className={'sm:flex w-full  sm:items-center'}>
                <div
                    className={'sm:flex w-full  sm:items-start flex-col'}>
                    <h2
                        className="text-base sm:flex sm:items-center font-semibold leading-7  text-gray-900">
                        Business hours</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        This information will be
                        displayed publicly so be
                        careful what you share.
                    </p>
                </div>
                <div
                    className={'mt-4 sm:ml-16 sm:mt-0 sm:flex-none'}>
                    <button

                        className={'block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'}
                        onClick={() => {
                            sendShifts()
                        }}>Save
                    </button>
                </div>
            </div>
            <div
                style={styles.dayWithHoursWrapper}
                className={'overflow-auto'}> {days.map((day, index) =>
                <DayAndHour key={index}
                            setAllWeeksShiftObject={setAllWeekShiftsObject}
                            allWeekShiftsObject={allWeekShiftsObject}
                            day={day}/>
            )}</div>


        </div>
    )
}


export default OpenHoursWrapper
