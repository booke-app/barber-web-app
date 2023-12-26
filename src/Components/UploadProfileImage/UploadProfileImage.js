import {UserCircleIcon} from "@heroicons/react/24/solid";
import {uploadImage} from "../../Utilities/utilities";
import {useDispatch, useSelector} from "react-redux";
import {
    getPersonalData
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";

const UploadProfileImage = () => {
    const personalInfo = useSelector(state => state.authorizeUser.userData)

    const dispatch = useDispatch()
    return (
        <div className="col-span-full">
            <label htmlFor="photo"
                   className="block text-sm font-medium leading-6 text-gray-900">
                Profile Photo
            </label>
            <div
                className="mt-2 flex items-center gap-x-3">
                {!personalInfo?.profilePhotoUrl ?
                    <UserCircleIcon
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"/> :
                    <img
                        style={{
                            objectFit: 'cover'
                        }}
                        className="h-12 w-12 rounded-full bg-indigo-700"
                        src={personalInfo.profilePhotoUrl}
                        alt=""
                    />}
                <label htmlFor="file-upload"
                       className="relative cursor-pointer  rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">Change
                    <input
                        onChange={async (e) => {
                            try {
                                const result = await uploadImage(e, 'profile')

                                dispatch(getPersonalData())
                                dispatch(setModalContent({
                                    message: 'Image was changed successfully',
                                    status: 200
                                }))
                            } catch (e) {
                                console.log(e)
                                dispatch(setModalContent({
                                    message: 'Image was not uploaded',
                                    status: 500
                                }))

                            }

                        }}
                        id="file-upload"
                        name="file-upload"
                        multiple={false}
                        type="file"

                        className=" sr-only rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    /></label>
            </div>
        </div>
    )
}


export default UploadProfileImage
