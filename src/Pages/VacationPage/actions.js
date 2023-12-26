import {request} from "../../Utilities/Request";

export const sendVacationsToServer = async (payload) => {
    try {
        const res = await request('/add-vacations', payload, null, 'POST')
        return res.vacations
    } catch (e) {
        throw new Error(e)
    }
}
