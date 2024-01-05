import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    setUpdateCategoriesWithItsServices
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";
import SelectSex from "../SelectSex/SelectSex";
import WorkersToManageAServiceSelector
    from "../WorkersToManageAServiceSelector/WorkersToManageAServiceSelector";
import CategoryOfTheServiceSelector
    from "../CategoryOfTheServiceSelector/CategoryOfTheServiceSelector";
import {
    doTwoArraysContainTheSameValues
} from "../../Utilities/utilities";
import {editService} from "./actions";


const EditService = ({
                         selectedServiceToBeEdited,
                         onCancel
                     }) => {
    const [serviceName, setServiceName] = useState('')
    const [duration, setDuration] = useState(0)
    const [servicePrice, setServicePrice] = useState(0)

    const [selectedSex, setSelectedSex] = useState({
        id: 1,
        name: 'Both'
    })
    const [selectedServiceCategory, setSelectedServiceCategory] = useState({})
    const workers = useSelector(state => state.authorizeUser?.shop?.workers)
    const [selectedWorkers, setSelectedWorkers] = useState([{...workers?.[0]}])
    const [idsOfSelectedWorkers, setIdsOfSelectedWorkers] = useState([])
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    const dispatch = useDispatch()


    useEffect(() => {
        let arr = []

        selectedWorkers?.map(worker => {
            arr.push(worker._id)
        })
        setIdsOfSelectedWorkers(arr)
    }, [selectedWorkers]);


    useEffect(() => {
        console.log(selectedServiceToBeEdited, 'serviceToBeedited')

        setServiceName(selectedServiceToBeEdited.name)
        setDuration(selectedServiceToBeEdited.duration)
        setServicePrice(selectedServiceToBeEdited.price)
        setSelectedServiceCategory({
            _id: selectedServiceToBeEdited.categoryId,
            categoryName: selectedServiceToBeEdited.categoryName
        })


        if (selectedServiceToBeEdited.idsOfWorkersWhoCanHandleTheService.length > 0) {
            let arr = []
            workers?.map(worker => {
                selectedServiceToBeEdited?.idsOfWorkersWhoCanHandleTheService.map(idOfWorker => {
                    if (idOfWorker === worker._id) {

                        arr.push({...worker})
                    }
                })

            })


            setSelectedWorkers(arr)
        }


    }, [selectedServiceToBeEdited]);


    const editServ = async () => {
        console.log(selectedServiceCategory)
        try {
            const response = await editService({
                shopId,
                categoryId: selectedServiceCategory._id,
                service: {
                    _id: selectedServiceToBeEdited._id,
                    name: serviceName,
                    duration: parseInt(duration),
                    price: servicePrice,
                    sex: selectedSex.name,
                    idsOfWorkersWhoCanHandleTheService: idsOfSelectedWorkers,
                }
            })
            if (response.length > 0) {
                dispatch(setUpdateCategoriesWithItsServices(response));
                dispatch(setModalContent({
                    message: 'Service was edited successfully',
                    status: 200
                }))

            }
        } catch (e) {
            dispatch(setModalContent({
                message: 'Service was not edited ',
                status: 500
            }))
        }

    }
    console.log(selectedServiceToBeEdited)
    console.log(selectedServiceCategory, 'category')
    console.log((serviceName === selectedServiceToBeEdited.name && servicePrice === selectedServiceToBeEdited.price && selectedServiceCategory.name === selectedServiceToBeEdited.categoryName &&
        duration === selectedServiceToBeEdited.duration && idsOfSelectedWorkers === selectedServiceToBeEdited.idsOfWorkersWhoCanHandleTheService), 'disabled')
    return (
        <form method="post"
              noValidate
              onSubmit={() => false}>
            <div className="mt-14 space-y-12">

                <div
                    className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900"> New
                        Service Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Add
                        information about the new
                        service</p>

                    <div
                        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input onChange={(e) => {
                                    setServiceName(e.target.value)
                                }}
                                       value={serviceName}
                                       type="text"
                                       required={true}
                                       name="first-name"
                                       id="first-name"
                                       autoComplete="given-name"
                                       className="peer block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                />
                                <span
                                    className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                     Please enter a valid service name
                                </span>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="duration"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Duration (min.)
                            </label>
                            <div className="mt-2">
                                <input
                                    value={duration}

                                    onChange={(e) => {
                                        setDuration(parseInt(e.target.value))
                                    }}
                                    pattern={` ^[1-9][0-9]*$`}
                                    type="number"
                                    required={true}
                                    name="duration"
                                    id="duration"
                                    className="peer block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <span
                                    className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                     Please enter a valid duration
                                </span>
                            </div>

                        </div>
                        <div className={'sm:col-span-3'}>
                            <label htmlFor="price"
                                   className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                            <div
                                className="relative mt-2 ">
                                <div
                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span
                                        className="text-gray-500 sm:text-sm">€</span>
                                </div>
                                <input type="number"
                                       onChange={(e) => {
                                           setServicePrice(parseInt(e.target.value))
                                       }}
                                       pattern={` ^[1-9][0-9]*$`}
                                       name="price"
                                       required={true}
                                       value={servicePrice}
                                       id="price"
                                       className="block peer w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <div
                                    className="absolute inset-y-0 h-full right-0 flex items-center">
                                    <span id="currency"
                                          className="h-full flex items-center rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                                        EUR
                                    </span>
                                </div>
                            </div>

                        </div>
                        <div className="sm:col-span-3">

                            <SelectSex
                                selectedSex={selectedSex}
                                setSelectedSex={setSelectedSex}/>

                        </div>
                        <div className="sm:col-span-3">

                            <WorkersToManageAServiceSelector
                                selectedWorkers={selectedWorkers}
                                setSelectedWorkers={setSelectedWorkers}
                            />

                        </div>
                        <div className="sm:col-span-3">

                            <CategoryOfTheServiceSelector
                                selectedServiceCategory={selectedServiceCategory}
                                setSelectedServiceCategory={setSelectedServiceCategory}
                            />

                        </div>
                    </div>
                </div>

            </div>

            <div
                className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={() => {
                    setServiceName(null)
                    setServicePrice(0)
                    setDuration(0)
                    setIdsOfSelectedWorkers(null)
                    setSelectedSex(null)
                    setSelectedWorkers(null)
                    onCancel()
                }} type="button"
                        className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="button"
                    disabled={(serviceName.length === 0 || duration <= 0 || servicePrice <= 0 || selectedWorkers.length <= 0 || !selectedServiceCategory) ||
                        (serviceName === selectedServiceToBeEdited.name && servicePrice === selectedServiceToBeEdited.price && selectedServiceCategory.categoryName === selectedServiceToBeEdited.categoryName &&
                            duration === selectedServiceToBeEdited.duration && doTwoArraysContainTheSameValues(idsOfSelectedWorkers, selectedServiceToBeEdited.idsOfWorkersWhoCanHandleTheService)
                        )}
                    onClick={() => {
                        editServ()
                        setServiceName(null)
                        setServicePrice(0)
                        setDuration(0)
                        setIdsOfSelectedWorkers(null)
                        setSelectedSex(null)
                        setSelectedWorkers(null)
                        onCancel()
                    }}
                    className={"rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline disabled:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                >
                    Save
                </button>
            </div>
        </form>
    )

}


export default EditService
