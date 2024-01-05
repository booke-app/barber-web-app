import DaySelector from "../DaySelector/DaySelector";
import RangeOfDays from "../RangeOfDays/RangeOfDays";
import WorkerSelector
    from "../WorkerSelector/WorkerSelector";
import {Menu, Transition} from "@headlessui/react";
import {
    EllipsisHorizontalIcon
} from "@heroicons/react/20/solid";
import {Fragment} from "react";
import {classNames} from "../../Utilities/utilities";
import {useDispatch} from "react-redux";
import {
    setIsAppointmentSlideOverOpen
} from "../../Features/appointment/appointment-slice";
import {
    setSelectedDate
} from "../../Features/calendar/calendar-slice";
import dayjs from "dayjs";
import {
    CalendarDropDown
} from "../CalendarDropdown/CalendarDropDown";


export default function HeaderOfViews() {
    const dispatch = useDispatch()
    return (
        <div className="flex items-center">
            <div
                className="hidden md:ml-4 md:flex md:items-center">
                <RangeOfDays/>
                <WorkerSelector/>
                <DaySelector/>
                <div className="ml-6 h-6 w-px bg-gray-300"/>
                <button
                    onClick={() => {
                        dispatch(setIsAppointmentSlideOverOpen(true))
                    }}
                    type="button"
                    className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add event
                </button>
            </div>
            <Menu as="div"
                  className="relative ml-6 md:hidden">
                <Menu.Button
                    className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                    <span
                        className="sr-only">Open menu</span>
                    <EllipsisHorizontalIcon
                        className="h-5 w-5"
                        aria-hidden="true"/>
                </Menu.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Create event
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <span
                                        onClick={() => {
                                            dispatch(setSelectedDate(dayjs(Date.now())))
                                        }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Go to today
                                    </span>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Day view
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Week view
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Month view
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Year view
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
