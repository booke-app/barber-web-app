import {RadioGroup} from "@headlessui/react";
import {classNames} from "../../Utilities/utilities";
import {useDispatch, useSelector} from "react-redux";
import {
    setSelectedService
} from "../../Features/appointment/appointment-slice";
import {
    EllipsisVerticalIcon
} from "@heroicons/react/24/outline";

export default function ServiceCard({
                                        service,
                                        close,
                                        onEdit
                                    }) {
    const dispatch = useDispatch()
    const selectedServiceForAppointment = useSelector(state => state.appointment.selectedService)
    return (
        <div
            onClick={() => {
                dispatch(setSelectedService(service))
                if (close) {
                    close()
                }
            }}
            key={service.name}
            className={
                classNames(
                    'border-gray-300 relative',
                    'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                )
            }
        >

            <>
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <span
                        className="font-medium text-gray-900">
                      {service.name}
                    </span>
                    <span
                        className="text-gray-500">
                      <span className="block sm:inline">
                        {service.duration}min.
                      </span>{' '}
                        <span
                            className="hidden sm:mx-1 sm:inline"
                            aria-hidden="true">
                      </span>{' '}

                    </span>
                  </span>
                </span>
                <span

                    className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                >
                        <span
                            className="font-medium text-gray-900">{service.price}€</span>

                    </span>
                <span
                    className={classNames(
                        selectedServiceForAppointment?._id === service?._id ? 'border' : 'border-2',
                        'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-lg'
                    )}
                    aria-hidden="true"
                />
            </>
            {onEdit &&
                <EllipsisVerticalIcon onClick={() => {
                    onEdit()
                }}
                                      className={'w-5 h-5 absolute right-1 cursor-pointer top-0 bottom-0 mt-auto mb-auto'}/>}

        </div>
    )
}
