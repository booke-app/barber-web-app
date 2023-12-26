import {request} from "../../Utilities/Request";

export const deleteService = async (payload) => {
    try {
        const res = await request('/service', payload, null, "DELETE")
        return res.data.services

    } catch (e) {
        throw new Error(e)
    }


}
