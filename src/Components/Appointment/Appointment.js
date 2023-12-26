import dayjs from "dayjs";
import {styles} from './styles'

const Appointment = ({appointment}) => {
    return (
        <div
            style={{
                paddingLeft: '2px',
                paddingRight: '2px'
            }}>
            <div
                className={'  cursor-pointer  absolute  flex flex-col overflow-y-hidden rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100'}

                style={{
                    width: 'calc(calc(100% ) -4px) ',
                    top: `${(dayjs(appointment.dateAndTime.when).format("HH") * 120) + (
                        dayjs(appointment.dateAndTime.when).format('mm') < 15 ? 0 :
                            (dayjs(appointment.dateAndTime.when).format('mm') >= 15
                                && dayjs(appointment.dateAndTime.when).format('mm') < 30) ? 30
                                : (dayjs(appointment.dateAndTime.when).format('mm') >= 30
                                    && dayjs(appointment.dateAndTime.when).format('mm') < 45) ? 60 :
                                    dayjs(appointment.dateAndTime.when).format('mm') >= 45 && 90
                    )}px `,
                    height: `${(appointment.dateAndTime.duration / 15) * 30}px`
                }}>
        <span
            className={'font-semibold text-blue-700'}>{
            appointment.type
        }</span>
                <p className="text-blue-500 group-hover:text-blue-700">
                        <span>
                            {appointment.clientData.firstName} {appointment.clientData.lastName} | {dayjs(appointment?.dateAndTime.when).format('HH:mm')}-{dayjs(appointment?.dateAndTime.endsAt).format('HH:mm')}
                        </span>
                </p>

            </div>
        </div>)
}

export default Appointment
