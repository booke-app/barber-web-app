import {request} from "../../Utilities/Request";

export const addClient = async (payload) => {
    try {
        const response = await request('/add-client', {client: payload}, null, 'POST')
        return response.data
    } catch (e) {
        throw new Error(e)
    }
}
