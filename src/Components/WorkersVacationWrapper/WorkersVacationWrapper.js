import {useSelector} from "react-redux";
import styles from './styles'
import WorkerWithHisVacation from "../WorkerWithHisVacation/WorkerWithHisVacation";

import PlusAndMinusIconsInVacationCard from "../PlusAndMinusIconsInVacationCard/PlusAndMinusIconsInVacationCard";


const WorkersVacationWrapper = ({vacationsObject, setVacationsObject}) => {

    const shopWorkers = useSelector(state => state.authorizeUser?.shop?.workers)


    return (
        <div style={styles.wrapper}>
            <p style={styles.mainTitle}>Workers Vacation</p>
            <div style={styles.wrapperOfAllVacations}>
                {shopWorkers?.map((worker, i) =>
                    <div style={styles.wrapperOfVacationAndIcons}>
                        <WorkerWithHisVacation
                            key={worker?._id + i}
                            setVacationsObject={setVacationsObject}
                            vacationsObject={vacationsObject}
                            worker={worker}/>
                        {vacationsObject?.[worker?._id] &&
                            <PlusAndMinusIconsInVacationCard
                                key={worker?._id}
                                _id={worker?._id}
                                setVacationsObject={setVacationsObject}
                                vacationsObject={vacationsObject}/>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}


export default WorkersVacationWrapper
