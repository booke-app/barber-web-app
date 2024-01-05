import {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import SlideOverWithCloseButtonOnOutside
    from "../SlideOverWithCloseButtonOnOutside/SlideOverWithCloseButtonOnOutside";
import {
    setIsMobileCalendarSettingsSideBarOpen
} from "../../Features/ui/ui-slice";
import RangeOfDays from "../RangeOfDays/RangeOfDays";
import WorkerSelector
    from "../WorkerSelector/WorkerSelector";
import DaySelector from "../DaySelector/DaySelector";

export const MobileCalendarSettingsSidebar = () => {
    const [open, setOpen] = useState(false)
    const isMobileCalendarSettingsOpen = useSelector(state => state.userInterface.mobileCalendarSettingsSideBarOpen)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!open && isMobileCalendarSettingsOpen) {
            dispatch(setIsMobileCalendarSettingsSideBarOpen(false))
        }

    }, [open]);
    useEffect(() => {
        if (isMobileCalendarSettingsOpen && !open) {
            setOpen(true)
        }

    }, [isMobileCalendarSettingsOpen]);

    return (
        <SlideOverWithCloseButtonOnOutside
            title={'Calendar Settings'}
            open={open}
            setOpen={setOpen}>
            <div
                className={' md:ml-4 flex flex-col w-full justify-evenly  items-center'}>

                <div className={'w-full'}>
                    <p className={'text-m font-semibold text-gray-900'}>Select
                        date</p>
                    <DaySelector/>
                </div>

                <div className={'w-full mt-5'}>
                    <p className={'text-m font-semibold text-gray-900'}>Select
                        range of days</p>
                    <RangeOfDays/></div>

                <div className={'w-full mt-5'}>
                    <p className={'text-m font-semibold text-gray-900'}>Select
                        Worker</p>
                    <WorkerSelector/></div>
            </div>
            <button
                onClick={() => {
                    setOpen(false)
                }}
                type="button"
                className="absolute bottom-0 left-6 rounded-md bg-red-600 px-3 py-2 text-l font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
                GO BACK
            </button>
        </SlideOverWithCloseButtonOnOutside>

    )
}
