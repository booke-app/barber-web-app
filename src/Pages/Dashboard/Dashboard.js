import {useSelector} from "react-redux";
import WeeklyView
    from "../../Components/WeeklyView/WeeklyView";
import DayView from "../../Components/DayView/DayView";
import TwoDayViewConstructor
    from "../../Components/TwoDayViewConstructor/TwoDayViewConstructor";
import ThreeDayViewConstructor
    from "../../Components/ThreeDayViewConstructor/ThreeDayViewConstructor";
import MultipleWorkersCalendars
    from "../../Components/MultipleWorkersCalendars/MultipleWorkersCalendars";
import {
    BookAppointmentSlideOver
} from "../../Components/BookAppointmentSlideOver/BookAppointmentSlideOver";
import {
    EditAppointmentSlideOver
} from "../../Components/EditAppointmentSlideOver/EditAppointmentSlideOver";
import {
    MobileCalendarSettingsSidebar
} from "../../Components/MobileCalendarSettingsSidebar/MobileCalendarSettingsSidebar";


const Dashboard = () => {
    const typeOfView = useSelector(state => state.typeOfView.typeOfView)
    const numberOfMultipleWorkersShown = useSelector(state => state.typeOfView.numberOfMultipleWorkersShown)


    return (
        <>
            <MobileCalendarSettingsSidebar/>
            <BookAppointmentSlideOver/>
            <EditAppointmentSlideOver/>
            {!numberOfMultipleWorkersShown && <>
                {typeOfView === 'weeklyView' &&
                    <WeeklyView/>}
                {typeOfView === 'dayView' && <DayView/>}
                {typeOfView === 'twoDayView' &&
                    <TwoDayViewConstructor/>}
                {typeOfView === 'threeDayView' &&
                    <ThreeDayViewConstructor/>}
            </>}
            {numberOfMultipleWorkersShown && <>
                <MultipleWorkersCalendars/>
            </>}
        </>

    )
}


export default Dashboard
