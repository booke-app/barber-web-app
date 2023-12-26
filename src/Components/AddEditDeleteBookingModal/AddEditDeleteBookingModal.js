import {Box, Button, TextField} from "@mui/material";
import theme from "../../theme";
import {styles} from "./styles";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {bookAppointment, deleteReservation, editReservation} from "./actions";
import dayjs from "dayjs";
import {setUpdatedAppointments} from "../../Features/authorizeUser/authorizeUser-slice";
import {setShouldViewUpdate} from "../../Features/typeOfView/typeOfView-slice";
import {setModalContent} from "../../Features/modal/modal-slice";

const AddEditDeleteBookingModal = ({
                                       top,
                                       indexOfTypeOfView,
                                       onClose,
                                       dateAndTime,
                                       hasAppointment,
                                       appointmentData
                                   }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    const services = useSelector(state => state.authorizeUser.shop.services)
    const dispatch = useDispatch()
    const [selectedService, setSelectedService] = useState({})
    const [editStarted, setEditStarted] = useState(false)
    const workersFromShop = useSelector(state => state.authorizeUser.shop.workers)
    const [selectedWorkerId, setSelectedWorkerId] = useState('')
    const typeOfView = useSelector(state => state.typeOfView)
    const editBooking = async () => {
        try {
            const response = await editReservation(
                {
                    bookingData: {
                        clientData: {
                            firstName: firstName,
                            lastName: lastName
                        },
                        workerData: {
                            firstName: workersFromShop.filter(worker => selectedWorkerId === worker._id)?.[0].firstName,
                            lastName: workersFromShop.filter(worker => selectedWorkerId === worker._id)?.[0].lastName,
                            _id: selectedWorkerId,

                        },
                        dateAndTime: {
                            when: appointmentData.dateAndTime.when,
                            endsAt: dayjs(appointmentData?.dateAndTime?.when).add(selectedService.duration, 'minute').$d,
                            duration: selectedService.duration,
                        },
                        type: selectedService.name,
                        serviceId: selectedService._id,
                        _id: appointmentData?._id,

                    },
                    shopId: shopId,
                })

            dispatch(setUpdatedAppointments(response))
            dispatch(setModalContent({message: 'Appointment was edited successfully', status: 200}))


        } catch (e) {
            dispatch(setModalContent({message: e.message, status: 500,}))
        }
    }
    const cancelReservation = async () => {
        try {
            const response = await deleteReservation({
                shopId: shopId, bookingId: appointmentData?._id
            })
            dispatch(setUpdatedAppointments(response))
            dispatch(setModalContent({message: 'Appointment was canceled successfully', status: 200}))

        } catch (e) {
            dispatch(setModalContent({message: e.message, status: 500,}))
        }
    }

    useEffect(() => {
        //set default worker based on the view that is in
        if (indexOfTypeOfView === 0) {
            setSelectedWorkerId(typeOfView.firstViewWorkerId)
        }
        if (indexOfTypeOfView === 1) {
            setSelectedWorkerId(typeOfView.secondViewWorkerId)

        }
        if (indexOfTypeOfView === 2) {
            setSelectedWorkerId(typeOfView.thirdViewWorkerId)
        }

        if (!indexOfTypeOfView) {
            setSelectedWorkerId(typeOfView.firstViewWorkerId)
        }
    }, [])

    const bookReservation = async () => {
        try {

            const res = await bookAppointment({
                clientFirstName: firstName,
                clientLastName: lastName,
                shopId: shopId,
                workerId: selectedWorkerId,
                bookedDateAndTime: dateAndTime,
                service: {
                    endsAt: dayjs(dateAndTime).add(selectedService?.duration, 'minute').$d,
                    name: selectedService?.name,
                    _id: selectedService?._id,
                    duration: selectedService?.duration
                }
            })
            dispatch(setUpdatedAppointments(res))
            dispatch(setShouldViewUpdate())
            dispatch(setModalContent({message: 'Appointment was booked successfully', status: 200}))

        } catch (e) {
            dispatch(setModalContent({message: e.message, status: 500,}))
        }

    }
    useEffect(() => {

        setFirstName(appointmentData?.clientData?.firstName)
        setLastName(appointmentData?.clientData?.lastName)
        setSelectedWorkerId(appointmentData?.workerData?._id)
        setSelectedService({
            name: appointmentData?.type,
            _id: appointmentData?.serviceId,
            duration: appointmentData?.dateAndTime?.duration
        })


    }, [])

    return (<div
        style={styles.wrapper}>
        <div style={styles.arrowApp}></div>
        <Box
            sx={{
                maxWidth: ' 250px',
                minWidth: "100%",
                minHeight: "5vh",
                backgroundColor: theme.palette.primary.gray,
                position: "absolute",
                top: '20px',
                left: '30px',
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "30px",
                zIndex: 6
            }}>
            {<>

                <div style={styles.outerDiv}>

                    <TextField sx={{margin: '5px 0 '}}
                               InputProps={{readOnly: (!editStarted && hasAppointment),}} value={firstName}
                               onChange={(e) => {
                                   setFirstName(e.target.value)
                               }} fullWidth label={"Client's First Name"}/>
                    <TextField InputProps={{readOnly: (!editStarted && hasAppointment),}}
                               value={lastName}
                               sx={{margin: '5px 0 '}}
                               onChange={(e) => {
                                   setLastName(e.target.value)
                               }} fullWidth label={"Client's Last Name"}/>


                </div>

                <p style={styles.serviceTitle}>{(!hasAppointment || editStarted) ? 'Please select service' : 'Service selected'}</p>
                <div style={styles.servicesContainer}> {services?.map((service, i) =>
                    <Button fullWidth key={i}
                            sx={{
                                fontSize: '12px',
                                margin: '10px 5px',
                                flex: 1,
                                width: '33%'
                            }}
                            variant={selectedService._id === service._id ? 'contained' : "outlined"}
                            onClick={() => {
                                if (editStarted || !hasAppointment) {
                                    setSelectedService(service)
                                }
                            }}>{service.name}</Button>)}</div>
                <p style={styles.serviceTitle}>{(!hasAppointment || editStarted) ? 'Please select worker' : 'Worker selected'}</p>
                <div style={styles.servicesContainer}>{workersFromShop.map((worker, workerIndex) =>
                    <Button fullWidth
                            key={workerIndex}
                            onClick={() => {
                                if (editStarted || !hasAppointment) {
                                    setSelectedWorkerId(worker._id)
                                }
                            }}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                fontSize: '12px',
                                padding: '2px',
                                margin: '10px 5px',
                                flex: 1,
                                width: '33%'
                            }}
                            variant={selectedWorkerId === worker._id ? 'contained' : "outlined"}>
                        {worker.firstName.substring(0, 3) + " " + worker.lastName.substring(0, 3)}
                    </Button>)}
                </div>
                <Button
                    disabled={hasAppointment && !editStarted ? false : editStarted ? (appointmentData?.clientData?.firstName === firstName &&
                        appointmentData?.clientData?.lastName === lastName &&
                        selectedWorkerId === appointmentData?.workerData?._id && appointmentData?.serviceId === selectedService._id) : (firstName?.length < 3 || lastName?.length < 3 || !selectedService?.name)}
                    sx={{
                        margin: '10px 0'
                    }} fullWidth variant={'contained'} onClick={() => {

                    if (!editStarted && !hasAppointment) {
                        bookReservation()
                        onClose()

                    }
                    if (hasAppointment && !editStarted) {
                        return setEditStarted(true)
                    }
                    if (editStarted) {
                        editBooking()
                        onClose()

                    }

                }}>{hasAppointment ? 'Edit' : editStarted ? 'Confirm' : 'Book'}</Button>
                {(hasAppointment && !editStarted) &&
                    <Button sx={{
                        marginLeft: '5px',
                        marginBottom: '10px',
                        backgroundColor: 'red'

                    }}
                            fullWidth variant={'contained'} onClick={() => {
                        cancelReservation()


                    }}>DELETE</Button>}
            </>}
            <Button fullWidth variant={'outlined'} onClick={onClose}>Close</Button>
        </Box>
    </div>)
}


export default AddEditDeleteBookingModal
