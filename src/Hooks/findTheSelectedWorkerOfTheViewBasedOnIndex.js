import {useSelector} from "react-redux";

export default function findTheSelectedWorkerOfTheViewBasedOnIndex(indexOfView,) {
    const workerSelectedOnFirstView = useSelector(state => state.typeOfView?.firstViewWorkerId)
    const workerSelectedOnSecondView = useSelector(state => state.typeOfView?.secondViewWorkerId)
    const workerSelectedOnThirdView = useSelector(state => state.typeOfView?.thirdViewWorkerId)

    if (indexOfView === 0) {
        return workerSelectedOnFirstView
    }
    if (indexOfView === 1) {
        return workerSelectedOnSecondView
    }
    if (indexOfView === 2) {
        return workerSelectedOnThirdView
    }
    //is single view
    if (!indexOfView) {
        return workerSelectedOnFirstView

    }


}
