import {RadioGroup} from "@headlessui/react";
import {classNames} from "../../Utilities/utilities";

export default function ServiceCard({service}) {
    return (
        <RadioGroup.Option
            key={service.name}
            value={service}
            className={({active}) =>
                classNames(
                    active ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300',
                    'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                )
            }
        >
            {({active, checked}) => (
                <>
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <RadioGroup.Label as="span"
                                      className="font-medium text-gray-900">
                      {service.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span"
                                            className="text-gray-500">
                      <span className="block sm:inline">
                        {service.duration}min.
                      </span>{' '}
                        <span
                            className="hidden sm:mx-1 sm:inline"
                            aria-hidden="true">
                      </span>{' '}

                    </RadioGroup.Description>
                  </span>
                </span>
                    <RadioGroup.Description
                        as="span"
                        className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                    >
                        <span
                            className="font-medium text-gray-900">{service.price}€</span>
                       
                    </RadioGroup.Description>
                    <span
                        className={classNames(
                            active ? 'border' : 'border-2',
                            checked ? 'border-indigo-600' : 'border-transparent',
                            'pointer-events-none absolute -inset-px rounded-lg'
                        )}
                        aria-hidden="true"
                    />
                </>
            )}
        </RadioGroup.Option>
    )
}
