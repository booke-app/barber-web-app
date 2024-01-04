import {request} from "../../Utilities/Request";

export const editReservation = async (payload) => {
    try {
        const response = await request('/booking', payload, null, 'PUT')
        return response.data.updatedAppointments
    } catch (e) {
        throw new Error(e)
    }
}





