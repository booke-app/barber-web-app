import {useDispatch, useSelector} from "react-redux";

import styles from "./styles";
import {AddOutlined} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {Box, Modal} from "@mui/material";
import AddClient
    from "../../Components/AddClient/AddClient";
import {removeClient} from "./actions";
import {
    setUpdatedClients
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";
import SimpleAlertWithActions
    from "../../Components/SimpleAlertWithActions/SimpleAlertWithActions";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import EditClient
    from "../../Components/EditClient/EditClient";


export default function ClientsPage() {
    const clients = useSelector(state => state.authorizeUser?.shop?.clients)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isAddClientShown, setIsAddClientShown] = useState(false)
    const dispatch = useDispatch()
    const [clientToBeDeleted, setClientToBeDeleted] = useState(null)
    const [clientToBeEdited, setClientToBeEdited] = useState(null)
    const deleteClient = async () => {
        try {
            const res = await removeClient({clientId: clientToBeDeleted._id})
            dispatch(setUpdatedClients(res))

            dispatch(setModalContent({
                message: 'Client was removed',
                status: 200
            }))

        } catch (e) {
            console.log(e)
            dispatch(setModalContent({
                message: 'Client was not removed',
                status: 500
            }))

        }
    }

    useEffect(() => {
        if (clientToBeDeleted) {
            setIsModalVisible(true)
        }
        if (!clientToBeDeleted) {
            setIsModalVisible(false)
        }

    }, [clientToBeDeleted]);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <SimpleAlertWithActions open={isModalVisible}
                                    setOpen={setIsModalVisible}
                                    title={'Remove client'}
                                    message={'Are you sure you want to delete this client? This action cannot be undone.'}
                                    onAccept={() => {
                                        deleteClient()
                                        setClientToBeDeleted(null)
                                    }}
                                    onCancel={() => setClientToBeDeleted(null)}/>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Clients</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the clients of your
                        shop including their name, email and
                        phone.
                    </p>
                </div>
                {!isAddClientShown && <div
                    className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                            setIsAddClientShown(true)
                        }}
                    >
                        Add client
                    </button>
                </div>}
            </div>
            {isAddClientShown &&
                <AddClient onCancel={() => {
                    setIsAddClientShown(false)
                }}/>}
            {clientToBeEdited &&
                <EditClient
                    clientToBeEdited={clientToBeEdited}
                    onCancel={() => {
                        setClientToBeEdited(null)
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
                                    Name
                                </th>

                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Email
                                </th>

                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                    Phone
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
                            {clients?.map((client, index) => (
                                <tr key={client.email}
                                    className="even:bg-gray-50">
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                        {client.firstName + " " + client.lastName}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.email ? client.email : '-'}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{client.phone ? client.phone : '-'}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                        <a onClick={() => {
                                            setClientToBeDeleted(client)
                                        }}
                                           className="cursor-pointer text-red-600 hover:text-indigo-900">
                                            Delete
                                        </a>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                        <a onClick={() => {
                                            setClientToBeEdited(client)
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



