import {request} from "../../Utilities/Request";

export const resetPassword = async (email) => {
    return request('/forgot-password', {email}, null, 'POST')

}
export const registerFunction = async (firstName, email, password, lastName) => {
    let response
    try {
        response = await request('/createUser', {firstName, email, password, lastName,}, null, 'POST')
        console.log(response)
        return response
    } catch (e) {
        return {message: e.message}
    }

}
