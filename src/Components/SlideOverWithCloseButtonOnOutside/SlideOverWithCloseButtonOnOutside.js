import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {useDispatch, useSelector} from "react-redux";
import
{
    setIsAppointmentSlideOverOpen, setSelectedTime
} from "../../Features/appointment/appointment-slice";
import ServicesList from "../ServicesList/ServicesList";
import dayjs from "dayjs";
import {
    setSelectedDate
} from "../../Features/calendar/calendar-slice";
import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {
    SelectAServiceButtonInSlideOver
} from "../SelectAServiceButtonInSlideOver/SelectAServiceButtonInSlideOver";

export default function SlideOverWithCloseButtonOnOutside({
                                                              children,
                                                              open,
                                                              setOpen,
                                                              title
                                                          }) {

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative "
                    onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div
                    className="fixed  inset-0 overflow-hidden">
                    <div
                        className="absolute inset-0 overflow-hidden">
                        <div
                            className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel
                                    className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div
                                            className="absolute left-0  top-20  -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="relative rounded-md   text-gray-900 hover:text-white focus:outline-none "
                                                onClick={() => setOpen(false)}
                                            >
                                                <span
                                                    className="absolute -inset-2.5"/>
                                                <span
                                                    className="text-gray-900 sr-only">Close panel</span>
                                                <XMarkIcon
                                                    className="h-8 rounded-md text-white  w-8"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div
                                        className="flex pt-20 lg:pt-5 h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div
                                            className="px-4 sm:px-6">
                                            <Dialog.Title
                                                className="text-xl font-semibold leading-6 text-gray-900">
                                                {title}
                                            </Dialog.Title>
                                        </div>
                                        <div
                                            className="relative mt-6 flex-1 px-4 sm:px-6">
                                            {children}
                                        </div>
                                    </div>
                                </Dialog.Panel>

                            </Transition.Child>

                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
