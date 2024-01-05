import DaySelector from "../DaySelector/DaySelector";
import RangeOfDays from "../RangeOfDays/RangeOfDays";
import WorkerSelector
    from "../WorkerSelector/WorkerSelector";
import {Menu, Transition} from "@headlessui/react";
import {
    EllipsisHorizontalIcon
} from "@heroicons/react/20/solid";
import {Fragment} from "react";
import {classNames} from "../../Utilities/utilities";
import {useDispatch} from "react-redux";
import {
    setIsAppointmentSlideOverOpen
} from "../../Features/appointment/appointment-slice";
import {
    setSelectedDate
} from "../../Features/calendar/calendar-slice";
import dayjs from "dayjs";
import {
    CalendarDropDown
} from "../CalendarDropdown/CalendarDropDown";
import {
    setIsMobileCalendarSettingsSideBarOpen
} from "../../Features/ui/ui-slice";


export default function HeaderOfViews() {
    const dispatch = useDispatch()
    return (
        <div className="flex items-center">
            <div
                className="hidden md:ml-4 md:flex md:items-center">
                <RangeOfDays/>
                <WorkerSelector/>
                <DaySelector/>
                <div className="ml-6 h-6 w-px bg-gray-300"/>
                <button
                    onClick={() => {
                        dispatch(setIsAppointmentSlideOverOpen(true))
                    }}
                    type="button"
                    className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add event
                </button>
            </div>
            <div
                className="relative ml-6 md:hidden">
                <span
                    className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                    <EllipsisHorizontalIcon
                        onClick={() => {
                            dispatch(setIsMobileCalendarSettingsSideBarOpen(true))
                        }}
                        className="h-5 w-5"
                        aria-hidden="true"/>
                </span>
            </div>
        </div>
    )
}
