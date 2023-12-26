import {Link, useLocation} from "react-router-dom";
import {classNames} from '../../Utilities/utilities'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    logout
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    ArrowRightEndOnRectangleIcon
} from "@heroicons/react/16/solid";
import {UserCircleIcon} from "@heroicons/react/24/solid";

const DesktopNavigationSideBar = ({urls}) => {
    const location = useLocation();
    const {hash, pathname, search} = location;
    const personalInfo = useSelector(state => state.authorizeUser.userData)
    const dispatch = useDispatch()

    return (<div
        className="hidden  lg:fixed  lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div
            className="flex pt-14 grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6">
            <nav className="flex flex-1 flex-col">
                <ul role="list"
                    className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list"
                            className="-mx-2 space-y-1">
                            {urls.map((url, index) => (

                                <Link key={index}
                                      to={url.path}>
                                    <span
                                        className={classNames(
                                            pathname === url.path
                                                ? 'bg-indigo-700 text-white'
                                                : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <url.icon
                                            className={classNames(
                                                pathname === url.path
                                                    ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                                'h-6 w-6 shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {url.name}
                                    </span>
                                </Link>
                            ))}
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
                        </ul>
                    </li>
                    <Link to={'/profile'}
                          className="-mx-6 mt-auto">
                        <span
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-700"
                        >
                            {!personalInfo.profilePhotoUrl ?
                                <UserCircleIcon
                                    className="h-8 w-8 text-gray-300"
                                    aria-hidden="true"/> :
                                <img

                                    className="h-8 w-8 rounded-full bg-indigo-700"
                                    src={personalInfo.profilePhotoUrl}
                                    alt=""
                                />}

                            <span className="sr-only">Your profile</span>
                            <span
                                aria-hidden="true">{personalInfo.firstName} {personalInfo.lastName}</span>
                        </span>
                    </Link>
                </ul>
            </nav>
        </div>
    </div>)
}


export default DesktopNavigationSideBar
