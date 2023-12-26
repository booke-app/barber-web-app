import {useSelector} from "react-redux";
import dayjs from "dayjs";

export const dayConstructor = (selectedDate, index) => {
    const vacationsOfShop = useSelector(state => state.authorizeUser.shop.settings.vacations)
    const shiftsOfShop = useSelector(state => state.authorizeUser.shop.settings.shifts)
    const selectedDateWithIndexAdded = dayjs(selectedDate).add(index, 'd')
    const fullNameOfDayToCompareWithShifts = dayjs(selectedDateWithIndexAdded).format('dddd')
    let dayToReturn = {
        0: {},// if hasInactive===true then from 00 , to 38 ,hasInactiveSlot:true,false
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {},
        12: {},
        13: {},
        14: {},
        15: {},
        16: {},
        17: {},
        18: {},
        19: {},
        20: {},
        21: {},
        22: {},
        23: {},
    }


    if (shiftsOfShop[fullNameOfDayToCompareWithShifts]?.shifts?.length === 0) {
        for (let i = 0; i < 24; i++) {
            dayToReturn[i] = {
                startMinuteOfInactiveSlot: 0,
                endMinuteOfInactiveSlot: 59,
                hasInactiveSlot: true
            }
        }

    }


    if (shiftsOfShop[fullNameOfDayToCompareWithShifts]?.shifts?.length > 0) {
        shiftsOfShop[fullNameOfDayToCompareWithShifts]?.shifts?.map(shift => {
            const startOfShiftHour = dayjs(shift.from).format('H')
            const startOfShiftMinute = dayjs(shift.from).format('mm')
            const endOfShiftHour = dayjs(shift.to).format('H')
            const endOfShiftMinute = dayjs(shift.to).format('mm')


            Object.keys(dayToReturn).map(hour => {

                // console.log(startOfShiftHour, ':startOfShiftHour', endOfShiftHour, ':endOfShiftHour', hour, ':hour')

                if (parseInt(hour) < startOfShiftHour) {
                    console.log('i deactivate@start<smaller', hour, startOfShiftHour)
                    dayToReturn[hour] = {
                        startMinuteOfInactiveSlot: 0,
                        endMinuteOfInactiveSlot: 59,
                        hasInactiveSlot: true
                    }
                }
                if (hour > startOfShiftHour && hour < endOfShiftHour) {


                    dayToReturn[hour] = {hasInactiveSlot: false}
                }
                if (hour === startOfShiftHour) {
                    if (parseInt(startOfShiftMinute) > 0) {
                        dayToReturn[hour] = {
                            startMinuteOfInactiveSlot: 0,
                            endMinuteOfInactiveSlot: parseInt(startOfShiftMinute),
                            hasInactiveSlot: true
                        }

                    }


                }
                if (hour === endOfShiftHour) {
                    if (parseInt(endOfShiftMinute) < 59) {
                        dayToReturn[hour] = {
                            startMinuteOfInactiveSlot: parseInt(endOfShiftMinute),
                            endMinuteOfInactiveSlot: 59,
                            hasInactiveSlot: true
                        }

                    }


                }
                if (parseInt(hour) > endOfShiftHour) {
                    console.log('i deactivate@start>bigger', hour, endOfShiftHour)


                    dayToReturn[hour] = {
                        startMinuteOfInactiveSlot: 0,
                        endMinuteOfInactiveSlot: 59,
                        hasInactiveSlot: true
                    }
                }

                if (hour === startOfShiftHour) {

                }

            })


        })
    }

    return dayToReturn


}
