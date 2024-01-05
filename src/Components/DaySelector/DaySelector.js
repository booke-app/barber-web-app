import {
    ChevronLeftIcon,
    ChevronRightIcon
} from "@heroicons/react/20/solid";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {
    setSelectedDate
} from "../../Features/calendar/calendar-slice";
import {
    CalendarDropDown
} from "../CalendarDropdown/CalendarDropDown";

export default function DaySelector() {
    const selectedDate = useSelector(state => state.calendar.selectedDate)
    const dispatch = useDispatch()
    return (
        <div style={{zIndex: 1, alignItems: "center"}}
             className=" border rounded-md border-gray-300 w-full md:h-full md:w-auto relative md:mr-4 flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
                onClick={() => {

                    dispatch(setSelectedDate(dayjs(selectedDate).subtract(1, 'd')))

                }}
                type="button"
                className=" w-full   flex h-9 w-12 items-center justify-center   pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            >
                <ChevronLeftIcon className="h-5 w-5"
                                 aria-hidden="true"/>
            </button>
            <button
                type="button"
                style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}
                className="w-full h-full md:w-auto  px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
                <CalendarDropDown/>
            </button>
            <span
                className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"/>
            <button
                onClick={() => {
                    dispatch(setSelectedDate(dayjs(selectedDate).add(1, 'd')))

                }}
                type="button"
                className="flex h-9 w-12 items-center justify-center  pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            >
                <ChevronRightIcon className="h-5 w-5"
                                  aria-hidden="true"/>
            </button>
        </div>

    )
}
