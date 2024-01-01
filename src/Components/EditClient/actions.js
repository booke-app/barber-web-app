import {request} from "../../Utilities/Request";

export const editClient = async (payload) => {
    try {
        const response = await request('/edit-client', payload, null, 'POST')
        console.log(response)
        return response.data
    } catch (e) {
        throw new Error(e)
    }
}
