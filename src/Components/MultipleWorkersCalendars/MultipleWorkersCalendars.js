import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import HeaderOfViews from "../HeaderOfViews/HeaderOfViews";
import WeekNavigator from "../WeekNavigator/WeekNavigator";
import LeftPartShowingHours
    from "../LeftPartShowingHours/LeftPartShowingHours";
import Day from "../Day/Day";
import {DateCalendar} from "@mui/x-date-pickers";
import {
    setSelectedDate
} from "../../Features/calendar/calendar-slice";
import {useEffect, useState} from "react";
import WorkerSelectorInsideMultipleWorkersCalendar
    from "../WorkerSelectorInsideMultipleWorkersCalendar/WorkerSelectorInsideMultipleWorkersCalendar";
import WrapperOfMultipleDays
    from "../WrapperOfMultipleDays/WrapperOfMultipleDays";
import {
    setFirstViewWorker,
    setSecondViewWorker,
    setThirdViewWorker
} from "../../Features/typeOfView/typeOfView-slice";

const MultipleWorkersCalendars = () => {
    const workersFromShop = useSelector(state => state.authorizeUser.shop.workers)
    const numberOfMultipleWorkersShown = useSelector(state => state.typeOfView.numberOfMultipleWorkersShown)
    const dispatch = useDispatch()
    const selectedDate = useSelector(state => state.calendar.selectedDate)
    const currentTypeOfView = useSelector(state => state.typeOfView.typeOfView)
    const [arrayToBeMapped, setArrayToBeMapped] = useState(null)
    const arrayConstructor = (arrayLengthToReturn) => {
        let arr = []
        for (let i = 0; i < arrayLengthToReturn; i++) {
            arr.push(i)
        }
        return arr
    }


    useEffect(() => {
        dispatch(setSecondViewWorker(workersFromShop?.[1]))
        dispatch(setThirdViewWorker(workersFromShop?.[2]))
    }, []);

    useEffect(() => {
        if (currentTypeOfView) {
            if (currentTypeOfView === 'dayView') {

                setArrayToBeMapped([{
                    arrayOfDays: arrayConstructor(1),
                    numberOfWorkers: arrayConstructor(numberOfMultipleWorkersShown)
                }])
            }
            if (currentTypeOfView === 'twoDayView') {
                setArrayToBeMapped([{
                    arrayOfDays: arrayConstructor(2),
                    numberOfWorkers: arrayConstructor(numberOfMultipleWorkersShown)
                }])
            }
            if (currentTypeOfView === 'threeDayView') {
                setArrayToBeMapped([{
                    arrayOfDays: arrayConstructor(3),
                    numberOfWorkers: arrayConstructor(numberOfMultipleWorkersShown)
                }])
            }
        }
    }, [numberOfMultipleWorkersShown, currentTypeOfView]);
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
                <div
                    className="flex flex-auto flex-col overflow-auto">
                    <WeekNavigator
                        typeOfNavigator={currentTypeOfView === 'twoDayView'
                            ? '2Day'
                            : currentTypeOfView === 'threeDayView'
                                ? '3Day' : currentTypeOfView === 'dayView' ? '1Day' :
                                    'week'}
                    />
                    <div
                        className="flex w-full flex-auto content-center items-center justify-between">
                        <LeftPartShowingHours/>
                        {arrayToBeMapped?.map((item) =>
                            <WrapperOfMultipleDays
                                item={item}/>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}


export default MultipleWorkersCalendars
