import {
    PhotoIcon,
} from '@heroicons/react/24/solid'
import {request} from "../../Utilities/Request";
import {uploadImage} from "../../Utilities/utilities";
import {useDispatch, useSelector} from "react-redux";
import {
    setModalContent
} from "../../Features/modal/modal-slice";
import {uploadShopImage} from "./actions";
import {useEffect} from "react";
import {
    setUpdatedImage
} from "../../Features/authorizeUser/authorizeUser-slice";

export function UploadImage() {
    const dispatch = useDispatch()
    const shopImage = useSelector(state => state.authorizeUser.shop?.images?.shopImage?.url)


    useEffect(() => {
        console.log(shopImage)

    }, [shopImage]);
    return (
        <>
            <div className="mt-10 space-y-12">
                <div className="col-span-full">
                    <label htmlFor="cover-photo"
                           className="block text-sm font-medium leading-6 text-gray-900">
                        Main Photo
                    </label>
                    <div
                        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        {!shopImage && <div
                            className="text-center">
                            <PhotoIcon
                                className="mx-auto h-12 w-12 text-gray-300"
                                aria-hidden="true"/>
                            <div
                                className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        onChange={async (e) => {
                                            try {
                                                const res = await uploadShopImage(e)
                                                dispatch(setUpdatedImage(res))
                                                dispatch(setModalContent({
                                                    message: 'Shop Image was uploaded successfully',
                                                    status: 200
                                                }))
                                            } catch (e) {
                                                dispatch(setModalContent({
                                                    message: 'Shop Image was not uploaded successfully',
                                                    status: 500
                                                }))
                                            }
                                        }}

                                        id="file-upload"
                                        name="file-upload"
                                        multiple={false}
                                        type="file"
                                        className="sr-only"/>
                                </label>
                                <p className="pl-1">or
                                    drag and
                                    drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG,
                                JPG, GIF up to
                                10MB</p>
                        </div>}
                        {shopImage &&
                            <img src={shopImage}/>
                        }

                    </div>
                    {shopImage && <>
                        <div
                            className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Change main photo</span>
                                <input
                                    onChange={async (e) => {
                                        try {
                                            const res = await uploadShopImage(e)
                                            dispatch(setUpdatedImage(res))

                                            dispatch(setModalContent({
                                                message: 'Shop Image was uploaded successfully',
                                                status: 200
                                            }))
                                        } catch (e) {
                                            dispatch(setModalContent({
                                                message: 'Shop Image was not uploaded successfully',
                                                status: 500
                                            }))
                                        }
                                    }}

                                    id="file-upload"
                                    name="file-upload"
                                    multiple={false}
                                    type="file"
                                    className="sr-only"/>
                            </label>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG,
                            JPG, GIF up to
                            10MB</p></>}
                </div>
            </div>

        </>
    )
}
