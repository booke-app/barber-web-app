import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {
    setSelectedDate
} from "../../Features/calendar/calendar-slice";

export default function WeekNavigatorSlot({weekDay}) {
    const selectedDate = useSelector(state => state.calendar.selectedDate)
    const dateOfThisSlot = weekDay.type === 'subtract' ? dayjs(selectedDate).subtract(weekDay.number, 'd') : weekDay.type === 'add' && dayjs(selectedDate).add(weekDay.number, 'd')
    const dispatch = useDispatch()
    return (<button type="button"
                    style={{minWidth: '200px'}}
                    onClick={() => {
                        dispatch(setSelectedDate(dateOfThisSlot))
                    }}
                    className="flex flex-col items-center pb-1.5 pt-3">
                                            <span>
                                                {dayjs(dateOfThisSlot).format('ddd')}
                                        </span>

        <span
            className={(dayjs(selectedDate).isSame(dateOfThisSlot, 'd') ? 'text-white bg-indigo-900' : dayjs(Date.now()).isSame(dateOfThisSlot, 'd') ? "text-indigo-900  " : 'text-gray-900') + ' mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold'}>
            {dayjs(dateOfThisSlot).format('DD')}</span>
    </button>)
}
