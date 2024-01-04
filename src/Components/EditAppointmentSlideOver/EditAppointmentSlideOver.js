import SlideOverWithCloseButtonOnOutside
    from "../SlideOverWithCloseButtonOnOutside/SlideOverWithCloseButtonOnOutside";
import {
    SelectAServiceButtonInSlideOver
} from "../SelectAServiceButtonInSlideOver/SelectAServiceButtonInSlideOver";
import ServicesList from "../ServicesList/ServicesList";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setAppointmentToEdit,
    setIsEditAppointmentSlideOverOpen,
    setSelectedClient,
    setSelectedService,
    setSelectedTime,
    setSelectedWorker
} from "../../Features/appointment/appointment-slice";
import {
    SelectAClientButtonInSlideOver
} from "../SelectAClientButtonInSlideOver/SelectAClientButtonInSlideOver";
import {ClientsList} from "../ClientsList/ClientsList";
import dayjs from "dayjs";
import {
    deleteReservation
} from "./actions";
import {
    setUpdatedAppointments
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";

export const EditAppointmentSlideOver = () => {
    const [open, setOpen] = useState(false)
    const shopId = useSelector(state => state.authorizeUser.shop._id)

    const [isSelectServicesOpen, setIsSelectServicesOpen] = useState(false)
    const [isSelectClientOpen, setIsSelectClientOpen] = useState(false)
    const isEditAppointmentSlideOverOpen = useSelector(state => state.appointment.isEditAppointmentSlideOverOpen)
    const appointmentToEdit = useSelector(state => state.appointment.appointmentToEdit)
    const selectedTimeForAppointment = useSelector(state => state.appointment.selectedTime)
    const selectedClientForAppointment = useSelector(state => state.appointment.selectedClient)
    const selectedServiceForAppointment = useSelector(state => state.appointment.selectedService)
    const selectedWorkerForAppointment = useSelector(state => state.appointment.selectedWorker)
    const dispatch = useDispatch()


    const cancelReservation = async () => {
        try {
            const response = await deleteReservation({
                shopId: shopId,
                bookingId: appointmentToEdit?._id
            })
            dispatch(setUpdatedAppointments(response))
            dispatch(setModalContent({
                message: 'Appointment was canceled successfully',
                status: 200
            }))

        } catch (e) {
            dispatch(setModalContent({
                message: e.message,
                status: 500,
            }))
        }
    }


    useEffect(() => {
        if (!open && isEditAppointmentSlideOverOpen) {
            dispatch(setSelectedTime(null))
            dispatch(setIsEditAppointmentSlideOverOpen(false))
            dispatch(setSelectedService(null))
            dispatch(setSelectedClient(null))
            dispatch(setSelectedWorker(null))
            dispatch(setAppointmentToEdit(null))
        }

    }, [open]);
    useEffect(() => {
        if (isEditAppointmentSlideOverOpen && !open) {
            setOpen(true)
        }

    }, [isEditAppointmentSlideOverOpen]);


    console.log(appointmentToEdit)

    useEffect(() => {
        if (appointmentToEdit) {
            dispatch(setSelectedService({
                name: appointmentToEdit.type,
                duration: appointmentToEdit.dateAndTime.duration,
                _id: appointmentToEdit.serviceId,
                price: appointmentToEdit.price,
            }))

            dispatch(setSelectedTime(appointmentToEdit.dateAndTime.when))

            dispatch(setSelectedClient({
                firstName: appointmentToEdit.clientData.firstName,
                lastName: appointmentToEdit.clientData.lastName,
                email: appointmentToEdit.clientData?.email,
                phone: appointmentToEdit.clientData?.phone,
                _id: appointmentToEdit.clientData?._id,
            }))
        }

    }, [appointmentToEdit]);

    return (
        <SlideOverWithCloseButtonOnOutside
            title={'Edit Appointment'}
            open={open}
            setOpen={setOpen}>
            <SelectAClientButtonInSlideOver
                onEdit={() => {
                    setIsSelectClientOpen(true)
                }}
                close={() => {
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
                onEdit={() => {
                    setIsSelectServicesOpen(true)
                }}
                onClick={() => setIsSelectServicesOpen(true)}/>
            <ClientsList open={isSelectClientOpen}
                         setOpen={setIsSelectClientOpen}/>

            <ServicesList
                open={isSelectServicesOpen}
                setOpen={setIsSelectServicesOpen}/>

            <button
                onClick={() => {
                    setOpen(false)
                    cancelReservation()
                }}
                className="mt-5 w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            >
                CANCEL APPOINTMENT
            </button>
            {/*<button*/}
            {/*    onClick={() => {*/}
            {/*        setOpen(false)*/}
            {/*    }}*/}
            {/*    className="mt-5 rounded-md w-full bg-white  px-3 py-2 text-sm border-2 border-red-600/100 font-semibold text-red-600/100 shadow-sm hover:bg-red-500 hover:text-white"*/}
            {/*>*/}
            {/*    NO SHOW*/}
            {/*</button>*/}

            <button
                onClick={() => {
                    setOpen(false)
                }}
                type="button"
                className="absolute bottom-0 left-6 rounded-md bg-indigo-600 px-3 py-2 text-l font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                EDIT
                APPOINTMENT
            </button>
            <button
                onClick={() => {
                    setOpen(false)
                }}
                type="button"
                className="absolute bottom-0 right-6 rounded-md bg-red-600 px-3 py-2 text-l font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
                GO BACK
            </button>
        </SlideOverWithCloseButtonOnOutside>
    )
}
