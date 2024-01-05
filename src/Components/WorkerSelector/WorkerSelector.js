import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {Fragment, useEffect, useState} from "react";
import {classNames} from "../../Utilities/utilities";
import {useDispatch, useSelector} from "react-redux";
import {
    setFirstViewWorker, setNumberOfMultipleWorkersShown,
    setSelectedWorkerForWeekView,
} from "../../Features/typeOfView/typeOfView-slice";

export default function WorkerSelector() {
    const workersFromShop = useSelector(state => state.authorizeUser.shop.workers)
    const dispatch = useDispatch()
    const numberOfMultipleWorkersShown = useSelector(state => state.typeOfView.numberOfMultipleWorkersShown)
    const selectedWorkerForWeekView = useSelector(state => state.typeOfView?.selectedWorkerForWeekView)


    useEffect(() => {
        if (workersFromShop && !selectedWorkerForWeekView) {
            dispatch(setSelectedWorkerForWeekView(workersFromShop?.[0]))
            dispatch(setFirstViewWorker(workersFromShop?.[0]))
        }

    }, [workersFromShop]);

    return (<Menu as="div" className=" mr-4 relative">
            <Menu.Button
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                {!numberOfMultipleWorkersShown ? selectedWorkerForWeekView?.firstName + ' ' + selectedWorkerForWeekView?.lastName :
                    numberOfMultipleWorkersShown === 2 ? 'Show 2 workers' :
                        numberOfMultipleWorkersShown === 3 && 'Show 3 workers'
                }
                <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
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
                    className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {workersFromShop?.map((worker, i) =>
                            <Menu.Item as='div'>
                                {({active}) => (
                                    <span key={i}
                                          onClick={() => {
                                              dispatch(setSelectedWorkerForWeekView(worker))
                                              dispatch(setFirstViewWorker(worker))
                                              dispatch(setNumberOfMultipleWorkersShown(null))
                                          }}
                                          className={classNames(
                                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                              'block px-4 py-2 text-sm'
                                          )}
                                    >
                                        {worker.firstName} {worker.lastName}
                                    </span>
                                )}
                            </Menu.Item>)
                        }
                        {workersFromShop?.length >= 2 &&
                            <Menu.Item as='div'>
                                {({active}) => (
                                    <span onClick={() => {
                                        dispatch(setNumberOfMultipleWorkersShown(2))
                                    }}
                                          className={classNames(
                                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                              'block px-4 py-2 text-sm'
                                          )}
                                    >
                                        Show 2 workers
                                    </span>
                                )}
                            </Menu.Item>}
                        {workersFromShop?.length >= 3 &&
                            <Menu.Item as='div'>
                                {({active}) => (
                                    <span onClick={() => {
                                        dispatch(setNumberOfMultipleWorkersShown(3))

                                    }}
                                          className={classNames(
                                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                              'block px-4 py-2 text-sm'
                                          )}
                                    >
                                        Show 3 workers
                                    </span>
                                )}
                            </Menu.Item>}


                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
