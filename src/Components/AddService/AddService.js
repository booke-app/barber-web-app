import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {addService} from "./actions";
import {
    setUpdatedServices
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";


const AddService = ({onCancel}) => {
    const [serviceName, setServiceName] = useState('')
    const [duration, setDuration] = useState(0)
    const [servicePrice, setServicePrice] = useState(0)
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    const dispatch = useDispatch()
    const createService = async () => {
        try {
            const response = await addService({
                shopId,
                service: {
                    name: serviceName,
                    duration: parseInt(duration),
                    price: servicePrice
                }
            })
            if (response.length > 0) {
                dispatch(setUpdatedServices(response));
                dispatch(setModalContent({
                    message: 'Service was added successfully',
                    status: 200
                }))

            }
        } catch (e) {
            dispatch(setModalContent({
                message: 'Service was not added ',
                status: 500
            }))
        }

    }
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
                                        setDuration(e.target.value)
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
                        <div className="sm:col-span-3">
                            <label htmlFor="price"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Price (€)
                            </label>
                            <div className="mt-2">
                                <input
                                    value={servicePrice}

                                    onChange={(e) => {
                                        setServicePrice(e.target.value)
                                    }}
                                    type="number"
                                    required={true}
                                    name="price"
                                    pattern={` ^[1-9][0-9]*$`}

                                    id="price"
                                    className="peer block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <span
                                    className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                     Please enter a valid price
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div
                className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={onCancel} type="button"
                        className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="button"
                    disabled={serviceName.length === 0 || duration <= 0 || servicePrice <= 0}
                    onClick={() => {
                        createService()
                        setServiceName(null)
                        setServicePrice(0)
                        setDuration(0)
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


export default AddService
