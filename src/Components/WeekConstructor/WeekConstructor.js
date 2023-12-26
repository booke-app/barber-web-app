import {
    indexOfDays,
    weekCreator
} from "../../Utilities/utilities";
import WeekNavigatorSlot
    from "../WeekNavigatorSlot/WeekNavigatorSlot";
import Day from "../Day/Day";
import {
    getAppointmentsOfWeek
} from "../../Hooks/getAppointmensOfWeek";

const WeekConstructor = () => {
    return (<>
            {Object.keys(indexOfDays).map((dayName, index) =>
                <Day key={index} indexOfWorkerThatTheDayRepresents={0} index={index}/>)}
        </>

    )
}


export default WeekConstructor
