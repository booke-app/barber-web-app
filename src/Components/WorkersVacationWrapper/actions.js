import {request} from "../../Utilities/Request";

export const getVacations = async () => {
    try {

        const response = await request('/vacations')
        console.log({...response.vacations}, 'resyyyy')
        return {...response.vacations}
    } catch (e) {
        console.log(e, 'error@getVacations@WorkersVacationWrapper')
    }
}
