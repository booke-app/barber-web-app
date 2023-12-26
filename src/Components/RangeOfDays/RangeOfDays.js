import {FormControl, MenuItem, Select} from "@mui/material";
import theme from "../../theme";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {Fragment} from "react";
import {classNames} from "../../Utilities/utilities";
import {useDispatch, useSelector} from "react-redux";
import {setTypeOfView} from "../../Features/typeOfView/typeOfView-slice";

const RangeOfDays = () => {
    // const selectedRangeOfDays = useSelector()
    const currentTypeOfView = useSelector(state => state.typeOfView.typeOfView)
    const dispatch = useDispatch()

    const availableViews = [{type: 'weeklyView', name: 'Week view'},
        {type: 'dayView', name: 'Day view'},
        {type: 'twoDayView', name: '2 Day view'},
        {type: 'threeDayView', name: '3 Day view'},
    ]
    return (<Menu as="div" className="relative">
            <Menu.Button
                type="button"
                className="flex mr-4 items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                {availableViews.filter((view) => view.type === currentTypeOfView)?.[0]?.name}
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
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
                        {availableViews.map((view, index) =>
                            <Menu.Item key={index}>
                                {({active}) => (
                                    <span
                                        onClick={() => {
                                            dispatch(setTypeOfView(view.type))
                                        }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        {view.name}
                                    </span>
                                )}
                            </Menu.Item>
                        )}


                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}


export default RangeOfDays
