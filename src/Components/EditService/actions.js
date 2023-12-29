import {request} from "../../Utilities/Request";

export const editService = async (payload) => {
    try {
        const res = await request('/edit-service', payload, null, 'POST')
        return res.data.categoriesWithItsServices
    } catch (e) {
        throw new Error(e)
    }
}
