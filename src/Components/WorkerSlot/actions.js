import {request} from "../../Utilities/Request";

export const deleteWorker = async (payload) => {
    try {
        const res = await request('/worker', payload, null, 'DELETE')
        return res.data
    } catch (e) {
        throw Error(e)
    }
}
