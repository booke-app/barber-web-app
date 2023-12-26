import {styles} from "./styles";
import {Button, Icon, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {bookAppointment} from "../AddEditDeleteBookingModal/actions";
import dayjs from "dayjs";
import {setUpdatedAppointments} from "../../Features/authorizeUser/authorizeUser-slice";
import {setShouldViewUpdate} from "../../Features/typeOfView/typeOfView-slice";
import {setModalContent} from "../../Features/modal/modal-slice";
import {LoadingButton} from "@mui/lab";
import RightOfPageWrapper from "../RightOfPageModalWrapper/RightOfPageWrapper";

const BookAppointmentRightOfPage = ({onClose, dateAndTime}) => {
    const workersFromShop = useSelector(state => state.authorizeUser.shop.workers)
    const servicesFromShop = useSelector(state => state.authorizeUser.shop.services)
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    const [selectedWorker, setSelectedWorker] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [phone, setPhone] = useState(null)
    const [selectedService, setSelectedService] = useState(null)
    const bookReservation = async () => {
        try {
            setIsLoading(true)
            const res = await bookAppointment({
                clientFirstName: firstName,
                clientLastName: lastName,
                shopId: shopId,
                workerId: selectedWorker._id,
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
        } finally {
            setIsLoading(false)
        }

    }


    return (<RightOfPageWrapper onClose={onClose}>

        <h3 style={styles.title}> New Appointment
        </h3>
        <TextField sx={{margin: '5px 0 '}}
            // InputProps={{readOnly: (!editStarted && hasAppointment),}} value={firstName}
                   onChange={(e) => {
                       setFirstName(e.target.value)
                   }} fullWidth label={"Client's First Name"}/>
        <TextField
            // InputProps={{readOnly: (!editStarted && hasAppointment),}}
            //        value={lastName}
            sx={{margin: '5px 0 '}}
            onChange={(e) => {
                setLastName(e.target.value)
            }} fullWidth label={"Client's Last Name"}/>
        <TextField
            // InputProps={{readOnly: (!editStarted && hasAppointment),}}
            //        value={lastName}
            sx={{margin: '5px 0 '}}
            onChange={(e) => {
                setPhone(e.target.value)
            }} fullWidth label={"Client's Phone"}/>

        <h3 style={styles.titleSmaller}> Select Worker
        </h3>
        <div style={styles.servicesContainer}>{workersFromShop.map((worker, workerIndex) =>
            <Button fullWidth
                    key={workerIndex}
                    onClick={() => {

                        setSelectedWorker(worker)

                    }}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        fontSize: '12px',
                        padding: '2px',
                        margin: '10px 5px',
                        flex: 1,
                        width: '33%',
                        minHeight: '50px'
                    }}
                    variant={selectedWorker?._id === worker._id ? 'contained' : "outlined"}>
                {worker.firstName + " " + worker.lastName}
            </Button>)}
        </div>
        <h3 style={styles.titleSmaller}> Select Service
        </h3>
        <div style={styles.servicesContainer}>{servicesFromShop.map((service, index) =>
            <Button fullWidth
                    key={index}
                    onClick={() => {
                        setSelectedService(service)
                    }}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        fontSize: '12px',
                        padding: '2px',
                        margin: '10px 5px',
                        flex: 1,
                        width: '33%',
                        minHeight: '50px'
                    }}
                    variant={selectedService?._id === service._id ? 'contained' : "outlined"}
            >
                {service.name}<br/>{service.duration}min.
            </Button>)}
        </div>
        <LoadingButton disabled={(firstName?.length < 3 || lastName?.length < 3 || !selectedService?.name)}
                       loading={isLoading} onClick={() => {
            bookReservation()
        }} fullWidth sx={{marginTop: '20px'}} variant={'contained'}> Book Appointment</LoadingButton>

    </RightOfPageWrapper>)
}


export default BookAppointmentRightOfPage
