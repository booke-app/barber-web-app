import {request} from "../../Utilities/Request";

export const setVacationMode = async (payload) => {
    try {
        const response = await request(
            '/vacation-mode', payload, null, 'POST')
        return response.vacationMode


    } catch (e) {
        console.log(e, 'error@actions@vacationMode')
    }
}
