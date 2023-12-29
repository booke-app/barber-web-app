import {useDispatch, useSelector} from "react-redux";
import WorkerSlot
    from "../../Components/WorkerSlot/WorkerSlot";
import styles from "./styles";
import {AddOutlined} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {Box, Modal} from "@mui/material";
import AddWorker
    from "../../Components/AddWorker/AddWorker";
import {removeWorker} from "./actions";
import {
    setUpdatedWorkers
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";
import SimpleAlertWithActions
    from "../../Components/SimpleAlertWithActions/SimpleAlertWithActions";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import EditWorker
    from "../../Components/EditWorker/EditWorker";


export default function WorkersPage() {
    const workers = useSelector(state => state.authorizeUser.shop.workers)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isAddWorkerShown, setIsAddWorkerShown] = useState(false)
    const dispatch = useDispatch()
    const [workerToBeDeleted, setWorkerToBeDeleted] = useState(null)
    const [workerToBeEdited, setWorkerToBeEdited] = useState(null)
    const deleteWorker = async () => {
        try {
            const res = await removeWorker(workerToBeDeleted)
            dispatch(setUpdatedWorkers(res))

            dispatch(setModalContent({
                message: 'Worker was removed',
                status: 200
            }))

        } catch (e) {
            console.log(e)
            dispatch(setModalContent({
                message: 'Worker was not removed',
                status: 500
            }))

        }
    }

    useEffect(() => {
        if (workerToBeDeleted) {
            setIsModalVisible(true)
        }
        if (!workerToBeDeleted) {
            setIsModalVisible(false)
        }

    }, [workerToBeDeleted]);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <SimpleAlertWithActions open={isModalVisible}
                                    setOpen={setIsModalVisible}
                                    title={'Remove worker'}
                                    message={'Are you sure you want to delete this worker? This action cannot be undone.'}
                                    onAccept={() => {
                                        deleteWorker()
                                        setWorkerToBeDeleted(null)
                                    }}
                                    onCancel={() => setWorkerToBeDeleted(null)}/>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Workers</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the workers in your
                        shop including their name, title,
                        email and role.
                    </p>
                </div>
                {!isAddWorkerShown && <div
                    className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                            setIsAddWorkerShown(true)
                        }}
                    >
                        Add worker
                    </button>
                </div>}
            </div>
            {isAddWorkerShown &&
                <AddWorker onCancel={() => {
                    setIsAddWorkerShown(false)
                }}/>}
            {workerToBeEdited &&
                <EditWorker
                    workerToBeEdited={workerToBeEdited}
                    onCancel={() => {
                        setWorkerToBeEdited(null)
                    }}/>}

            <div className="mt-8 flow-root">
                <div
                    className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                        className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table
                            className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                </th>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                    Name
                                </th>

                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Email
                                </th>

                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                    Title
                                </th>

                                <th scope="col"
                                    className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                    <span
                                        className="sr-only ">Delete</span>
                                </th>
                                <th scope="col"
                                    className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                    <span
                                        className="sr-only ">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            {workers?.map((worker, index) => (
                                <tr key={worker.email}
                                    className="even:bg-gray-50">
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                        {!worker?.profilePicUrl ?
                                            <UserCircleIcon
                                                className="h-8 w-8 text-gray-300"
                                                aria-hidden="true"/> :
                                            <img
                                                style={{
                                                    objectFit: 'cover'
                                                }}
                                                className="h-8 w-8 rounded-full bg-indigo-700"
                                                src={worker?.profilePicUrl}
                                                alt=""
                                            />}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                        {worker.firstName + " " + worker.lastName}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{worker.email}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{worker.title ? worker.title : '-'}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                        <a onClick={() => {
                                            setWorkerToBeDeleted(worker)
                                        }}
                                           className="cursor-pointer text-red-600 hover:text-indigo-900">
                                            Delete<span
                                            className="sr-only">, {worker.name}</span>
                                        </a>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                        <a onClick={() => {
                                            setWorkerToBeEdited(worker)
                                        }}
                                           className="cursor-pointer text-indigo-600 hover:text-indigo-900">
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}



