import {request} from "../../Utilities/Request";

export const deleteService = async (payload) => {
    try {
        const res = await request('/service', payload, null, "DELETE")
        console.log(res, 'deleteApp')
        return res.data.categoriesWithItsServices

    } catch (e) {
        throw new Error(e)
    }


}
