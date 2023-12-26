import findTheSelectedWorkerOfTheViewBasedOnIndex from "./findTheSelectedWorkerOfTheViewBasedOnIndex";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import {indexOfDays, isDateGivenTheSameOrBetweenTwoDateObjects} from "../Utilities/utilities";

export const isSpecificDateObjectDuringOfVacationOfWorkerBasedOnTheIndexOfTheView = (dateObject, indexOfView) => {
    //if indexOfView = 0 , we will search the vacations of worker who is selected on first view
    // in redux is translated to 'state.typeOfView?.firstViewWorkerId'
    //If inside vacations of shop there is this worker's id, we will check if any of his active vacations equal the dateObject

    const vacations = useSelector(state => state.authorizeUser.shop?.settings?.vacations)
    const workerIdBasedOnIndex = findTheSelectedWorkerOfTheViewBasedOnIndex(indexOfView)
    let isInsideVacation = false
    if (vacations?.[workerIdBasedOnIndex]) {
        vacations[workerIdBasedOnIndex].map((vacation, i) => {
            let dateOfVacation = dayjs(vacation.date)
            const vacationDayNumber = dayjs(dateOfVacation).format("DD")

            let vacationStartDateObjectIfHasSelectedHours
            let vacationFinishDateObjectIfHasSelectedHours
            let yearOfDateOfVacation = parseInt(dayjs(dateOfVacation).format('YYYY'))
            let monthNumberOfDateOfVacation = parseInt(dayjs(dateOfVacation).format('MM')) - 1
            let dayNumberOfDateOfVacation = parseInt(dayjs(dateOfVacation).format("DD"))

            if (vacation.repeat === 'no') {
                if (vacation.hasSpecificHours) {

                    vacationStartDateObjectIfHasSelectedHours = dayjs(vacation?.from)
                    vacationFinishDateObjectIfHasSelectedHours = dayjs(vacation?.to)
                    //take the hours and minutes of the objects
                    const vacationStartHour = dayjs(vacationStartDateObjectIfHasSelectedHours).format('HH')
                    const vacationStartMinute = dayjs(vacationStartDateObjectIfHasSelectedHours).format('mm')
                    const vacationFinishHour = dayjs(vacationFinishDateObjectIfHasSelectedHours).format('HH')
                    const vacationFinishMinute = dayjs(vacationFinishDateObjectIfHasSelectedHours).format('mm')

                    const vacationStartDateObjectWithRightHoursObject = dayjs(new Date(yearOfDateOfVacation, monthNumberOfDateOfVacation, dayNumberOfDateOfVacation, vacationStartHour, vacationStartMinute))
                    const vacationFinishDateObjectWithRightHoursObject = dayjs(new Date(yearOfDateOfVacation, monthNumberOfDateOfVacation, dayNumberOfDateOfVacation, vacationFinishHour, vacationFinishMinute))

                    if (isDateGivenTheSameOrBetweenTwoDateObjects(dateObject, vacationStartDateObjectWithRightHoursObject, vacationFinishDateObjectWithRightHoursObject)) {
                        isInsideVacation = true
                    }


                }
                if (!vacation.hasSpecificHours) {
                    if (dayjs(dateObject).isSame(dateOfVacation, 'day')) {
                        isInsideVacation = true
                    }

                }


            }
            if (vacation.repeat === 'weekly') {
                let yearOfDateObject = parseInt(dayjs(dateObject).format('YYYY'))
                let monthNumberOfDateObject = parseInt(dayjs(dateObject).format('MM')) - 1
                let dayNumberOfDateObject = parseInt(dayjs(dateObject).format("DD"))
                let dayNameOfDateObject = dayjs(dateObject).format("dddd")
                let dayIndexOfDateObject = indexOfDays[dayNameOfDateObject]
                let dayNameOfVacationObject = dateOfVacation.format("dddd")
                let dayIndexOfVacationObject = indexOfDays[dayNameOfVacationObject]
                if (vacation.hasSpecificHours) {

                    vacationStartDateObjectIfHasSelectedHours = dayjs(vacation?.from)
                    vacationFinishDateObjectIfHasSelectedHours = dayjs(vacation?.to)
                    //take the hours and minutes of the objects
                    const vacationStartHour = dayjs(vacationStartDateObjectIfHasSelectedHours).format('HH')
                    const vacationStartMinute = dayjs(vacationStartDateObjectIfHasSelectedHours).format('mm')
                    const vacationFinishHour = dayjs(vacationFinishDateObjectIfHasSelectedHours).format('HH')
                    const vacationFinishMinute = dayjs(vacationFinishDateObjectIfHasSelectedHours).format('mm')

                    const vacationStartDateObjectWithRightHoursObject = dayjs(new Date(yearOfDateObject, monthNumberOfDateObject, dayNumberOfDateObject, vacationStartHour, vacationStartMinute))
                    const vacationFinishDateObjectWithRightHoursObject = dayjs(new Date(yearOfDateObject, monthNumberOfDateObject, dayNumberOfDateObject, vacationFinishHour, vacationFinishMinute))

                    if (isDateGivenTheSameOrBetweenTwoDateObjects(dateObject, vacationStartDateObjectWithRightHoursObject, vacationFinishDateObjectWithRightHoursObject)) {
                        isInsideVacation = true
                    }


                }
                if (!vacation.hasSpecificHours) {
                    if (dayIndexOfDateObject === dayIndexOfVacationObject) {
                        isInsideVacation = true
                    }

                }


            }
            if (vacation.repeat === 'monthly') {
                let yearOfDateObject = parseInt(dayjs(dateObject).format('YYYY'))
                let monthNumberOfDateObject = parseInt(dayjs(dateObject).format('MM')) - 1
                let dayNumberOfDateObject = parseInt(dayjs(dateObject).format("DD"))
                if (vacation.hasSpecificHours) {

                    vacationStartDateObjectIfHasSelectedHours = dayjs(vacation?.from)
                    vacationFinishDateObjectIfHasSelectedHours = dayjs(vacation?.to)
                    //take the hours and minutes of the objects
                    const vacationStartHour = dayjs(vacationStartDateObjectIfHasSelectedHours).format('HH')
                    const vacationStartMinute = dayjs(vacationStartDateObjectIfHasSelectedHours).format('mm')
                    const vacationFinishHour = dayjs(vacationFinishDateObjectIfHasSelectedHours).format('HH')
                    const vacationFinishMinute = dayjs(vacationFinishDateObjectIfHasSelectedHours).format('mm')

                    const vacationStartDateObjectWithRightHoursObject = dayjs(new Date(yearOfDateObject, monthNumberOfDateObject, dayNumberOfDateObject, vacationStartHour, vacationStartMinute))
                    const vacationFinishDateObjectWithRightHoursObject = dayjs(new Date(yearOfDateObject, monthNumberOfDateObject, dayNumberOfDateObject, vacationFinishHour, vacationFinishMinute))

                    if (isDateGivenTheSameOrBetweenTwoDateObjects(dateObject, vacationStartDateObjectWithRightHoursObject, vacationFinishDateObjectWithRightHoursObject)) {
                        isInsideVacation = true
                    }


                }
                if (!vacation.hasSpecificHours) {
                    if (dayjs(dateObject).isSame(dateOfVacation, 'day')) {
                        isInsideVacation = true
                    }

                }


            }
        })


    }
    return isInsideVacation

}
