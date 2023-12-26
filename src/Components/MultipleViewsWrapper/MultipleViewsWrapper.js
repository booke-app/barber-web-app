import {styles} from "../Day/styles";
import FiveMinuteSlot
    from "../FiveMinuteSlot/FiveMinuteSlot";
import {printHourDiv} from "../../Utilities/utilities";
import WorkersModal from "../WorkersModal/WorkersModal";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setFirstViewWorker,
    setSecondViewWorker,
    setThirdViewWorker
} from "../../Features/typeOfView/typeOfView-slice";

const MultipleViewsWrapper = ({
                                  arrayForTypeOfView,
                                  indexOfDay
                              }) => {
    const dispatch = useDispatch()
    const firstViewWorkerId = useSelector(state => state.typeOfView.firstViewWorkerId)
    const secondViewWorkerId = useSelector(state => state.typeOfView.firstViewWorkerId)
    const thirdViewWorkerId = useSelector(state => state.typeOfView.firstViewWorkerId)
    const workersFromShop = useSelector(state => state.authorizeUser.shop.workers)
    const shouldViewUpdate = useSelector(state => state.typeOfView?.shouldViewUpdate)

    useEffect(() => {

        arrayForTypeOfView.map(index => {
            if (index === 0 && !firstViewWorkerId) {
                dispatch(setFirstViewWorker(workersFromShop[0]))

            }
            if (index === 1 && !secondViewWorkerId) {
                dispatch(setSecondViewWorker(workersFromShop[1]._id))

            }
            if (index === 2 && !thirdViewWorkerId) {
                dispatch(setThirdViewWorker(workersFromShop[2]._id))

            }
        })
    }, [])


    return (
        <div style={styles.multipleView}>
            {arrayForTypeOfView.map((arrayItem, indexOfTypeOfView) => (
                <div key={indexOfTypeOfView}
                     style={styles.hourDiv}>
                    <div style={{marginBottom: '10px'}}>
                        <WorkersModal
                            indexOfCurrentWorkerModalIfMultipleViewsIsSelected={indexOfTypeOfView}/>
                    </div>
                    {printHourDiv().map((hourDiv, i) =>
                        <div key={shouldViewUpdate + i}
                             style={styles.hourDiv}> {hourDiv.slots.map((fiveMinuteSlot, indexOfMinute) => (
                            <FiveMinuteSlot
                                key={indexOfMinute}
                                indexOfDay={indexOfDay}
                                indexOfHours={i}
                                indexOfMinutes={indexOfMinute}
                                indexOfTypeOfView={indexOfTypeOfView}/>))}
                        </div>
                    )}
                </div>

            ))}
        </div>
    )

}


export default MultipleViewsWrapper
