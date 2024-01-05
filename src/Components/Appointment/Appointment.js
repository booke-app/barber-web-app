import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {
    setAppointmentToEdit,
    setDayThatTheAppointmentWasDroppedAt,
    setIdOfAppointmentThatWillBeEdited,
    setNewTopForAppointmentAfterDraggedAndDroppedOnAnotherDay,
    setObjectThatContainsTheIdOfTheAppointmentThatWillBeEditedTheDayThatWasDroppedAtAndTheNewTopPosition
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
                         setIsAppointmentBeingResized,
                         appointment,
                         positionOfCursor,

                     }) => {
    const dispatch = useDispatch()
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    const [heightOfAppointmentToDetermineTheDuration, setHeightOfAppointmentToDetermineTheDuration] = useState(Math.floor(appointment.dateAndTime.duration / 15) * 30)
    const [top, setTop] = useState(((dayjs(appointment.dateAndTime.when).format("HH") * 120) + (
        dayjs(appointment.dateAndTime.when).format('mm') * 2)))
    const [areUpDownArrowsOnTheBottomOfTheAppointmentClicked, setAreUpDownArrowsOnTheBottomOfTheAppointmentClicked] = useState(false)
    const objectOfAppointmentToBeEdited = useSelector(state => state.appointment.objectThatContainsTheIdOfTheAppointmentThatWillBeEditedTheDayThatWasDroppedAtAndTheNewTopPosition)


    useEffect(() => {
        //when we resize appointment

        if (areUpDownArrowsOnTheBottomOfTheAppointmentClicked && positionOfCursor) {
            let currentHeight = ((positionOfCursor?.cord?.yNonFixed) + (positionOfCursor.value * 120)) - top

            setHeightOfAppointmentToDetermineTheDuration(currentHeight)
        }
    }, [positionOfCursor]);

    useEffect(() => {
        if (appointment._id === objectOfAppointmentToBeEdited?._id) {
            if (objectOfAppointmentToBeEdited.newTopForAppointment && objectOfAppointmentToBeEdited.dayThatTheAppointmentWasDroppedAt) {
                editBooking(objectOfAppointmentToBeEdited.newTopForAppointment, objectOfAppointmentToBeEdited.dayThatTheAppointmentWasDroppedAt, objectOfAppointmentToBeEdited.workerToHandle)
                dispatch(setObjectThatContainsTheIdOfTheAppointmentThatWillBeEditedTheDayThatWasDroppedAtAndTheNewTopPosition(null))
            }
        }


    }, [objectOfAppointmentToBeEdited])

    const editBooking = async (manualTop, manualDate, manualWorker) => {
        try {
            const response = await editReservation(
                {
                    bookingData: {
                        clientData: {
                            firstName: appointment.clientData.firstName,
                            lastName: appointment.clientData.lastName
                        },
                        workerData: !manualWorker ? {
                            firstName: appointment.workerData.firstName,
                            lastName: appointment.workerData.lastName,
                            _id: appointment.workerData._id,

                        } : {
                            firstName: manualWorker.firstName,
                            lastName: manualWorker.lastName,
                            _id: manualWorker._id,
                        },
                        dateAndTime: {
                            when: (manualDate && manualTop) ? returnADateObjectInWhichTheYearMonthAndDayRemainTheSameButOnlyTheHoursAndMinutesChange(
                                manualDate, manualTop) : returnADateObjectInWhichTheYearMonthAndDayRemainTheSameButOnlyTheHoursAndMinutesChange(appointment.dateAndTime.when, top),
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
            onDragStart={(event) => {
                event.dataTransfer.setData('id', appointment._id)

            }}
            onDrop={(event) => {
                // the onDrop here is for when we drag an appointment down and
                //it falls inside the component, not inside Day.js
                let bounds = event.target.getBoundingClientRect();
                let y = event.clientY - bounds.top;
                let idOfAppointment = event.dataTransfer.getData('id')

                y = roundPixelsToTheNearestPixelWhichWillProduceAFiveMinute(y)


                if (!isNaN((y / 2) + top) && (idOfAppointment === appointment?._id)) {
                    dispatch(setObjectThatContainsTheIdOfTheAppointmentThatWillBeEditedTheDayThatWasDroppedAtAndTheNewTopPosition(
                        {
                            _id: idOfAppointment,
                            dayThatTheAppointmentWasDroppedAt: dayjs(appointment.dateAndTime.when).$d,
                            newTopForAppointment: top + (y / 2)
                        }
                    ))


                }
            }}


            className={'absolute w-full'}
            onMouseMove={(event) => {

                if (areUpDownArrowsOnTheBottomOfTheAppointmentClicked) {
                    let bounds = event.target.getBoundingClientRect();
                    let heightOfAppointmentInPixelsFromTheTopOfItToThePointOfTheCursor = event.clientY - bounds.top;


                    if (heightOfAppointmentInPixelsFromTheTopOfItToThePointOfTheCursor < heightOfAppointmentToDetermineTheDuration && heightOfAppointmentInPixelsFromTheTopOfItToThePointOfTheCursor > 15) {
                        setHeightOfAppointmentToDetermineTheDuration(heightOfAppointmentInPixelsFromTheTopOfItToThePointOfTheCursor)
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
                            dispatch(setIdOfAppointmentThatWillBeEdited(null))
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
