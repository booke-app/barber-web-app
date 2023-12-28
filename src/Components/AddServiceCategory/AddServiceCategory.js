import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {addCategory} from "./actions";
import {
    setUpdateCategoriesWithItsServices
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    setModalContent
} from "../../Features/modal/modal-slice";


const AddServiceCategory = ({onCancel}) => {
    const [categoryName, setCategoryName] = useState('')
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    const dispatch = useDispatch()
    const createCategory = async () => {
        try {
            const response = await addCategory({
                shopId,
                categoryName
            })
            if (response.length > 0) {
                dispatch(setUpdateCategoriesWithItsServices(response));
                dispatch(setModalContent({
                    message: 'Category was added successfully',
                    status: 200
                }))

            }
        } catch (e) {
            dispatch(setModalContent({
                message: 'Category was not added ',
                status: 500
            }))
        }

    }
    return (
        <form method="post"
              noValidate
              onSubmit={() => false}>
            <div className="mt-14 space-y-12">

                <div
                    className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900"> New
                        Category Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Add
                        information about the new
                        category</p>

                    <div
                        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input onChange={(e) => {
                                    setCategoryName(e.target.value)
                                }}
                                       value={categoryName}
                                       type="text"
                                       required={true}
                                       name="first-name"
                                       id="first-name"
                                       autoComplete="given-name"
                                       className="peer block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                />
                                <span
                                    className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                     Please enter a valid category name
                                </span>
                            </div>
                        </div>


                    </div>
                </div>

            </div>

            <div
                className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={onCancel} type="button"
                        className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="button"
                    disabled={categoryName.length === 0}
                    onClick={() => {
                        createCategory()
                        setCategoryName('')
                        onCancel()
                    }}
                    className={"rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline disabled:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                >
                    Save
                </button>
            </div>
        </form>
    )

}


export default AddServiceCategory
