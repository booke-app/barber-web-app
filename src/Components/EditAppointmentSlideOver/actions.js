import {request} from "../../Utilities/Request";

export const deleteReservation = async (payload) => {
    try {
        const response = await request('/booking', payload, null, 'DELETE')
        return response.data.appointments
    } catch (e) {
        throw new Error(e)
    }
}
