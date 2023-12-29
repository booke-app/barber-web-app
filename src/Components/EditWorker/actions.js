import {request} from "../../Utilities/Request";

export const edit = async (payload) => {
    try {
        const response = await request('/edit-worker', payload, null, 'POST')
        console.log(response)
        return response.data
    } catch (e) {
        throw new Error(e)
    }
}
