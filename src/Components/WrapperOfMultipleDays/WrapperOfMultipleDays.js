import {
    DayInsideWrapperOfMultipleDays
} from "../DayInsideWrapperOfMulipleDays/DayInsideWrapperOfMulipleDay";

const WrapperOfMultipleDays = ({item}) => {
    console.log(item)
    return (
        <div
            style={{alignItems: "center"}}
            className={'flex w-full flex-row'}>
            {item.arrayOfDays?.map((indexOfDay) =>
                <DayInsideWrapperOfMultipleDays item={item}
                                                indexOfDay={indexOfDay}/>)}


        </div>

    )
}


export default WrapperOfMultipleDays
