import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import WeeklyView
    from "../../Components/WeeklyView/WeeklyView";
import DayView from "../../Components/DayView/DayView";
import Day from "../../Components/Day/Day";
import SlideOverWithCloseButtonOnOutside
    from "../../Components/SlideOverWithCloseButtonOnOutside/SlideOverWithCloseButtonOnOutside";
import TwoDayViewConstructor
    from "../../Components/TwoDayViewConstructor/TwoDayViewConstructor";
import ThreeDayViewConstructor
    from "../../Components/ThreeDayViewConstructor/ThreeDayViewConstructor";
import MultipleWorkersCalendars
    from "../../Components/MultipleWorkersCalendars/MultipleWorkersCalendars";


const Dashboard = () => {
    const typeOfView = useSelector(state => state.typeOfView.typeOfView)
    const numberOfMultipleWorkersShown = useSelector(state => state.typeOfView.numberOfMultipleWorkersShown)


    return (
        <>
            <SlideOverWithCloseButtonOnOutside/>
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
