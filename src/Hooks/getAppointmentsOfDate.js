import {useSelector} from "react-redux";
import {
    isDateGivenTheSameOrBetweenTwoDateObjects
} from "../Utilities/utilities";
import dayjs from "dayjs";
import {useEffect, useState} from "react";

export const getAppointmentsOfDate = (index, indexOfWorkerThatTheDayRepresents) => {
    const selectedDate = useSelector(state => state.calendar.selectedDate)
    const appointments = useSelector(state => state.authorizeUser.shop.appointments)
    const selectedWorker = useSelector(state => state.typeOfView.firstViewWorker)

    const workerSelectedOnFirstView = useSelector(state => state.typeOfView?.firstViewWorker)
    const workerSelectedOnSecondView = useSelector(state => state.typeOfView?.secondViewWorker)
    const workerSelectedOnThirdView = useSelector(state => state.typeOfView?.thirdViewWorker)
    const [workerOfThisDateAndIndex, setWorkerOfThisDateAndIndex] = useState(null)
    const [appointmentsOfDate, setAppointmentsOfDate] = useState(null)
    useEffect(() => {
        if (!indexOfWorkerThatTheDayRepresents) {
            setWorkerOfThisDateAndIndex(workerSelectedOnFirstView)
        }
        if (indexOfWorkerThatTheDayRepresents === 1) {
            setWorkerOfThisDateAndIndex(workerSelectedOnSecondView)
        }
        if (indexOfWorkerThatTheDayRepresents === 2) {
            setWorkerOfThisDateAndIndex(workerSelectedOnThirdView)
        }
    }, [workerSelectedOnThirdView, workerSelectedOnSecondView, workerSelectedOnFirstView]);
    useEffect(() => {
        if (!indexOfWorkerThatTheDayRepresents) {
            setWorkerOfThisDateAndIndex(workerSelectedOnFirstView)
        }
        if (indexOfWorkerThatTheDayRepresents === 1) {
            setWorkerOfThisDateAndIndex(workerSelectedOnSecondView)
        }
        if (indexOfWorkerThatTheDayRepresents === 2) {
            setWorkerOfThisDateAndIndex(workerSelectedOnThirdView)
        }
    }, []);


    useEffect(() => {

        let arr = []
        appointments?.map(appointment => {
            if (dayjs(dayjs(selectedDate).add(index, "d")).isSame(dayjs(appointment.dateAndTime.when), 'd') &&
                appointment.workerData._id === workerOfThisDateAndIndex?._id
            ) {
                arr.push(appointment)
            }
        })
        setAppointmentsOfDate([...arr])
        console.log('app', arr)

    }, [workerOfThisDateAndIndex, selectedDate, appointments]);


    return appointmentsOfDate
}
