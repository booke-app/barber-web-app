import {
    UploadImage
} from "../UploadShopMainImage/UploadShopMainImage";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {saveAboutUs} from "./actions";
import {
    setModalContent
} from "../../Features/modal/modal-slice";
import {
    GalleryOfImages
} from "../GalleryOfImages/GalleryOfImages";

const GeneralShopSettings = () => {
    const shop = useSelector(state => state.authorizeUser.shop)
    const dispatch = useDispatch()
    const [aboutUs, setAboutUs] = useState(null)

    const save = async () => {
        try {
            const res = await saveAboutUs({aboutUs: aboutUs})
            setAboutUs(res)
            dispatch(setModalContent({
                message: 'General information of your shop was saved successfully',
                status: 200
            }))
        } catch (e) {
            dispatch(setModalContent({
                message: 'General information of your shop was not saved successfully',
                status: 500
            }))
        }
    }

    useEffect(() => {
        if (shop.aboutUs) {
            setAboutUs(shop.aboutUs)
        }
    }, [shop.aboutUs]);

    return (<div>
        <div
            style={{justifyContent: "space-around"}}
            className={' mt-5 sm:flex w-full  sm:items-center'}>
            <div
                className={'sm:flex w-full  sm:items-start flex-col'}>
                <h2
                    className="text-base sm:flex sm:items-center font-semibold leading-7  text-gray-900">
                    Shop Profile</h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                    This information will be
                    displayed publicly so be
                    careful what you share.
                </p>
            </div>
            <div
                className={'mt-4 sm:ml-16 sm:mt-0 sm:flex-none'}>
                <button

                    className={'block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'}
                    onClick={() => {
                        save()
                    }}>Save
                </button>
            </div>
        </div>
        <UploadImage/>
        <GalleryOfImages/>

        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div
                className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Shop
                    name
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div
                        className="text-gray-900">{shop.name}
                    </div>
                </dd>
            </div>
            <div
                className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Shop
                    phone
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div
                        className="text-gray-900">{shop.phone}
                    </div>
                </dd>
            </div>
            <div
                className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Shop
                    location
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div
                        className="text-gray-900">{shop?.location?.address + ", " + shop?.location?.city + ', ' + shop?.location?.zipCode}
                    </div>
                </dd>
            </div>
            <div
                className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Shop
                    id
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div
                        className="text-gray-900">{shop?._id}
                    </div>

                </dd>
            </div>
            <div className={' pt-6'}>
                <label htmlFor="comment"
                       className="block text-sm font-medium leading-6 text-gray-900">
                    About Us
                </label>
                <div className="mt-2">
        <textarea
            rows={4}
            name="comment"
            id="comment"
            onChange={(e) => setAboutUs(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={aboutUs ? aboutUs : ''}

        />
                </div>
            </div>
        </dl>

    </div>)
}


export default GeneralShopSettings
