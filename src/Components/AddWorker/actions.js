import {request} from "../../Utilities/Request";

//fields in payload
// firstName
//  lastName
//   email
//   phone
//   password
export const addWorker = async (payload) => {
    try {
        const response = await request('/create-worker', payload, null, 'POST')
        return response.data
    } catch (e) {
        throw new Error(e)
    }
}
