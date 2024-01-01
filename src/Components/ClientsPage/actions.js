import {request} from "../../Utilities/Request";

export const removeClient = async (payload) => {
    try {
        const res = await request('/client', payload, null, 'DELETE')
        return res.data
    } catch (e) {
        throw Error(e)
    }
}
