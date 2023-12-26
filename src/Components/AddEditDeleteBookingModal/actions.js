import {request} from "../../Utilities/Request";

//For other user
//firstName:"JIM",
//lastName:"TEST"
// "shopId":"65167876af70e42762b56f83",
//     "workerId":"6515dd7bdfd54933f1e3fea1",
//     "bookedDateAndTime":"Sun Oct 29 2023 14:35:00 GMT+0200 (Eastern European Standard Time)",
//     "service":{
//     "endsAt":"Fri Sep 29 2023 15:30:30:00 GMT+0300 (Eastern European Summer Time)",
//         "duration":"15m",
//         "name":"haircut"

//For same user book
// "shopId":"65167876af70e42762b56f83",
//     "workerId":"6515dd7bdfd54933f1e3fea1",
//     "bookedDateAndTime":"Sun Oct 29 2023 14:35:00 GMT+0200 (Eastern European Standard Time)",
//     "service":{
//     "endsAt":"Fri Sep 29 2023 15:30:30:00 GMT+0300 (Eastern European Summer Time)",
//         "duration":"15m",
//         "name":"haircut"
// payload example
export const bookAppointment = async (payload) => {
    try {
        const response = await request('/create-booking', payload, null, 'POST')
        return response.data.appointments
    } catch (e) {
        throw new Error(e)
    }
}
export const deleteReservation = async (payload) => {
    try {
        const response = await request('/booking', payload, null, 'DELETE')
        return response.data.appointments
    } catch (e) {
        throw new Error(e)
    }
}
export const editReservation = async (payload) => {
    try {
        const response = await request('/booking', payload, null, 'PUT')
        return response.data.updatedAppointments
    } catch (e) {
        throw new Error(e)
    }
}





