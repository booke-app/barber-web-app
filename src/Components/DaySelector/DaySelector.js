import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {setSelectedDate} from "../../Features/calendar/calendar-slice";

export default function DaySelector() {
    const selectedDate = useSelector(state => state.calendar.selectedDate)
    const dispatch = useDispatch()
    return (
        <div className="relative mr-4 flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
                onClick={() => {

                    // if (!dayjs(dayjs(selectedDate).subtract(1, 'd')).isBefore(dayjs(Date.now()), 'day')) {
                    dispatch(setSelectedDate(dayjs(selectedDate).subtract(1, 'd')))

                    // }
                }}
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            >
                <span className="sr-only">Previous week</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
            </button>
            <button
                type="button"
                style={{textOverflow: "ellipsis", whiteSpace: "nowrap"}}
                className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
                {dayjs(Date.now()).isSame(selectedDate, 'd') && 'Today'}
                {dayjs(Date.now()).add(1, 'd').isSame(selectedDate, 'd') && 'Tomorrow'}
                {dayjs(Date.now()).subtract(1, 'd').isSame(selectedDate, 'd') && 'Yesterday'}
                {!(dayjs(Date.now()).isSame(selectedDate, 'd')) && !(dayjs(Date.now()).add(1, 'd').isSame(selectedDate, 'd')) && !(dayjs(Date.now()).subtract(1, 'd').isSame(selectedDate, 'd')
                ) && dayjs(selectedDate).format('DD-MM')}
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"/>
            <button
                onClick={() => {
                    dispatch(setSelectedDate(dayjs(selectedDate).add(1, 'd')))

                }}
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
            </button>
        </div>

    )
}
