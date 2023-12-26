import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {
    setUpdatedServices,
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";
import SimpleAlertWithActions
    from "../../Components/SimpleAlertWithActions/SimpleAlertWithActions";
import {
    deleteService
} from "./actions";

import AddService
    from "../../Components/AddService/AddService";


export default function ServicesPage() {
    const services = useSelector(state => state.authorizeUser.shop.services)
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isAddServiceShown, setIsAddServiceShown] = useState(false)
    const dispatch = useDispatch()
    const [serviceToBeDeleted, setServiceToBeDeleted] = useState(null)
    const removeService = async () => {
        try {
            const res = await deleteService({
                shopId,
                serviceId: serviceToBeDeleted._id
            })
            if (res) {
                console.log(res, 'res@ServicesPage@Delete')
                dispatch(setUpdatedServices(res))
                dispatch(setModalContent({
                    message: 'Service was deleted successfully',
                    status: 200
                }))

            }
        } catch (e) {
            dispatch(setModalContent({
                message: 'Service was not deleted successfully',
                status: 500
            }))

        }

    }

    useEffect(() => {
        if (serviceToBeDeleted) {
            setIsModalVisible(true)
        }
        if (!serviceToBeDeleted) {
            setIsModalVisible(false)
        }

    }, [serviceToBeDeleted]);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <SimpleAlertWithActions open={isModalVisible}
                                    setOpen={setIsModalVisible}
                                    title={'Remove service'}
                                    message={'Are you sure you want to delete this service? This action cannot be undone.'}
                                    onAccept={() => {
                                        removeService()
                                        setServiceToBeDeleted(null)
                                    }}
                                    onCancel={() => setServiceToBeDeleted(null)}/>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Services</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the services in your
                        shop including their name, price,
                        and duration.
                    </p>
                </div>
                {!isAddServiceShown && <div
                    className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                            setIsAddServiceShown(true)
                        }}
                    >
                        Add service
                    </button>
                </div>}
            </div>
            {isAddServiceShown &&
                <AddService onCancel={() => {
                    setIsAddServiceShown(false)
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
                                    Price
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Duration
                                </th>

                                <th scope="col"
                                    className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                    <span
                                        className="sr-only ">Delete</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            {services?.map((service, index) => (
                                <tr key={service.name}
                                    className="even:bg-gray-50">
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                        {service.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{service.price}€</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{service.duration}min.</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                        <a onClick={() => {
                                            setServiceToBeDeleted(service)
                                        }}
                                           className="cursor-pointer text-red-600 hover:text-indigo-900">
                                            Delete<span
                                            className="sr-only">, {service.price}</span>
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
    );
}



