import {UserCircleIcon} from "@heroicons/react/24/solid";
import {
    convertBase64,
    uploadImage
} from "../../Utilities/utilities";
import {useDispatch, useSelector} from "react-redux";

const UploadWorkerProfileImage = ({
                                      setImageBase64,
                                      imageBase64,
                                      imgUrl
                                  }) => {

    const dispatch = useDispatch()
    return (
        <div className="col-span-full">
            <label htmlFor="photo"
                   className="block text-sm font-medium leading-6 text-gray-900">
                Worker Photo
            </label>
            <div
                className="mt-2 flex items-center gap-x-3">
                {(!imageBase64 && !imgUrl) ?
                    <UserCircleIcon
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"/> :
                    <img

                        style={{
                            objectFit: 'cover'
                        }}
                        className="h-12 w-12 rounded-full bg-indigo-700"
                        src={`${imageBase64 ? imageBase64 : imgUrl} `}
                        alt=""
                    />}
                <label htmlFor="file-upload"
                       className="relative cursor-pointer  rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">Change
                    <input
                        onChange={async (e) => {
                            try {
                                const result = await convertBase64(e.target.files?.[0])
                                setImageBase64(result)
                            } catch (e) {
                                console.log(e)

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


export default UploadWorkerProfileImage
