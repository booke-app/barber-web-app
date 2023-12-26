import {request} from "./Utilities/Request";

export const getBookings = async (payload) => {
    try {
        const res = await request(`/bookings`, payload, null, "GET")
        return res.data.appointments

    } catch (e) {
        throw e
    }
}
