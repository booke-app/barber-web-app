import {request} from "../../Utilities/Request";

export const bookAppointment = async (payload) => {
    try {
        const response = await request('/create-booking', payload, null, 'POST')
        return response.data.appointments
    } catch (e) {
        throw new Error(e)
    }
}
