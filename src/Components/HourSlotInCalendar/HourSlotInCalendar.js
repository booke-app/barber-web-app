import {styles} from "../Day/styles";

const HourSlotInCalendar = ({
                                selectedTimeForAppointment,
                                dayObjectThatTheSlotIsPartOf,
                                time,
                                getRelativeCoordsToShowWhichTimeSlotIsHovered
                            }) => {
    return (
        <div className={time} onMouseMoveCapture={(e) => {
            if (!selectedTimeForAppointment) {
                getRelativeCoordsToShowWhichTimeSlotIsHovered(e)
            }
        }}
             style={dayObjectThatTheSlotIsPartOf[time].hasInactiveSlot ? {
                 backgroundColor: 'white',
                 backgroundImage: `repeating-linear-gradient(45deg, #e0e0e0, #e0e0e0 4px, #f2f2f2 4px, #f2f2f2 8px)  `,
                 backgroundPositionY: `${(dayObjectThatTheSlotIsPartOf[time].startMinuteOfInactiveSlot / 60) * 100}%`,
                 backgroundSize: `100% ${(dayObjectThatTheSlotIsPartOf[time].endMinuteOfInactiveSlot / 60) * 100}%`,
                 backgroundRepeat: 'no-repeat',


                 ...styles.divOfHour,
                 top: `${time * 120}px`
             } : {

                 ...styles.divOfHour,
                 top: `${time * 120}px`
             }}>
            <div style={{
                pointerEvents: 'none',
                borderStyle: "solid",
                borderColor: 'rgba(203,213,224,0.4)',
                borderWidth: 1,
                height: 0,
            }}></div>
        </div>)

}


export default HourSlotInCalendar
