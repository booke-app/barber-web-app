import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {
    setAppointmentToEdit,
    setDayThatTheAppointmentWasDroppedAt
} from "../../Features/appointment/appointment-slice";

import {
    ArrowsUpDownIcon,

} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {
    editReservation
} from "./actions";
import {
    setUpdatedAppointments
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";
import {
    handleDragOver,
    returnADateObjectInWhichTheYearMonthAndDayRemainTheSameButOnlyTheHoursAndMinutesChange,
    roundPixelsToTheNearestPixelWhichWillProduceAFiveMinute,
    turnPixelsIntoHoursAndMinutes
} from "../../Utilities/utilities";

const Appointment = ({
                         setNewTopAfterDrag,
                         setIsAppointmentBeingResized,
                         appointment,
                         positionOfCursor,
                         newTopAfterDrag
                     }) => {
    const dispatch = useDispatch()
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    const [heightOfAppointmentToDetermineTheDuration, setHeightOfAppointmentToDetermineTheDuration] = useState((appointment.dateAndTime.duration / 15) * 30)
    const [top, setTop] = useState(((dayjs(appointment.dateAndTime.when).format("HH") * 120) + (
        dayjs(appointment.dateAndTime.when).format('mm') * 2)))
    const [areUpDownArrowsOnTheBottomOfTheAppointmentClicked, setAreUpDownArrowsOnTheBottomOfTheAppointmentClicked] = useState(false)
    const [isAppointmentBeingDragged, setIsAppointmentBeingDragged] = useState(false)
    const dayThatTheAppointmentWasDroppedAt = useSelector(state => state.appointment.dayThatTheAppointmentWasDroppedAt)
    useEffect(() => {
        if (areUpDownArrowsOnTheBottomOfTheAppointmentClicked && positionOfCursor && !isAppointmentBeingDragged) {
            let currentHeight = ((positionOfCursor?.cord?.yNonFixed) + (positionOfCursor.value * 120)) - top

            setHeightOfAppointmentToDetermineTheDuration(currentHeight)
        }
    }, [positionOfCursor]);


    useEffect(() => {
        //How the drag works?
        //We have to determine at which position was the appointment dropped
        // based on the parent element (Day.js)
        //When is dropped we calculate the newTopAfterDrag in Day.js
        // and we pass it to all Appointments. The top although, changes only in
        // the appointment that has isAppointmentBeingDragged === true.


        if (isAppointmentBeingDragged && newTopAfterDrag) {
            setTop(newTopAfterDrag)
            setNewTopAfterDrag(null)
            setIsAppointmentBeingDragged(false)

        }
    }, [newTopAfterDrag]);


    useEffect(() => {
        //This is the starting top of appointment, if it is different we need to update it
        if (isAppointmentBeingDragged) {
            if (top !== ((dayjs(appointment.dateAndTime.when).format("HH") * 120) + (
                dayjs(appointment.dateAndTime.when).format('mm') * 2))) {
                editBooking()
            }
        }


    }, [top]);
    useEffect(() => {
        if (isAppointmentBeingDragged) {
            if (dayThatTheAppointmentWasDroppedAt !== null) {
                if (!dayjs(appointment.dateAndTime.when)?.isSame(dayjs(dayThatTheAppointmentWasDroppedAt))) {

                    const performBookingAndClear = async () => {
                        await editBooking()
                        setIsAppointmentBeingDragged(false)
                        dispatch(setDayThatTheAppointmentWasDroppedAt(null))
                    }

                    performBookingAndClear()
                }
            }
        }


    }, [dayThatTheAppointmentWasDroppedAt]);


    const editBooking = async () => {
        try {
            const response = await editReservation(
                {
                    bookingData: {
                        clientData: {
                            firstName: appointment.clientData.firstName,
                            lastName: appointment.clientData.lastName
                        },
                        workerData: {
                            firstName: appointment.workerData.firstName,
                            lastName: appointment.workerData.lastName,
                            _id: appointment.workerData._id,

                        },
                        dateAndTime: {
                            when: returnADateObjectInWhichTheYearMonthAndDayRemainTheSameButOnlyTheHoursAndMinutesChange(
                                dayThatTheAppointmentWasDroppedAt ?
                                    dayThatTheAppointmentWasDroppedAt :
                                    appointment.dateAndTime.when, top),
                            duration: heightOfAppointmentToDetermineTheDuration / 2,
                        },
                        type: appointment.type,
                        serviceId: appointment.serviceId,
                        _id: appointment._id,
                        price: appointment?.price

                    },
                    shopId: shopId,
                })


            dispatch(setUpdatedAppointments(response))
            dispatch(setModalContent({
                message: 'Appointment was edited successfully',
                status: 200
            }))


        } catch (e) {
            dispatch(setModalContent({
                message: e.message,
                status: 500,
            }))
        }
    }


    return (

        <div
            draggable={true}
            onDragOver={handleDragOver}
            onDrop={(event) => {
                // the onDrop here is for when we drag an appointment down and
                //it falls inside the component, not inside Day.js

                let bounds = event.target.getBoundingClientRect();
                let y = event.clientY - bounds.top;


                console.log(y, 'yAppointment')

                if (y > 0) {
                    y = roundPixelsToTheNearestPixelWhichWillProduceAFiveMinute(y)

                    console.log('beforeTop', y)
                    setTop(top + y)
                }
                if (y < 0) {
                    y = roundPixelsToTheNearestPixelWhichWillProduceAFiveMinute(y)

                    console.log('beforeTop', y)
                    setTop(top - y)
                }

            }}
            onDragCapture={(event) => {


                if (!areUpDownArrowsOnTheBottomOfTheAppointmentClicked) {
                    setIsAppointmentBeingDragged(true)
                }
            }}

            className={'absolute w-full'}
            onMouseMove={(event) => {

                if (areUpDownArrowsOnTheBottomOfTheAppointmentClicked && !isAppointmentBeingDragged) {
                    let bounds = event.target.getBoundingClientRect();
                    let y = event.clientY - bounds.top;

                    //
                    if (y < heightOfAppointmentToDetermineTheDuration && y > 15) {
                        setHeightOfAppointmentToDetermineTheDuration(y)
                    }
                }


            }}

            style={{

                top: `${top}px `,

            }}
        >
            <div
                style={{height: `${heightOfAppointmentToDetermineTheDuration}px`}}
                className={'relative rounded-lg  bg-blue-50 ' + (!areUpDownArrowsOnTheBottomOfTheAppointmentClicked && 'hover:bg-blue-100')}
            >
                <div
                    onClick={() => {

                        dispatch(setAppointmentToEdit(appointment))
                    }}
                    className={'cursor-pointer relative  flex flex-col overflow-y-hidden  p-2 text-xs leading-5 '}
                >

                    <span
                        className={'font-semibold text-blue-700'}>{
                        appointment.type
                    }</span>
                    <p className="text-blue-500 group-hover:text-blue-700">
                        <span>
                            {appointment.clientData.firstName} {appointment.clientData.lastName} | {turnPixelsIntoHoursAndMinutes(top).hours + ":" + turnPixelsIntoHoursAndMinutes(top).minutes
                        }-{turnPixelsIntoHoursAndMinutes(top + heightOfAppointmentToDetermineTheDuration).hours + ":" + turnPixelsIntoHoursAndMinutes(top + heightOfAppointmentToDetermineTheDuration).minutes}
                        </span>
                    </p>

                </div>


                <div

                    onClick={() => {
                        if (!areUpDownArrowsOnTheBottomOfTheAppointmentClicked) {
                            setAreUpDownArrowsOnTheBottomOfTheAppointmentClicked(true)
                            setIsAppointmentBeingResized(true)
                            setIsAppointmentBeingDragged(false)
                        }
                        if (areUpDownArrowsOnTheBottomOfTheAppointmentClicked) {
                            setAreUpDownArrowsOnTheBottomOfTheAppointmentClicked(false)
                            setIsAppointmentBeingResized(false)
                            editBooking()


                        }

                    }}

                    className={'w-full h-2 cursor-ns-resize absolute bottom-0'}>
                    <ArrowsUpDownIcon

                        className=" left-0 right-0 mr-auto ml-auto  w-2"
                        aria-hidden="true"/>
                </div>
            </div>
        </div>)
}

export default Appointment
