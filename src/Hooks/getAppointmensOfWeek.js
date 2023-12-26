import {useSelector} from "react-redux";
import dayjs from "dayjs";
import {weekCreator} from "../Utilities/utilities";

export const getAppointmentsOfWeek = () => {
    const appointments = useSelector(state => state.authorizeUser.shop?.appointments)
    const selectedDate = useSelector(state => state.calendar?.selectedDate)
    let appointmentsOfWeek = []
    const selectedWorkerForWeekView = useSelector(state => state.typeOfView.selectedWorkerForWeekView)
    weekCreator.map((weekDay, index) => {
        const weekDayTimeObject = weekDay.type === 'subtract' ? dayjs(selectedDate).subtract(weekDay.number, 'd') : weekDay.type === 'add' && dayjs(selectedDate).add(weekDay.number, 'd')


        appointments?.map(appointment => {
            if (dayjs(appointment.dateAndTime.when).isSame(dayjs(weekDayTimeObject), 'd')
                && appointment.workerData._id === selectedWorkerForWeekView?._id
            ) {
                appointmentsOfWeek.push({
                    ...appointment,
                    indexOfAppointmentRelativeToWeekInOrderToMatchTheAppointmentWithTheGridColumn: index
                })
            }

        })

    })


    console.log(appointmentsOfWeek)

    return appointmentsOfWeek
}
