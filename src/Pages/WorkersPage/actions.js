import {deleteWorker} from "../../Components/WorkerSlot/actions";


export const removeWorker = async (worker) => {

    try {
        const res = await deleteWorker({workerId: worker._id})
        if (res?.length > 0) {
            return res


        }
    } catch (e) {
        throw new Error(e)
    }

}
