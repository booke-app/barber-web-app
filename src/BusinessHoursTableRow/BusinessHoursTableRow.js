const BusinessHoursTableRow = () => {

    return (<div>
        <div
            className="relative flex items-start py-4">
            <div
                className="min-w-0 flex-1 text-sm leading-6">
                <div className="ml-3 flex h-6 items-center">
                    <input
                        id={`person`}
                        name={`person`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:bg-indigo-700   focus:ring-indigo-600"
                    />
                </div>
            </div>
        </div>
    </div>)
}


export default BusinessHoursTableRow
