import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {Fragment, useEffect, useState} from "react";
import {classNames} from "../../Utilities/utilities";
import {useDispatch, useSelector} from "react-redux";
import {
    setFirstViewWorker,
    setSecondViewWorker, setThirdViewWorker,
} from "../../Features/typeOfView/typeOfView-slice";

export default function WorkerSelectorInsideMultipleWorkersCalendar(
    {
        indexOfWorker,
        indexOfDay
    }) {
    const workersFromShop = useSelector(state => state.authorizeUser.shop.workers)
    const dispatch = useDispatch()
    const numberOfMultipleWorkersShown = useSelector(state => state.typeOfView.numberOfMultipleWorkersShown)
    const workerSelectedOnFirstView = useSelector(state => state.typeOfView?.firstViewWorker)
    const workerSelectedOnSecondView = useSelector(state => state.typeOfView?.secondViewWorker)
    const workerSelectedOnThirdView = useSelector(state => state.typeOfView?.thirdViewWorker)
    const selectedWorkerForWeekView = useSelector(state => state.typeOfView?.selectedWorkerForWeekView)

    console.log(workersFromShop)
    console.log(indexOfWorker)
    console.log(workerSelectedOnFirstView)
    return (<Menu as="div"

                  className="relative mt-5 mb-5">
            <Menu.Button
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                {indexOfWorker === 0 && workerSelectedOnFirstView?.firstName + " " + workerSelectedOnFirstView?.lastName}
                {indexOfWorker === 1 && workerSelectedOnSecondView?.firstName + " " + workerSelectedOnSecondView?.lastName}
                {indexOfWorker === 2 && workerSelectedOnThirdView?.firstName + " " + workerSelectedOnThirdView?.lastName}
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
                        {workersFromShop?.map((worker, index) =>
                            <Menu.Item>
                                {({active}) => (
                                    <span onClick={() => {

                                        if (indexOfWorker === 0) {
                                            dispatch(setFirstViewWorker(worker))
                                        }
                                        if (indexOfWorker === 1) {
                                            dispatch(setSecondViewWorker(worker))
                                        }
                                        if (indexOfWorker === 2) {
                                            dispatch(setThirdViewWorker(worker))
                                        }


                                    }}
                                          className={classNames(
                                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                              'block px-4 py-2 text-sm'
                                          )}
                                    >
                                        {index === 0 && workerSelectedOnFirstView?.firstName + " " + workerSelectedOnFirstView?.lastName}
                                        {index === 1 && workerSelectedOnSecondView?.firstName + " " + workerSelectedOnSecondView?.lastName}
                                        {index === 2 && workerSelectedOnThirdView?.firstName + " " + workerSelectedOnThirdView?.lastName}
                                    </span>
                                )}
                            </Menu.Item>)
                        }

                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
