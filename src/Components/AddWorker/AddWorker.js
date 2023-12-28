import {useState} from "react";
import {validateEmail} from "../../Utilities/validateEmail";
import {validatePhone} from "../../Utilities/validatePhone";
import {addWorker} from "./actions";
import {useDispatch} from "react-redux";
import {
    setUpdatedWorkers
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";
import UploadWorkerProfileImage
    from "../UploadWorkerProfileImage/UploadWorkerProfileImage";

export default function AddWorker({onCancel}) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [imageBase64, setImageBase64] = useState('')
    const dispatch = useDispatch()
    const createWorker = async () => {
        try {
            const response = await addWorker({
                firstName,
                lastName,
                email,
                phone,
                password,
                profilePicBase64: imageBase64,
                title,
            })
            dispatch(setUpdatedWorkers(response))
            dispatch(setModalContent({
                message: 'Worker was added successfully',
                status: 200
            }))

        } catch (e) {
            dispatch(setModalContent({
                message: 'Worker was not added',
                status: 500
            }))
        } finally {
            onCancel()
        }

    }

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
                            <label htmlFor="phone"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                            </label>
                            <div className="mt-2">
                                <input
                                    value={phone}
                                    required={true}
                                    onChange={(e) => {
                                        setPhone(e.target.value)
                                    }}
                                    type="phone"
                                    name="phone"
                                    id="phone"
                                    pattern={'/^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/im'}
                                    autoComplete="family-name"
                                    className="peer block  pl-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <span
                                    className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                     Please enter a valid phone number ( ex. 6912345678 )
                                </span>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="password"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    required={true}
                                    //Minimum eight characters, at least one letter and one number:
                                    pattern={"^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"}
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="password"
                                    className="peer block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <span
                                    className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                     Please enter a valid password. Minimum eight characters, at least one letter, one number and one special character
                                </span>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    value={email}
                                    required={true}
                                    pattern={'^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="peer block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <span
                                    className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                     Please enter a valid email (ex. best@bookingapp.com)
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
                                    //Minimum eight characters, at least one letter and one number:
                                    pattern={`^[a-zA-Z]+$`}
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
                    disabled={(!validateEmail(email) || !email || !phone || !validatePhone(phone) || !firstName || !lastName || !password.match('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'))}
                    onClick={() => createWorker()}
                    className={"rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline disabled:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                >
                    Save
                </button>
            </div>
        </div>
    )
}







