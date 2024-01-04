import Day from "../Day/Day";
import dayjs from "dayjs";
import HeaderOfViews from "../HeaderOfViews/HeaderOfViews";
import WeekNavigator from "../WeekNavigator/WeekNavigator";
import LeftPartShowingHours
    from "../LeftPartShowingHours/LeftPartShowingHours";
import {DateCalendar} from "@mui/x-date-pickers";
import {
    setSelectedDate
} from "../../Features/calendar/calendar-slice";
import {useDispatch, useSelector} from "react-redux";

const ThreeDayViewConstructor = () => {
    const dispatch = useDispatch()
    const selectedDate = useSelector(state => state.calendar.selectedDate)
    const twoDayArrayToMap = [0, 1, 2]
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
                className="isolate flex  flex-auto overflow-hidden bg-white">
                <div
                    className="flex flex-auto flex-col overflow-auto">

                    <WeekNavigator
                        typeOfNavigator={'3Day'}/>
                    <div className="flex w-full flex-auto">
                        <LeftPartShowingHours/>
                        {twoDayArrayToMap.map((index) =>
                            <Day
                                index={index}/>)}
                    </div>
                </div>

            </div>
        </div>
    )
}


export default ThreeDayViewConstructor
