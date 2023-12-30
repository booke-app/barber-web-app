import {useState} from 'react'

import {
    BellIcon,
    CreditCardIcon,
    CubeIcon,
    FingerPrintIcon,
    UserCircleIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {classNames} from "../../Utilities/utilities";
import {Tooltip} from "@mui/material";
import {useSelector} from "react-redux";
import UploadProfileImage
    from "../../Components/UploadProfileImage/UploadProfileImage";

const navigation = [
    {name: 'Home', href: '#'},
    {name: 'Invoices', href: '#'},
    {name: 'Clients', href: '#'},
    {name: 'Expenses', href: '#'},
]
const secondaryNavigation = [
    {
        name: 'Shop',
        icon: UserCircleIcon,
        current: true
    },
    // {
    //     name: 'Security',
    //     href: '#',
    //     icon: FingerPrintIcon,
    //     current: false
    // },
    // {
    //     name: 'Notifications',
    //     href: '#',
    //     icon: BellIcon,
    //     current: false
    // },
    // {
    //     name: 'Plan',
    //     href: '#',
    //     icon: CubeIcon,
    //     current: false
    // },
    // {
    //     name: 'Billing',
    //     href: '#',
    //     icon: CreditCardIcon,
    //     current: false
    // },
]

export default function ProfilePage() {

    const personalInfo = useSelector(state => state.authorizeUser.userData)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [firstNameEditStarted, setFirstNameEditStarted] = useState(false)
    const [lastNameEditStarted, setLastNameEditStarted] = useState(false)


    return (
        <>
            <div
                className="mx-auto max-w-7xl  lg:flex lg:gap-x-16 lg:px-8">
                <aside
                    className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
                    <nav
                        className="flex-none px-4 sm:px-6 lg:px-0">
                        <ul role="list"
                            className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                            {secondaryNavigation.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                'h-6 w-6 shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main
                    className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
                    <div
                        className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div>
                            <UploadProfileImage/>

                            <h2 className="text-base font-semibold leading-7 pt-5 text-gray-900">Profile</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                This information will be
                                displayed publicly so be
                                careful what you share.
                            </p>


                            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                <div
                                    className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">First
                                        name
                                    </dt>
                                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                        {!firstNameEditStarted ?
                                            <div
                                                className="text-gray-900">{personalInfo.firstName}
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
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Last
                                        name
                                    </dt>
                                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                        {!lastNameEditStarted ?
                                            <div
                                                className="text-gray-900">{personalInfo.lastName}
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
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email
                                        address
                                    </dt>
                                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div
                                            className="text-gray-900">{personalInfo.email}
                                        </div>
                                        {/*<button*/}
                                        {/*    type="button"*/}
                                        {/*    className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                                        {/*    Update*/}
                                        {/*</button>*/}
                                    </dd>
                                </div>

                            </dl>
                        </div>
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Language
                                and dates</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Choose what language and
                                date format to use
                                throughout your account.
                            </p>

                            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                <div
                                    className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>
                                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div
                                            className="text-gray-900">English
                                        </div>
                                        <Tooltip
                                            title={'Feature will be added'}>
                                            <span

                                                className="font-semibold text-gray-900 ">
                                                Update
                                            </span>
                                        </Tooltip>
                                    </dd>
                                </div>
                                <div
                                    className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date
                                        format
                                    </dt>
                                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div
                                            className="text-gray-900">DD-MM-YYYY
                                        </div>
                                        <Tooltip
                                            title={'Feature will be added'}>
                                            <span
                                                className="font-semibold text-gray-900 ">
                                                Update
                                            </span>
                                        </Tooltip>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
