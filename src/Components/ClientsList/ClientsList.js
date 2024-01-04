import {RadioGroup} from "@headlessui/react";
import ServiceCard from "../ServiceCard/ServiceCard";
import SlideOverWithCloseButtonOnOutside
    from "../SlideOverWithCloseButtonOnOutside/SlideOverWithCloseButtonOnOutside";
import {useState} from "react";
import {useSelector} from "react-redux";
import ClientCard from "../ClientCard/ClientCard";
import {
    MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

export const ClientsList = ({open, setOpen}) => {
    const clientsFromShop = useSelector(state => state?.authorizeUser?.shop?.clients)

    return (
        <SlideOverWithCloseButtonOnOutside
            title={'Select Client'} open={open}
            setOpen={setOpen}>

            <div className={'mb-5'}>
                <div
                    className="relative mt-2 flex items-center">
                    <input
                        placeholder={'Search client or leave empty for walk-in'}
                        type="text"
                        name="search"
                        id="search"
                        className="block text-sm pl-2 w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div
                        className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                        <MagnifyingGlassIcon/>

                    </div>
                </div>
                <span
                    className={'text-sm text-indigo-600 cursor-pointer'}>Add
                    Client</span>
            </div>


            <div className="space-y-4">
                {clientsFromShop.map(client =>
                    <ClientCard close={() => {
                        setOpen(false)
                    }} client={client}/>
                )}


            </div>
        </SlideOverWithCloseButtonOnOutside>
    )
}
