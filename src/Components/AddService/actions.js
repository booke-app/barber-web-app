import {request} from "../../Utilities/Request";

export const addService = async (payload) => {
    try {
        const res = await request('/create-service', payload, null, 'POST')
        return res.data.services
    } catch (e) {
        throw new Error(e)
    }
}
