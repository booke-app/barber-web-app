import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {classNames} from "../../Utilities/utilities";
import {useDispatch, useSelector} from "react-redux";
import {
    logout
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    ArrowRightEndOnRectangleIcon
} from "@heroicons/react/16/solid";
import GoogleLogoutButton
    from "../GoogleLogoutButton/GoogleLogoutButton";

const MobileNavigationSideBar = ({
                                     urls,
                                     sidebarOpen,
                                     setSidebarOpen
                                 }) => {
    const dispatch = useDispatch()
    const isUserLoggedInUsingOAuth2 = useSelector(state => state.authorizeUser.isUserLoggedInUsingOAuth2)
    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div"
                    className="relative z-50 lg:hidden"
                    onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-gray-900/80"/>
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel
                            className="relative mr-16 flex w-full max-w-xs flex-1">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div
                                    className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button"
                                            className="-m-2.5 p-2.5"
                                            onClick={() => setSidebarOpen(false)}>
                                        <span
                                            className="sr-only">Close sidebar</span>
                                        <XMarkIcon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"/>
                                    </button>
                                </div>
                            </Transition.Child>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div
                                className="flex grow pt-14 flex-col gap-y-5 overflow-y-auto bg-indigo-600  px-6 pb-2">

                                <nav
                                    className="flex flex-1 flex-col">
                                    <ul role="list"
                                        className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list"
                                                className="-mx-2 space-y-1">
                                                {urls.map((url, index) => (

                                                    <Link
                                                        key={index}
                                                        id={url.path}
                                                        onClick={() => setSidebarOpen(false)}
                                                        to={url.path}>
                                                        <span
                                                            className={classNames(
                                                                window.location.pathname === url.path
                                                                    ? 'bg-indigo-700 text-white'
                                                                    : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                            )}
                                                        >
                                                            <url.icon
                                                                className={classNames(
                                                                    window.location.pathname === url.path
                                                                        ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                                                    'h-6 w-6 shrink-0'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                            {url.name}
                                                        </span>
                                                    </Link>
                                                ))}
                                                {!isUserLoggedInUsingOAuth2 ?
                                                    <li
                                                        onClick={() => {
                                                            dispatch(logout())
                                                        }}
                                                        className={classNames(
                                                            'cursor-pointer text-indigo-200 hover:text-white hover:bg-indigo-700',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                        )}
                                                    >
                                                        <ArrowRightEndOnRectangleIcon
                                                            className={classNames(
                                                                'text-indigo-200 group-hover:text-white',
                                                                'h-6 w-6 shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        Logout
                                                    </li>
                                                    :
                                                    <GoogleLogoutButton/>}


                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default MobileNavigationSideBar
