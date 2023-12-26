import WeekNavigatorSlot
    from "../WeekNavigatorSlot/WeekNavigatorSlot";
import {
    oneDayCreator,
    threeDayCreator,
    twoDayCreator,
    weekCreator
} from "../../Utilities/utilities";

export default function WeekNavigator({
                                          containerNav,
                                          typeOfNavigator
                                      }) {

    return (<div
        ref={containerNav}
        style={{
            minWidth: typeOfNavigator === 'week' ? "1400px" : typeOfNavigator === '2Day' ? '400px' : typeOfNavigator === '3Day' ? '600px' : typeOfNavigator === '1Day' && '200px',

            width: '100%',
            display: "flex",
            flexDirection: 'row',
            justifyContent: "space-around",
            position: "sticky",
            top: 0,
            zIndex: 10,
            left: 0,
            backgroundColor: 'white',
         

        }}

        className={'shadow '}
    >
        {typeOfNavigator === 'week' && weekCreator.map((weekDay, index) =>
            <WeekNavigatorSlot key={index}
                               weekDay={weekDay}/>)}
        {typeOfNavigator === '2Day' && twoDayCreator.map((weekDay, index) =>
            <WeekNavigatorSlot key={index}
                               weekDay={weekDay}/>)}
        {typeOfNavigator === '3Day' && threeDayCreator.map((weekDay, index) =>
            <WeekNavigatorSlot key={index}
                               weekDay={weekDay}/>)}
        {typeOfNavigator === '1Day' && oneDayCreator.map((weekDay, index) =>
            <WeekNavigatorSlot key={index}
                               weekDay={weekDay}/>)}
    </div>)
}
