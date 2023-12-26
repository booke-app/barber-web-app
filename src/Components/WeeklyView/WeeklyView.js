import {useEffect, useRef} from 'react'

import {useSelector} from "react-redux";
import dayjs from "dayjs";
import HeaderOfViews from "../HeaderOfViews/HeaderOfViews";
import WeekNavigator from "../WeekNavigator/WeekNavigator";


import LeftPartShowingHours
    from "../LeftPartShowingHours/LeftPartShowingHours";
import WeekConstructor
    from "../WeekConstructor/WeekConstructor";


export default function WeeklyView() {
    const container = useRef(null)
    const containerNav = useRef(null)
    const selectedDate = useSelector(state => state.calendar.selectedDate)


    return (
        <div className="flex h-full flex-col">
            <header
                className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                    <span>{dayjs(selectedDate).format('MMMM YYYY')}</span>
                </h1>
                <HeaderOfViews/>
            </header>
            <div ref={container}
                 className="isolate flex flex-auto flex-col overflow-auto bg-white">
                <div style={{width: '165%'}}
                     className="flex max-w-full flex-none flex-col max-w-none">
                    <WeekNavigator
                        typeOfNavigator={'week'}
                        containerNav={containerNav}/>
                    <div className={'flex flex-auto'}>
                        <LeftPartShowingHours/>
                        <WeekConstructor/>
                    </div>
                </div>
            </div>
        </div>
    )
}
