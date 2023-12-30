import {UploadImage} from "../UploadImage/UploadImage";
import {useSelector} from "react-redux";
import {useState} from "react";

const GeneralShopSettings = () => {
    const shop = useSelector(state => state.authorizeUser.shop)

    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [firstNameEditStarted, setFirstNameEditStarted] = useState(false)
    const [lastNameEditStarted, setLastNameEditStarted] = useState(false)
    return (<div>
        <UploadImage/>

        <h2 className="text-base font-semibold leading-7 pt-5 text-gray-900">Shop
            Profile</h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
            This information will be
            displayed publicly so be
            careful what you share.
        </p>


        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div
                className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Shop
                    name
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    {!firstNameEditStarted ?
                        <div
                            className="text-gray-900">{shop.name}
                        </div> : <input
                            value={firstName ? firstName : ''}
                            className="text-gray-900 shadow ring-black-1"
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}/>}
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    disabled={firstNameEditStarted && !firstName}*/}
                    {/*    onClick={() => {*/}
                    {/*        setFirstNameEditStarted(true)*/}
                    {/*    }}*/}
                    {/*    className="font-semibold text-indigo-600 hover:text-indigo-500 disabled:text-gray-500">*/}
                    {/*    Update*/}
                    {/*</button>*/}
                    {firstNameEditStarted &&
                        <button
                            type="button"
                            onClick={() => {
                                setFirstNameEditStarted(false)
                                setFirstName(null)
                            }}
                            className="font-semibold text-red-600 hover:text-indigo-500">
                            Cancel
                        </button>}
                </dd>
            </div>
            <div
                className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Shop
                    phone
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    {!lastNameEditStarted ?
                        <div
                            className="text-gray-900">{shop.phone}
                        </div> : <input
                            value={lastName ? lastName : ''}
                            className="text-gray-900 shadow ring-black-1"
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}/>}
                    {/*<button*/}
                    {/*    disabled={!lastName && lastNameEditStarted}*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => {*/}
                    {/*        setLastNameEditStarted(true)*/}
                    {/*    }}*/}
                    {/*    className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                    {/*    Update*/}
                    {/*</button>*/}
                    {lastNameEditStarted &&
                        <button
                            type="button"
                            onClick={() => {
                                setLastNameEditStarted(false)
                                setLastName(null)
                            }}
                            className="font-semibold text-red-600 hover:text-indigo-500">
                            Cancel
                        </button>}
                </dd>
            </div>
            <div
                className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Shop
                    location
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div
                        className="text-gray-900">{shop?.location?.address + ", " + shop?.location?.city + ', ' + shop?.location?.zipCode}
                    </div>
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                    {/*    Update*/}
                    {/*</button>*/}
                </dd>
            </div>
            <div
                className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Shop
                    id
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div
                        className="text-gray-900">{shop?._id}
                    </div>
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                    {/*    Update*/}
                    {/*</button>*/}
                </dd>
            </div>
            <div className={' pt-6'}>
                <label htmlFor="comment"
                       className="block text-sm font-medium leading-6 text-gray-900">
                    About Us
                </label>
                <div className="mt-2">
        <textarea
            rows={4}
            name="comment"
            id="comment"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={''}
        />
                </div>
            </div>
        </dl>

    </div>)
}


export default GeneralShopSettings
