import {styles} from './styles'
import {useEffect, useRef, useState} from "react";
import AddEditDeleteBookingModal from "../AddEditDeleteBookingModal/AddEditDeleteBookingModal";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import {indexOfDays, isDateGivenTheSameOrBetweenTwoDateObjects} from "../../Utilities/utilities";
import findTheSelectedWorkerOfTheViewBasedOnIndex from "../../Hooks/findTheSelectedWorkerOfTheViewBasedOnIndex";
import {
    isSpecificDateObjectDuringOfVacationOfWorkerBasedOnTheIndexOfTheView
} from "../../Hooks/isSpecificDateObjectDuringOfVacationOfWorkerBasedOnTheIndexOfTheView";

const FiveMinuteSlot = ({indexOfMinutes, indexOfHours, indexOfDay, indexOfTypeOfView}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const wrapperRef = useRef(null);
    const [hasAppointment, setHasAppointment] = useState(false)
    const selectedDate = useSelector(state => state.calendar.selectedDate)
    const appointments = useSelector(state => state.authorizeUser.shop.appointments)
    const hour = dayjs().hour(indexOfHours).format('HH')
    const minutes = dayjs().minute(indexOfMinutes * 15).format('mm')
    const dayNumber = dayjs(selectedDate).add(indexOfDay, "day").format("DD")
    const monthNumber = dayjs(selectedDate).add(indexOfDay, "day").format('MM')
    const year = dayjs(selectedDate).add(indexOfDay, "day").format('YYYY')
    const [appointmentForSlot, setAppointmentForSlot] = useState({})
    const time = `${hour}:${minutes}`
    const fiveMinuteSlotDateObject = dayjs(new Date(year, monthNumber - 1, dayNumber, hour, minutes))
    let isTheFirstFiveMinuteSlotOfAppointment = dayjs(appointmentForSlot?.dateAndTime?.when).isSame(dayjs(fiveMinuteSlotDateObject))
    const [isFiveMinuteSlotInsideWorkingHours, setIsFiveMinuteSlotInsideWorkingHours] = useState(false)
    const selectedWorkerBasedOnIndex = findTheSelectedWorkerOfTheViewBasedOnIndex(indexOfTypeOfView)
    const shiftsFromShop = useSelector(state => state?.authorizeUser?.shop?.settings?.shifts)
    const isFiveMinuteSlotDuringVacation = isSpecificDateObjectDuringOfVacationOfWorkerBasedOnTheIndexOfTheView(fiveMinuteSlotDateObject, indexOfTypeOfView)
    useEffect(() => {
        appointments?.map(appointment => {

            if (
                isDateGivenTheSameOrBetweenTwoDateObjects(fiveMinuteSlotDateObject, appointment.dateAndTime.when, appointment.dateAndTime.endsAt) && (appointment.workerData._id === selectedWorkerBasedOnIndex)) {
                setHasAppointment(true)
                setAppointmentForSlot(appointment)

            }

        })
    }, [selectedWorkerBasedOnIndex])
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);


    useEffect(() => {
        Object.keys(shiftsFromShop)?.map(day => shiftsFromShop[day]?.shifts.map(shift => {
            const shiftStartMinutes = dayjs(shift.from).minute()
            const shiftDay = indexOfDays[day]
            const shiftStartHour = dayjs(shift.from).hour()
            const shiftFinishHour = dayjs(shift.to).hour()
            const shiftFinishMinute = dayjs(shift.to).minute()
            const indexOfDayInWeekFromFiveMinuteSlot = dayjs(fiveMinuteSlotDateObject).day()
            if (shiftDay === indexOfDayInWeekFromFiveMinuteSlot) {
                const shiftStartDateObject = dayjs(new Date(year, monthNumber - 1, dayNumber, shiftStartHour, shiftStartMinutes))
                const shiftFinishDateObject = dayjs(new Date(year, monthNumber - 1, dayNumber, shiftFinishHour, shiftFinishMinute))
                if (isDateGivenTheSameOrBetweenTwoDateObjects(fiveMinuteSlotDateObject, shiftStartDateObject, shiftFinishDateObject)) {
                    setIsFiveMinuteSlotInsideWorkingHours(true)
                }
            }


        }))


    }, [shiftsFromShop])

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsPressed(false)
        }
    };


    return (
        <div ref={wrapperRef} style={styles.wrapper}>
            <div style={styles.timeLeft}>{(minutes === '00') && time}</div>
            <div onMouseEnter={() => {
                setIsSelected(true)
            }} onMouseLeave={() => {
                setIsSelected(false)
            }}
                 onClick={() => setIsPressed(true)}
                 style={
                     hasAppointment
                         ? isTheFirstFiveMinuteSlotOfAppointment
                             ?
                             styles.appointmentFirst
                             : styles.appointment
                         :
                         ((isSelected || isPressed))
                             ?
                             styles.minutesDivActive
                             :
                             (isFiveMinuteSlotInsideWorkingHours && !isFiveMinuteSlotDuringVacation)
                                 ?
                                 styles.minutesDiv
                                 : styles.inactive}>
                {isTheFirstFiveMinuteSlotOfAppointment ? `Client: ${appointmentForSlot?.clientData?.firstName} ${appointmentForSlot?.clientData?.lastName}, Serv: ${appointmentForSlot?.type} ` : time}
            </div>
            {isPressed &&
                <AddEditDeleteBookingModal
                    indexOfTypeOfView={indexOfTypeOfView}
                    hasAppointment={hasAppointment}
                    appointmentData={appointmentForSlot} dateAndTime={
                    fiveMinuteSlotDateObject.$d
                } onClose={() => {
                    setIsPressed(false)
                }}/>}
        </div>

    )
}


export default FiveMinuteSlot
