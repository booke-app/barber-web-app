import {useEffect, useState} from 'react'

import {
    BuildingStorefrontIcon,

    CalendarIcon
} from '@heroicons/react/24/outline'
import {classNames} from "../../Utilities/utilities";
import {useSelector} from "react-redux";
import OpenHoursWrapper
    from "../../Components/OpenHoursWrapper/OpenHoursWrapper";
import GeneralShopSettings
    from "../../Components/GeneralShopSettings/GeneralShopSettings";


const secondaryNavigation = [
    {
        name: 'General',
        icon: BuildingStorefrontIcon,
        current: true
    },
    {
        name: 'Business Hours',
        href: '#',
        icon: CalendarIcon,
        current: false
    },
]

export default function settingsPage() {


    const [activeNavigation, setActiveNavigation] = useState('General')


    return (
        <>
            <div
                className="mx-auto max-w-7xl  lg:flex lg:gap-x-16 lg:px-8">
                <aside
                    className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
                    <nav
                        className="flex-none px-4 sm:px-6 lg:px-0">
                        <ul role="list"
                            className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                            {secondaryNavigation.map((item) => (
                                <li key={item.name}>
                                    <span
                                        onClick={() => setActiveNavigation(item.name)}
                                        className={classNames(
                                            activeNavigation === item.name
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                activeNavigation === item.name ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                'h-6 w-6 shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main
                    className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
                    <div
                        className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        {activeNavigation === 'General' &&
                            <GeneralShopSettings/>}{activeNavigation === 'Business Hours' &&
                        <OpenHoursWrapper/>}


                    </div>
                </main>
            </div>
        </>
    )
}
