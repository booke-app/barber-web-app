import {Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {
    CheckIcon,
    ChevronUpDownIcon
} from '@heroicons/react/20/solid'
import {
    classNames,
    hoursInDayArrayConstructor,
    minutesInHourArrayConstructor
} from "../../Utilities/utilities";
import dayjs from "dayjs";
import {useSelector} from "react-redux";


export default function CustomTimePicker({
                                             onChange,
                                             givenTime,
                                             noLessThanTime
                                         }) {
    const [hour, setHour] = useState('00')
    const [minutes, setMinutes] = useState('00')
    const hoursInDay = hoursInDayArrayConstructor()
    const minutesInAnHour = minutesInHourArrayConstructor()
    const selectedDate = useSelector(state => state.calendar.selectedDate)
    const selectedYear = useSelector(state => state.calendar.year)
    const selectedDateMonthNumber = useSelector(state => state.calendar.selectedDateMonthNumber)
    const selectedDateDayAsNumber = useSelector(state => state.calendar.selectedDateDayAsNumber)

    useEffect(() => {

        if (givenTime) {
            setHour(dayjs(givenTime).format('HH'))
            setMinutes(dayjs(givenTime).format('mm'))


        }


    }, [givenTime]);


    useEffect(() => {

        if (hour && minutes) {
            const date = dayjs(new Date(selectedYear, selectedDateMonthNumber, selectedDateDayAsNumber, hour, minutes))
            onChange(date?.$d)
        }

    }, [hour, minutes]);

    return (
        <div
            style={{
                fontWeight: 'bold',
                alignItems: "center", width: '35%',
                justifyContent: "center",
                minWidth: '80px',
                textAlign: "center",
                color: "white",
                minHeight: '34px',

            }}
            className={'flex flex-row  bg-indigo-600 rounded p-1'}>
            <Listbox
            >
                {({open}) => (
                    <>

                        <div className="relative ">
                            <Listbox.Button
                                className="relative w-full cursor-default pr-6  text-white bg-transparent py-1.5 pl-3 sm:pr-10 text-left   focus:outline-none sm:text-sm sm:leading-6">
                            <span
                                className="block truncate">{hour}</span>
                                <span
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                    className="h-5 w-5 text-white"
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
                                    className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {hoursInDay.map((hourFromArr) => (
                                        <Listbox.Option
                                            disabled={noLessThanTime ? parseInt(hourFromArr) < parseInt(dayjs(noLessThanTime).format("HH")) : false}
                                            onClick={() => setHour(hourFromArr)}
                                            key={hourFromArr}
                                            className={({active}) =>
                                                classNames(
                                                    hourFromArr === hour ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                )
                                            }
                                            value={hourFromArr}
                                        >
                                            {({
                                                  selected,
                                                  active
                                              }) => (
                                                <>
                        <span
                            className={classNames(hourFromArr === hour ? 'font-semibold' : 'font-normal', 'block')}>
                          {hourFromArr}
                        </span>
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
            <span
                className={'text-white semi-bold'}>:</span>
            <Listbox>
                {({open}) => (
                    <>

                        <div className="relative ">
                            <Listbox.Button
                                className="relative w-full cursor-default pr-6  text-white bg-transparent py-1.5 pl-3  text-left  sm:pr-10 focus:outline-none sm:text-sm sm:leading-6">
                            <span
                                className="block truncate">{minutes}</span>
                                <span
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                    className="h-5 w-5 text-white"
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

                                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {minutesInAnHour.map((minutesFromArr) => (
                                        <Listbox.Option
                                            disabled={noLessThanTime ? (parseInt(hour) < parseInt(dayjs(noLessThanTime).format("HH")) || ((parseInt(hour) === parseInt(dayjs(noLessThanTime).format("HH")) &&
                                                (parseInt(minutesFromArr) <= parseInt(dayjs(noLessThanTime).format("mm")))))) : false}
                                            onClick={() => setMinutes(minutesFromArr)}
                                            key={minutesFromArr}
                                            className={({active}) =>
                                                classNames(
                                                    minutesFromArr === minutes ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                )
                                            }
                                            value={minutesFromArr}
                                        >
                                            {({
                                                  selected,
                                                  active
                                              }) => (
                                                <>
                        <span
                            className={classNames(minutesFromArr === minutes ? 'font-semibold' : 'font-normal', 'block')}>
                          {minutesFromArr}
                        </span>
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );

}
