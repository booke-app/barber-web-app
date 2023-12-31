import {Tooltip} from "@mui/material";
import {PlusIcon} from "@heroicons/react/24/outline";
import {classNames} from "../../Utilities/utilities";
import ImageInGallery
    from "../ImageInGallery/ImageInGallery";
import {useDispatch, useSelector} from "react-redux";
import {uploadImageInGallery} from "./actions";
import {
    uploadShopImage
} from "../UploadShopMainImage/actions";
import {
    setUpdatedGallery,
    setUpdatedImage
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";

export const GalleryOfImages = () => {
    const dispatch = useDispatch()
    const imagesInGallery = useSelector(state => state.authorizeUser?.shop?.images?.gallery)
    return (
        <div className="mt-10 space-y-12">
            <div className="col-span-full">
                <label htmlFor="cover-photo"
                       className="block text-sm font-medium leading-6 text-gray-900">
                    Image Gallery
                </label>
                <div
                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div
                        className=" grid grid-cols-2 md:grid-cols-3 gap-4">
                        {imagesInGallery?.map(img =>
                            <ImageInGallery
                                imageItem={img}/>)}

                        <div>
                            <Tooltip
                                title={'Add Image to gallery'}>

                                <label
                                    htmlFor="gallery-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 "
                                >
                                    <PlusIcon

                                        className={classNames(
                                            'text-white rounded bg-indigo-600 hover:bg-indigo-500 h-6 w-6 shrink-0 '
                                        )}/>
                                    <input
                                        onChange={async (e) => {
                                            try {
                                                const res = await uploadImageInGallery(e)

                                                dispatch(setUpdatedGallery(res))
                                                dispatch(setModalContent({
                                                    message: 'Image gallery was updated successfully',
                                                    status: 200
                                                }))
                                            } catch (e) {
                                                dispatch(setModalContent({
                                                    message: 'Image gallery was not updated successfully',
                                                    status: 500
                                                }))
                                            }
                                        }}

                                        id="gallery-upload"
                                        name="gallery-upload"
                                        multiple={false}
                                        type="file"
                                        className="sr-only"/>
                                </label>


                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
