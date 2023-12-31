import {request} from "../../Utilities/Request";

export const saveAboutUs = async (payload) => {
    try {
        const res = await request('/update-about-us', payload, null, 'POST')
        return res.data
    } catch (e) {
        throw new Error(e)
    }

}
