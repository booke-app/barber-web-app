import {request} from "../../Utilities/Request";

export const addCategory = async (payload) => {
    try {
        const res = await request('/create-category', payload, null, 'POST')
        return res.data.categoriesWithItsServices
    } catch (e) {
        throw new Error(e)
    }
}
