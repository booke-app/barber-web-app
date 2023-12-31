import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {
    setUpdateCategoriesWithItsServices,
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";
import SimpleAlertWithActions
    from "../../Components/SimpleAlertWithActions/SimpleAlertWithActions";
import {
    deleteCategory,
    deleteService
} from "./actions";

import AddService
    from "../../Components/AddService/AddService";
import addServiceOrCategorySelector
    from "../../Components/AddServiceOrCategorySelector/AddServiceOrCategorySelector";
import AddServiceOrCategorySelector
    from "../../Components/AddServiceOrCategorySelector/AddServiceOrCategorySelector";
import AddServiceCategory
    from "../../Components/AddServiceCategory/AddServiceCategory";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import {Tooltip} from "@mui/material";
import EditService
    from "../../Components/EditService/EditService";
import ServiceCard
    from "../../Components/ServiceCard/ServiceCard";


export default function ServicesPage() {
    const categoriesWithItsServices = useSelector(state => state.authorizeUser.shop?.categoriesWithItsServices)
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isAddServiceShown, setIsAddServiceShown] = useState(false)
    const [isAddCategoryShown, setIsAddCategoryShown] = useState(false)
    const dispatch = useDispatch()
    const [serviceToBeDeleted, setServiceToBeDeleted] = useState(null)
    const [serviceToBeEdited, setServiceToBeEdited] = useState(null)
    const [categoryToBeDeleted, setCategoryToBeDeleted] = useState(null)
    const workers = useSelector(state => state.authorizeUser.shop.workers)
    const removeService = async () => {
        try {
            const res = await deleteService({
                shopId,
                serviceId: serviceToBeDeleted._id,
                categoryId: serviceToBeDeleted.categoryId
            })
            if (res) {
                console.log(res, 'res@ServicesPage@Delete')
                dispatch(setUpdateCategoriesWithItsServices(res))
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
    const removeCategory = async () => {
        try {
            const res = await deleteCategory({
                shopId,
                categoryId: categoryToBeDeleted._id
            })
            if (res) {
                dispatch(setUpdateCategoriesWithItsServices(res))
                dispatch(setModalContent({
                    message: 'Category was deleted successfully',
                    status: 200
                }))

            }
        } catch (e) {
            dispatch(setModalContent({
                message: 'Caegory was not deleted successfully',
                status: 500
            }))

        }

    }

    useEffect(() => {
        if (serviceToBeDeleted || categoryToBeDeleted) {
            setIsModalVisible(true)
        }
        if (!serviceToBeDeleted && !categoryToBeDeleted) {
            setIsModalVisible(false)
        }

    }, [serviceToBeDeleted, categoryToBeDeleted]);


    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <SimpleAlertWithActions open={isModalVisible}
                                    setOpen={setIsModalVisible}
                                    title={`Remove ${serviceToBeDeleted ? 'service' : 'category'}`}
                                    message={`Are you sure you want to delete this ${serviceToBeDeleted ? 'service' : 'category'}? This action cannot be undone.`}
                                    onAccept={() => {
                                        if (serviceToBeDeleted) {
                                            removeService()
                                            setServiceToBeDeleted(null)

                                        }
                                        if (categoryToBeDeleted) {
                                            removeCategory()
                                            setCategoryToBeDeleted(null)
                                        }
                                    }}
                                    onCancel={() => {
                                        setServiceToBeDeleted(null)
                                        setCategoryToBeDeleted(null)
                                    }}/>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Services</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the services in your
                        shop including their name, price,
                        and duration.
                    </p>
                </div>
                {(!isAddServiceShown && !isAddCategoryShown) &&
                    <div
                        className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <AddServiceOrCategorySelector
                            setIsAddCategoryShown={setIsAddCategoryShown}
                            setIsAddServiceShown={setIsAddServiceShown}/>
                    </div>}
            </div>
            {isAddServiceShown &&
                <AddService onCancel={() => {
                    setIsAddServiceShown(false)
                }}/>}
            {serviceToBeEdited &&
                <EditService
                    selectedServiceToBeEdited={serviceToBeEdited}
                    onCancel={() => {
                        setServiceToBeEdited(null)
                    }}/>}
            {isAddCategoryShown &&
                <AddServiceCategory onCancel={() => {
                    setIsAddCategoryShown(false)
                }}/>}

            <div className="mt-8 flow-root">
                <div
                    className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                        className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 ">


                        {categoriesWithItsServices?.map(category =>
                            < div
                                className={'rounded-lg mt-10 px-6 py-10 border border-dashed border-gray-900/25'}>
                                <div
                                    className={'flex justify-between'}>
                                    <p className={'text-base font-semibold leading-6  text-gray-900 pl-2 pr-3'}>{category.categoryName}</p>
                                    <a onClick={() => {
                                        setCategoryToBeDeleted(category)
                                    }}
                                       className="cursor-pointer text-red-600 hover:text-indigo-900">
                                        Delete
                                    </a>
                                </div>
                                <table
                                    className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-3">
                                            Name
                                        </th>

                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                                            Price
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                                            Duration
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                                            Sex
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                                            Workers
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
                                    <tbody
                                        className="bg-white">
                                    {category.services.map((service, index) => (

                                        (

                                            <tr key={service._id}
                                                className="even:bg-gray-50">
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                    {service.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{service.price}€</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{service.duration}min.</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{service.sex ? service.sex : '-'}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm flex text-gray-500">{service.idsOfWorkersWhoCanHandleTheService ? service.idsOfWorkersWhoCanHandleTheService?.map(workerIdFromService =>
                                                    !workers?.filter(workerFromShop => workerFromShop._id === workerIdFromService)[0]?.profilePicUrl
                                                        ?
                                                        <Tooltip
                                                            title={workers?.filter(workerFromShop => workerFromShop._id === workerIdFromService)[0]?.firstName + ' '
                                                                + workers?.filter(workerFromShop => workerFromShop._id === workerIdFromService)[0]?.lastName}>
                                                            <UserCircleIcon

                                                                className="h-6 w-6 text-gray-300"
                                                                aria-hidden="true"/></Tooltip>
                                                        :
                                                        <Tooltip
                                                            title={workers?.filter(workerFromShop => workerFromShop._id === workerIdFromService)[0]?.firstName + ' '
                                                                + workers?.filter(workerFromShop => workerFromShop._id === workerIdFromService)[0]?.lastName}>
                                                            <img
                                                                style={{
                                                                    objectFit: 'cover'
                                                                }}
                                                                className="h-6 w-6 rounded-full bg-indigo-700"
                                                                src={workers?.filter(workerFromShop => workerFromShop._id === workerIdFromService)[0]?.profilePicUrl}
                                                                alt=""
                                                            /></Tooltip>
                                                ) : '-'}</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                    <a onClick={() => {
                                                        setServiceToBeDeleted({
                                                            ...service,
                                                            categoryId: category._id
                                                        })
                                                    }}
                                                       className="cursor-pointer text-red-600 hover:text-indigo-900">
                                                        Delete
                                                    </a>
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                    <a onClick={() => {
                                                        setServiceToBeEdited({
                                                            ...service,
                                                            categoryId: category._id,
                                                            categoryName: category.categoryName
                                                        })
                                                    }}
                                                       className="cursor-pointer text-indigo-600 hover:text-indigo-900">
                                                        Edit
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    ))} </tbody>
                                </table>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
}



