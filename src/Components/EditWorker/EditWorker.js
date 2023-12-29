import {useEffect, useState} from "react";
import {edit} from "./actions";
import {useDispatch, useSelector} from "react-redux";
import {
    setUpdatedWorkers
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";
import UploadWorkerProfileImage
    from "../UploadWorkerProfileImage/UploadWorkerProfileImage";

export default function EditWorker({
                                       onCancel,
                                       workerToBeEdited
                                   }) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [title, setTitle] = useState('')
    const [imageBase64, setImageBase64] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const dispatch = useDispatch()
    const shopId = useSelector(state => state.authorizeUser.shop._id)

    const editWorker = async () => {
        try {
            const response = await edit({
                workerId: workerToBeEdited._id,
                shopId: shopId,
                firstName,
                lastName,
                profilePicBase64: imageBase64,
                title,
            })
            console.log(response)
            dispatch(setUpdatedWorkers(response))
            dispatch(setModalContent({
                message: 'Worker was edited successfully',
                status: 200
            }))

        } catch (e) {
            dispatch(setModalContent({
                message: 'Worker was not edited',
                status: 500
            }))
        } finally {
            onCancel()
        }

    }


    useEffect(() => {
        setFirstName(workerToBeEdited.firstName)
        setLastName(workerToBeEdited.lastName)
        setTitle(workerToBeEdited?.title)
        setImageUrl(workerToBeEdited.profilePicUrl)


    }, [workerToBeEdited]);


    return (
        <div>
            <div className="mt-14 space-y-12">

                <div
                    className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900"> New
                        Worker Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Add
                        information about the new worker</p>

                    <div
                        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <UploadWorkerProfileImage
                            imgUrl={imageUrl}
                            imageBase64={imageBase64}
                            setImageBase64={setImageBase64}/>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                                       value={firstName}
                                       type="text"
                                       required={true}
                                       name="first-name"
                                       pattern={`^[a-zA-Z]+$`}
                                       id="first-name"
                                       autoComplete="given-name"
                                       className="peer block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                />
                                <span
                                    className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                     Please enter a valid first name
                                </span>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    value={lastName}

                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                    }}
                                    type="text"
                                    required={true}
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    pattern={`^[a-zA-Z]+$`}
                                    className="peer block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <span
                                    className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                     Please enter a valid last name
                                </span>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="Title"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                    required={true}
                                    value={title}
                                    type="text"
                                    name="text"
                                    id="text"
                                    autoComplete="text"
                                    className="peer block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <span
                                    className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                     Please enter a title
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
                    disabled={(!firstName || !lastName || !title) || (
                        workerToBeEdited.firstName === firstName && workerToBeEdited.lastName === lastName && !imageBase64 && workerToBeEdited.title === title
                    )}
                    onClick={() => editWorker()}
                    className={"rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline disabled:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                >
                    Save
                </button>
            </div>
        </div>
    )
}







