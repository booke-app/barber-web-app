import {RadioGroup} from "@headlessui/react";
import {classNames} from "../../Utilities/utilities";
import {useDispatch, useSelector} from "react-redux";
import {
    setSelectedClient
} from "../../Features/appointment/appointment-slice";
import {
    EllipsisVerticalIcon
} from "@heroicons/react/24/outline";

export default function ClientCard({
                                       client,
                                       close,
                                       onEdit
                                   }) {
    const dispatch = useDispatch()
    const selectedClient = useSelector(state => state.appointment?.selectedClient)
    return (
        <div
            onClick={() => {
                dispatch(setSelectedClient(client))
                if (close) {
                    close()
                }
            }}
            key={client.name}
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

                      {client.firstName + " " + client.lastName}
                    </span>
                    <span
                        className="text-gray-500">
                      <span className="block ">
                        {client.phone}
                      </span>
                        <span
                            aria-hidden="true">
                            {client.email ? client.email : '-'}
                      </span>

                    </span>
                  </span>
                </span>

                <span
                    className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
        <svg className="h-full w-full text-gray-300"
             fill="currentColor" viewBox="0 0 24 24">
          <path
              d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      </span>
            </>

            {onEdit &&
                <EllipsisVerticalIcon onClick={() => {
                    onEdit()
                }}
                                      className={'w-5 h-5 absolute right-1 cursor-pointer top-0 bottom-0 mt-auto mb-auto'}/>}
        </div>
    )
}
