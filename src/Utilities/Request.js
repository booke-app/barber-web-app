import {apiUrl} from '../constants'
import {isJwtTokenValid} from "./isJwtTokenValid";
import {
    logout
} from "../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent,
    toggleVisibilityOfModal
} from "../Features/modal/modal-slice";

export const request = async (url, payload, headers, typeOfRequest) => {
    let typeOfRequestBeUsed
    let headersToBeUsed
    let accessToken = JSON?.parse(localStorage.getItem('accessToken'))


    if (!typeOfRequest) {
        typeOfRequestBeUsed = 'GET'
    } else {
        typeOfRequestBeUsed = typeOfRequest
    }

    if (!headers && !accessToken) {
        headersToBeUsed = {
            "Content-Type": "application/json",
        }
    }
    if (!headers && accessToken) {
        headersToBeUsed = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    }
    if (headers && accessToken) {
        headersToBeUsed = {
            ...headers,
            "Authorization": `Bearer ${accessToken}`

        }
    }
    console.log(`url:${apiUrl}${url},
    headers:`, headersToBeUsed,
        `body:`, payload,
    )
    try {
        const response = await fetch(`${apiUrl}${url}`, {
            method: typeOfRequestBeUsed,
            headers: headersToBeUsed,
            body: payload ? JSON.stringify(payload) : null
        })
        if (!response.ok) {
            const err = new Error(response.statusText)
            err.code = `${response.status}`
            throw err
        }
        return response.json()

    } catch (e) {
        throw e

    }


}
