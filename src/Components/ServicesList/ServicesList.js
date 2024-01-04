import {useState} from 'react'
import {RadioGroup} from '@headlessui/react'
import {classNames} from "../../Utilities/utilities";
import {useSelector} from "react-redux";
import ServiceCard from "../ServiceCard/ServiceCard";
import SlideOverWithCloseButtonOnOutside
    from "../SlideOverWithCloseButtonOnOutside/SlideOverWithCloseButtonOnOutside";


export default function ServicesList({open, setOpen}) {
    const servicesFromShop = useSelector(state => state.authorizeUser.shop.categoriesWithItsServices)


    return (
        <SlideOverWithCloseButtonOnOutside
            title={'Select Service'} open={open}
            setOpen={setOpen}>


            <div className="space-y-4">
                {servicesFromShop.map(category => category.services.length > 0 && <>
                        <p className={'text-base font-semibold leading-6 text-gray-900'}>{category.categoryName}</p>
                        {category.services.map((service, index) => (

                            <ServiceCard close={() => {
                                setOpen(false)
                            }} key={index}
                                         service={service}/>
                        ))}
                    </>
                )}


            </div>

        </SlideOverWithCloseButtonOnOutside>
    )
}
