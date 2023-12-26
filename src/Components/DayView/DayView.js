import {useRef} from 'react'

import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import HeaderOfViews from "../HeaderOfViews/HeaderOfViews";
import {
    DateCalendar,
    DatePicker
} from "@mui/x-date-pickers";
import {
    setSelectedDate
} from "../../Features/calendar/calendar-slice";
import {
    getAppointmentsOfDate
} from "../../Hooks/getAppointmentsOfDate";
import WeekNavigator from "../WeekNavigator/WeekNavigator";
import LeftPartShowingHours
    from "../LeftPartShowingHours/LeftPartShowingHours";
import Day from "../Day/Day";


export default function DayView() {
    const container = useRef(null)
    const containerNav = useRef(null)
    const containerOffset = useRef(null)
    const selectedDate = useSelector(state => state.calendar.selectedDate)
    const dispatch = useDispatch()
    const appointmentsOfSpecificDate = getAppointmentsOfDate(0)

    return (
        <div className="flex h-full flex-col">
            <header
                className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        <span>{dayjs(selectedDate).format('MMMM YYYY')}</span>
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">Saturday</p>
                </div>
                <HeaderOfViews/>
            </header>
            <div
                className="isolate flex flex-auto overflow-hidden bg-white">
                <div ref={container}
                     className="flex flex-auto flex-col overflow-auto">
                    <WeekNavigator
                        typeOfNavigator={'1Day'}
                        containerNav={containerNav}/>
                    <div className="flex w-full flex-auto">
                        <LeftPartShowingHours/>
                        <Day index={0}/>
                    </div>
                </div>
                <div
                    className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
                    <DateCalendar
                        slotProps={{
                            textField: {
                                size: "small",
                                error: false,
                            },
                        }}

                        format="DD-MM-YYYY"
                        defaultValue={dayjs(Date.now())}
                        value={dayjs(selectedDate)}
                        onChange={
                            (e) => {
                                dispatch(setSelectedDate({...e}))
                            }
                        }
                        sx={{
                            '& .MuiOutlinedInput-root': {

                                '& fieldset': {
                                    padding: 0,
                                    borderColor: 'transparent',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'transparent',
                                }
                            },
                        }}
                    /></div>
            </div>
        </div>
    )
}
