import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {useSelector} from "react-redux";
import ClientCard from "../ClientCard/ClientCard";

export const SelectAClientButtonInSlideOver = ({
                                                   onEdit,
                                                   onClick,

                                               }) => {
    const selectedClient = useSelector(state => state?.appointment?.selectedClient)


    if (selectedClient) {
        return <ClientCard
            onEdit={onEdit}
            client={selectedClient}/>
    }

    if (!selectedClient) {
        return <button
            style={{alignItems: "center"}}
            type="button"
            onClick={onClick}
            className="
        w-full
            relative
         mr-4 flex flex-row justify-between py-5  rounded-md bg-white
             rounded-md border border-l border-gray-300
               px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative"
        >

            <span
                className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
        <svg className="h-full w-full text-gray-300"
             fill="currentColor" viewBox="0 0 24 24">
          <path
              d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      </span>

            <div className={'flex flex-col'}>
                Select a
                client
                <span
                    className={'text-gray-400 text-sm'}>Or Leave empty for a walk-in</span>
            </div>

            <ChevronRightIcon
                className="h-5 w-5"
                aria-hidden="true"/>
        </button>
    }

}
