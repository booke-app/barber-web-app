import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {useSelector} from "react-redux";
import ServiceCard from "../ServiceCard/ServiceCard";

export const SelectAServiceButtonInSlideOver = ({
                                                    onClick,
                                                    onEdit
                                                }) => {
    const selectedServiceForAppointment = useSelector(state => state.appointment.selectedService)


    if (!selectedServiceForAppointment) {

        return (<button
            type="button"
            onClick={onClick}
            className="
        mt-5
        w-full
            relative
         mr-4 flex flex-row justify-between py-5 rounded-md bg-white
             rounded-md border border-l border-gray-300
               px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative"
        >Select a
            service

            <ChevronRightIcon
                className="h-5 w-5"
                aria-hidden="true"/>
        </button>)
    }

    if (selectedServiceForAppointment) {
        return (
            <div className={' mt-5'}><ServiceCard
                onEdit={onEdit}
                service={selectedServiceForAppointment}/>
            </div>)

    }


}
