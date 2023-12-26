import {request} from "../../Utilities/Request";

export const saveWorkingDaysAndHours = async (shifts) => {
    try {
        const res = await request('/add-shifts', shifts, null, 'POST')
        return res.shifts
    } catch (e) {
        console.log(e)
    }
}
export const getShifts = async (shopId) => {
    try {
        const res = await request('/shifts', shopId, null, 'POST')
        return res.shifts
    } catch (e) {
        console.log(e)
    }
}
