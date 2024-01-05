import {Menu, Transition} from '@headlessui/react'
import {DateCalendar} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
    setSelectedDate
} from "../../Features/calendar/calendar-slice";
import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

export function CalendarDropDown() {
    const dispatch = useDispatch()
    const selectedDate = useSelector(state => state.calendar.selectedDate)
    return (
        <div style={{
            alignItems: "center"
        }} className="h-full w-full md:w-auto">
            <Menu as="div"
                  style={{
                      alignItems: "center"
                  }}
                  className=" h-full flex justify-center text-left">
                <div>
                    <Menu.Button

                        className="   inline-flex w-full justify-center rounded-md   text-sm font-medium  ">
                        {dayjs(Date.now()).isSame(selectedDate, 'd') && 'Today'}
                        {dayjs(Date.now()).add(1, 'd').isSame(selectedDate, 'd') && 'Tomorrow'}
                        {dayjs(Date.now()).subtract(1, 'd').isSame(selectedDate, 'd') && 'Yesterday'}
                        {!(dayjs(Date.now()).isSame(selectedDate, 'd')) && !(dayjs(Date.now()).add(1, 'd').isSame(selectedDate, 'd')) && !(dayjs(Date.now()).subtract(1, 'd').isSame(selectedDate, 'd')
                        ) && dayjs(selectedDate).format('DD-MM')}
                        <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
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
                        className="absolute  top-0 right-0 mt-10  origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <DateCalendar
                                        slotProps={{
                                            textField: {
                                                size: "x-small",
                                                error: false,
                                            },
                                        }}

                                        format="DD-MM-YYYY"
                                        defaultValue={dayjs(Date.now())}
                                        value={dayjs(selectedDate)}
                                        onChange={
                                            (e) => {
                                                dispatch(setSelectedDate({...e}))
                                            }
                                        }
                                        sx={{
                                            '& .MuiOutlinedInput-root': {

                                                '& fieldset': {
                                                    padding: 0,
                                                    borderColor: 'transparent',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'transparent',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'transparent',
                                                }
                                            },
                                        }}
                                    />
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
