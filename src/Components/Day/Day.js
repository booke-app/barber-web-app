import {useDispatch, useSelector} from "react-redux";
import {styles} from "./styles"
import dayjs from "dayjs";
import {useEffect, useRef, useState} from "react";
import {
    setFirstViewWorker
} from "../../Features/typeOfView/typeOfView-slice";
import {
    getAppointmentsOfDate
} from "../../Hooks/getAppointmentsOfDate";

import {dayConstructor} from "../../Hooks/dayConstructor";
import Appointment from "../Appointment/Appointment";
import RedLineThatShowsTheTime
    from "../RedLineThatShowsTheTime/RedLineThatShowsTheTime";
import HourSlotInCalendar
    from "../HourSlotInCalendar/HourSlotInCalendar";
import {
    setIndexOfDayThatWasPressed,
    setIsAppointmentSlideOverOpen, setSelectedTime
} from "../../Features/appointment/appointment-slice";

const Day = ({
                 index,
                 indexOfWorkerThatTheDayRepresents
             }) => {
    const selectedDate = useSelector(state => state.calendar.selectedDate)
    const indexOfDayThatActiveTimeWasPressed = useSelector(state => state.appointment.indexOfDayThatWasPressed)
    const dayName = dayjs(selectedDate).add(index, "day").format("ddd")
    const dayNumber = dayjs(selectedDate).add(index, "day").format("DD")
    const [arrayToMapBasedOnNumberOfWorkersForCalendarToShow, setArrayToMapBasedOnNumberOfWorkersForCalendarToShow] = useState([0])
    const typeOfView = useSelector(state => state.typeOfView.typeOfView)
    const workersFromShop = useSelector(state => state.authorizeUser.shop.workers)
    const firstViewWorkerId = useSelector(state => state.typeOfView.firstViewWorkerId)
    const dispatch = useDispatch()
    const appointmentsOfSpecificDate = getAppointmentsOfDate(index, indexOfWorkerThatTheDayRepresents)
    // const getVacationsOfSpecificDateBasedOnWorker =  getVacationsOfSpecificDate(index)
    const selectedTimeForAppointment = useSelector(state => state.appointment.selectedTime)
    const [activeTime, setActiveTime] = useState(null)
    const wrapperOfActiveFifteenMinute = useRef(null);
    const dayToRender = dayConstructor(selectedDate, index)
    const isAppointmentSlideOverOpen = useSelector(state => state.appointment.isAppointmentSlideOverOpen)
    const hoverOutside = event => {

        if (wrapperOfActiveFifteenMinute.current && !wrapperOfActiveFifteenMinute.current.contains(event.target)) {
            setActiveTime(null)
        }
    };


    useEffect(() => {
        document.addEventListener("mouseover", hoverOutside, false);
        return () => {
            document.removeEventListener("mouseover", hoverOutside, false);
        };
    }, []);

    useEffect(() => {
        changeHowManyWorkersWillBeShownInOneDay()
    }, [typeOfView])
    useEffect(() => {
        if (arrayToMapBasedOnNumberOfWorkersForCalendarToShow.length === 1 && !firstViewWorkerId) {
            dispatch(setFirstViewWorker(workersFromShop?.[0]))
        }


    }, [])
    const changeHowManyWorkersWillBeShownInOneDay = () => {
        let array = []
        for (let i = 0; i < typeOfView; i++) {
            array.push(i)
        }
        setArrayToMapBasedOnNumberOfWorkersForCalendarToShow(array)
    }


    const getRelativeCoordsToShowWhichTimeSlotIsHovered = (event) => {
        let bounds = event.target.getBoundingClientRect();
        let y = event.clientY - bounds.top;


        if (y < 30) {
            y = 0
        }
        if (y > 30 && y < 60) {
            y = 30
        }
        if (y > 60 && y < 90) {
            y = 60
        }
        if (y > 90) {
            y = 90
        }


        setActiveTime({
            cord: {y: y},
            value: event.target.classList.value
        })
    }


    return (
        <div style={styles.wrapper}>
            {Object.keys(dayToRender)?.map((time, index) =>
                <HourSlotInCalendar
                    key={index}
                    selectedTimeForAppointment={selectedTimeForAppointment}
                    getRelativeCoordsToShowWhichTimeSlotIsHovered={getRelativeCoordsToShowWhichTimeSlotIsHovered}
                    dayObjectThatTheSlotIsPartOf={dayToRender}
                    time={time}/>)}

            {(activeTime || (selectedTimeForAppointment && index === indexOfDayThatActiveTimeWasPressed)) &&
                <div ref={wrapperOfActiveFifteenMinute}
                     onClick={() => {
                         if (!isAppointmentSlideOverOpen) {
                             dispatch(setIsAppointmentSlideOverOpen(true))
                             dispatch(setIndexOfDayThatWasPressed(index))
                             dispatch(setSelectedTime(dayjs
                             (new Date(
                                     dayjs(selectedDate).format('YYYY'),
                                     dayjs(selectedDate).format('MM') - 1,
                                     dayjs(selectedDate).format('DD'),
                                     activeTime?.value,
                                     activeTime?.cord.y < 30 ? 0 :
                                         activeTime?.cord.y === 30 ? '15' :
                                             activeTime?.cord.y === 60 ? '30' :
                                                 activeTime?.cord.y === 90 && '45'
                                 )
                             )))
                         }


                     }}


                     style={
                         !selectedTimeForAppointment ?
                             {
                                 ...styles.activeFifteenMinute,
                                 top: (activeTime?.value * 120) + activeTime.cord.y,
                             } : {
                                 ...styles.activeFifteenMinute,
                                 top: ((dayjs(selectedTimeForAppointment).format('HH') * 120) +
                                     (
                                         dayjs(selectedTimeForAppointment).format('mm') < 15 ? 0 :
                                             (dayjs(selectedTimeForAppointment).format('mm') >= 15
                                                 && dayjs(selectedTimeForAppointment).format('mm') < 30) ? 30
                                                 : (dayjs(selectedTimeForAppointment).format('mm') >= 30
                                                     && dayjs(selectedTimeForAppointment).format('mm') < 45) ? 60 :
                                                     dayjs(selectedTimeForAppointment).format('mm') >= 45 && 90
                                     ))
                             }
                     }>
                    <p
                        className={'text-xs leading-5 text-white-400'}
                        style={{
                            paddingLeft: 10,
                        }}>
                        {activeTime?.value || dayjs(selectedTimeForAppointment)?.format('H')}:
                        {activeTime?.cord.y < 30 || dayjs(selectedTimeForAppointment)?.format('mm') < 15 ? '00'
                            : activeTime?.cord.y === 30 || dayjs(selectedTimeForAppointment)?.format('mm') < 30 ? '15'
                                : activeTime?.cord.y === 60 || dayjs(selectedTimeForAppointment)?.format('mm') < 45 ? '30'
                                    : (activeTime?.cord.y === 90 || dayjs(selectedTimeForAppointment)?.format('mm') >= 45) && '45'}
                    </p>
                </div>}
            {/*{dayjs(selectedDate).isSame(Date.now(), 'd') &&*/}
            <RedLineThatShowsTheTime
                index={index}
                indexOfWorkerThatTheDayRepresents={indexOfWorkerThatTheDayRepresents}/>
            {appointmentsOfSpecificDate?.map(appointment =>
                <Appointment
                    appointment={appointment}/>)}
        </div>

    )
}


export default Day

