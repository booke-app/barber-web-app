import {useState} from 'react'
import {RadioGroup} from '@headlessui/react'
import {classNames} from "../../Utilities/utilities";
import {useSelector} from "react-redux";
import ServiceCard from "../ServiceCard/ServiceCard";


export default function ServicesList() {
    const servicesFromShop = useSelector(state => state.authorizeUser.shop.services)
    const [selected, setSelected] = useState(servicesFromShop?.[0])

    return (
        <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Server
                size</RadioGroup.Label>
            <div className="space-y-4">
                {servicesFromShop?.map((service, index) => (

                    <ServiceCard key={index}
                                 service={service}/>
                ))}
            </div>
        </RadioGroup>
    )
}
