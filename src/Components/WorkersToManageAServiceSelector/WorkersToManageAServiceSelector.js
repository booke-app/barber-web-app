import {Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {
    CheckIcon,
    ChevronUpDownIcon
} from '@heroicons/react/20/solid'
import {classNames} from "../../Utilities/utilities";
import {useSelector} from "react-redux";
import {UserCircleIcon} from "@heroicons/react/24/solid";


export default function WorkersToManageAServiceSelector({
                                                            selectedWorkers,
                                                            setSelectedWorkers
                                                        }) {
    const workers = useSelector(state => state.authorizeUser?.shop?.workers)


    useEffect(() => {
        console.log(selectedWorkers)
    }, [selectedWorkers]);


    return (
        <Listbox value={null}
                 onChange={null}>
            {({open}) => (
                <>
                    <Listbox.Label
                        className="block text-sm font-medium leading-6 text-gray-900">Workers
                        who can operate </Listbox.Label>
                    <div className="relative mt-2">
                        <Listbox.Button
                            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
              {selectedWorkers?.map(selected =>
                  !selected?.profilePicUrl ?
                      <UserCircleIcon
                          className="h-6 w-6 text-gray-300"
                          aria-hidden="true"/> :
                      <img
                          style={{
                              objectFit: 'cover'
                          }}
                          className="h-5 w-5 rounded-full bg-indigo-700"
                          src={selected?.profilePicUrl}
                          alt=""
                      />
              )}


                  {selectedWorkers?.length === 1 && <span
                      className="ml-3 block truncate">{selectedWorkers?.[0]?.firstName + ' ' + selectedWorkers?.[0]?.lastName}</span>}
                  {selectedWorkers?.length === 0 && <span
                      className="ml-3 block truncate">None Selected</span>}
              </span>
                            <span
                                className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"/>
              </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {workers?.map((worker) => (
                                    <Listbox.Option
                                        key={worker._id}
                                        className={({active}) =>
                                            classNames(
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={worker}
                                        onClick={() => {
                                            if (selectedWorkers?.filter(workerToFilter => workerToFilter._id === worker._id).length > 0) {
                                                setSelectedWorkers(selectedWorkers.filter(workerToFilter => workerToFilter._id !== worker._id))
                                            }
                                            if (!selectedWorkers?.filter(workerToFilter => workerToFilter._id === worker._id).length > 0) {

                                                setSelectedWorkers([...selectedWorkers, {...worker}])
                                            }
                                        }}

                                    >
                                        {({
                                              selected,
                                              active
                                          }) => (
                                            <>
                                                <div
                                                    className="flex items-center">
                                                    {!worker?.profilePicUrl ?
                                                        <UserCircleIcon
                                                            className="h-5 w-5 text-gray-300"
                                                            aria-hidden="true"/> :
                                                        <img
                                                            style={{
                                                                objectFit: 'cover'
                                                            }}
                                                            className="h-5 w-5 rounded-full bg-indigo-700"
                                                            src={worker?.profilePicUrl}
                                                            alt=""
                                                        />}
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                            {worker.firstName + " " + worker.lastName}
                          </span>
                                                </div>

                                                {selectedWorkers?.filter(workerToFilter => workerToFilter._id === worker._id).length > 0 ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                            <CheckIcon className="h-5 w-5"
                                       aria-hidden="true"/>
                          </span>
                                                ) : null}

                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                                <Listbox.Option
                                    key={{
                                        id: 'all',
                                        name: 'all'
                                    }}
                                    className={({active}) =>
                                        classNames(
                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                        )
                                    }
                                    value={{
                                        id: 'all',
                                        name: 'all'
                                    }}
                                    onClick={() => {
                                        if (!(workers.length === selectedWorkers.length)) {
                                            setSelectedWorkers([...workers])
                                        }
                                        if (workers.length === selectedWorkers.length) {
                                            setSelectedWorkers([])
                                        }
                                    }}

                                >
                                    {({
                                          selected,
                                          active
                                      }) => (
                                        <>
                                            <div
                                                className="flex items-center">
                                                All Workers
                                                <span
                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                >
                          </span>
                                            </div>

                                            {workers.length === selectedWorkers.length ? (
                                                <span
                                                    className={classNames(
                                                        active ? 'text-white' : 'text-indigo-600',
                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                    )}
                                                >
                            <CheckIcon className="h-5 w-5"
                                       aria-hidden="true"/>
                          </span>
                                            ) : null}

                                        </>
                                    )}
                                </Listbox.Option>
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
