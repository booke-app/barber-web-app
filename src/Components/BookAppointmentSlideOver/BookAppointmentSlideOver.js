import SlideOverWithCloseButtonOnOutside
    from "../SlideOverWithCloseButtonOnOutside/SlideOverWithCloseButtonOnOutside";
import {
    SelectAServiceButtonInSlideOver
} from "../SelectAServiceButtonInSlideOver/SelectAServiceButtonInSlideOver";
import ServicesList from "../ServicesList/ServicesList";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setIsAppointmentSlideOverOpen,
    setSelectedClient,
    setSelectedService,
    setSelectedTime, setSelectedWorker
} from "../../Features/appointment/appointment-slice";
import {
    SelectAClientButtonInSlideOver
} from "../SelectAClientButtonInSlideOver/SelectAClientButtonInSlideOver";
import {ClientsList} from "../ClientsList/ClientsList";
import dayjs from "dayjs";
import {
    bookAppointment
} from "./actions";
import {
    setUpdatedAppointments
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setShouldViewUpdate
} from "../../Features/typeOfView/typeOfView-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";

export const BookAppointmentSlideOver = () => {
    const [open, setOpen] = useState(false)
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    const appointmentToEdit = useSelector(state => state.appointment.appointmentToEdit)

    const [isSelectServicesOpen, setIsSelectServicesOpen] = useState(false)
    const [isSelectClientOpen, setIsSelectClientOpen] = useState(false)
    const isAppointmentSlideOverOpen = useSelector(state => state.appointment.isAppointmentSlideOverOpen)
    const selectedTimeForAppointment = useSelector(state => state.appointment.selectedTime)
    const selectedClientForAppointment = useSelector(state => state.appointment.selectedClient)
    const selectedServiceForAppointment = useSelector(state => state.appointment.selectedService)
    const selectedWorkerForAppointment = useSelector(state => state.appointment.selectedWorker)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!open && isAppointmentSlideOverOpen) {
            dispatch(setSelectedTime(null))
            dispatch(setIsAppointmentSlideOverOpen(false))
            dispatch(setSelectedService(null))
            dispatch(setSelectedClient(null))
            dispatch(setSelectedWorker(null))
        }

    }, [open]);
    useEffect(() => {
        if (isAppointmentSlideOverOpen && !open) {
            setOpen(true)
        }

    }, [isAppointmentSlideOverOpen]);


    const bookReservation = async () => {
        try {
            const res = await bookAppointment({
                clientFirstName: selectedClientForAppointment.firstName,
                clientId: selectedClientForAppointment._id,
                clientLastName: selectedClientForAppointment.lastName,
                shopId: shopId,
                workerId: selectedWorkerForAppointment._id,
                bookedDateAndTime: selectedTimeForAppointment,
                service: {
                    price: selectedServiceForAppointment.price,
                    endsAt: dayjs(selectedTimeForAppointment).add(selectedServiceForAppointment?.duration, 'minute').$d,
                    name: selectedServiceForAppointment?.name,
                    _id: selectedServiceForAppointment?._id,
                    duration: selectedServiceForAppointment?.duration
                }
            })
            dispatch(setUpdatedAppointments(res))
            dispatch(setModalContent({
                message: 'Appointment was booked successfully',
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
        <SlideOverWithCloseButtonOnOutside
            title={'New Appointment'}
            open={open}
            setOpen={setOpen}>
            <SelectAClientButtonInSlideOver close={() => {
                setIsSelectClientOpen(false)
            }} onClick={() => {
                setIsSelectClientOpen(true)
            }}/>
            {selectedTimeForAppointment &&
                <p className={'mt-5 text-m font-semibold text-gray-900'}>{dayjs(selectedTimeForAppointment).format('dddd, DD MMM YYYY')}</p>}
            {selectedServiceForAppointment &&
                <p className={'mt-1 text-sm font-semibold text-indigo-600'}>{dayjs(selectedTimeForAppointment).format('HH:mm')} - {dayjs(selectedTimeForAppointment).add(selectedServiceForAppointment?.duration, 'm').format('HH:mm')}</p>
            }{selectedWorkerForAppointment &&
            <p className={'mt-1 text-sm font-semibold text-indigo-600'}>{selectedWorkerForAppointment?.firstName + ' ' + selectedWorkerForAppointment?.lastName}</p>
        }
            <SelectAServiceButtonInSlideOver
                onClick={() => setIsSelectServicesOpen(true)}/>
            <ClientsList open={isSelectClientOpen}
                         setOpen={setIsSelectClientOpen}/>
            <ServicesList
                open={isSelectServicesOpen}
                setOpen={setIsSelectServicesOpen}/>


            <button
                onClick={() => {
                    setOpen(false)
                    bookReservation()
                }}
                type="button"
                className="absolute bottom-0 rounded-md bg-indigo-600 px-3 py-2 text-l font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                ADD
                APPOINTMENT
            </button>
            <button
                onClick={() => {
                    setOpen(false)
                }}
                type="button"
                className="absolute bottom-0 right-6 rounded-md bg-red-600 px-3 py-2 text-l font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
                CANCEL
            </button>
        </SlideOverWithCloseButtonOnOutside>
    )
}
