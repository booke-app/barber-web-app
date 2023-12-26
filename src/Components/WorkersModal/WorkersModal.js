import styles from "./styles";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormControl, MenuItem, Select} from "@mui/material";
import {
    setFirstViewWorker,
    setSecondViewWorker,
    setThirdViewWorke
} from "../../Features/typeOfView/typeOfView-slice";
import theme from "../../theme";
import {Person} from "@mui/icons-material";

const WorkersModal = ({indexOfCurrentWorkerModalIfMultipleViewsIsSelected}) => {
    const workersFromShop = useSelector(state => state.authorizeUser.shop.workers)
    const typeOfView = useSelector(state => state.typeOfView.typeOfView)
    const [workerSelected, setWorkerSelected] = useState({})
    const dispatch = useDispatch()
    const workerIdSelectedOnFirstView = useSelector(state => state.typeOfView?.firstViewWorkerId)
    const workerIdSelectedOnSecondView = useSelector(state => state.typeOfView?.secondViewWorkerId)
    const workerIdSelectedOnThirdView = useSelector(state => state.typeOfView?.thirdViewWorkerId)
    useEffect(() => {
        if (workersFromShop?.length > 0 && typeOfView === 1 && !workerSelected.firstName) {
            setWorkerSelected(workersFromShop?.[0])
        }
        if (workersFromShop?.length > 0) {
            workersFromShop?.map(workerFromShop => {
                if (indexOfCurrentWorkerModalIfMultipleViewsIsSelected === 0) {
                    if (workerIdSelectedOnFirstView) {
                        setWorkerSelected(workersFromShop.filter(worker => worker?._id === workerIdSelectedOnFirstView)?.[0])

                    }

                    if (!workerIdSelectedOnFirstView) {
                        dispatch(setFirstViewWorker(workersFromShop[indexOfCurrentWorkerModalIfMultipleViewsIsSelected]?.id))
                    }


                }
                if (indexOfCurrentWorkerModalIfMultipleViewsIsSelected === 1) {
                    if (workerIdSelectedOnSecondView) {
                        setWorkerSelected(workersFromShop.filter(worker => worker?._id === workerIdSelectedOnSecondView)?.[0])
                    }
                    if (!workerIdSelectedOnSecondView) {
                        setWorkerSelected(workersFromShop[indexOfCurrentWorkerModalIfMultipleViewsIsSelected])
                        dispatch(setSecondViewWorker(workersFromShop[indexOfCurrentWorkerModalIfMultipleViewsIsSelected]?._id))


                    }

                }
                if (indexOfCurrentWorkerModalIfMultipleViewsIsSelected === 2) {
                    if (workerIdSelectedOnThirdView) {
                        setWorkerSelected(workersFromShop.filter(worker => worker?._id === workerIdSelectedOnThirdView)?.[0])
                    }
                    if (!workerIdSelectedOnThirdView) {
                        setWorkerSelected(workersFromShop[indexOfCurrentWorkerModalIfMultipleViewsIsSelected])
                        dispatch(setThirdViewWorker(workersFromShop[indexOfCurrentWorkerModalIfMultipleViewsIsSelected]?._id))

                    }
                }
            })

        }


    }, [workersFromShop])

    useEffect(() => {
        if (workerIdSelectedOnFirstView && !indexOfCurrentWorkerModalIfMultipleViewsIsSelected) {
            setWorkerSelected(workersFromShop.filter(worker => worker?._id === workerIdSelectedOnFirstView)?.[0])
        }
    }, [workerIdSelectedOnFirstView])

    return (<div style={styles.wrapper}>

        <div style={styles.dropdownDiv}>
            {workersFromShop?.length > 0 && workerSelected?.firstName &&
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={styles.modal}
                        value={workerSelected?._id}
                        onChange={(e) => {
                            setWorkerSelected({
                                firstName: workersFromShop.filter(worker => worker._id === e.target.value)?.[0].firstName,
                                lastName: workersFromShop.filter(worker => worker._id === e.target.value)?.[0].lastName,
                                id: workersFromShop.filter(worker => worker._id === e.target.value)?.[0]._id
                            })
                            if (indexOfCurrentWorkerModalIfMultipleViewsIsSelected === 0 || !indexOfCurrentWorkerModalIfMultipleViewsIsSelected) {
                                dispatch(setFirstViewWorker(workersFromShop.filter(worker => worker._id === e.target.value)?.[0]._id))
                            }
                            if (indexOfCurrentWorkerModalIfMultipleViewsIsSelected === 1) {
                                dispatch(setSecondViewWorker(workersFromShop.filter(worker => worker._id === e.target.value)?.[0]._id))
                            }
                            if (indexOfCurrentWorkerModalIfMultipleViewsIsSelected === 2) {
                                dispatch(setThirdViewWorker(workersFromShop.filter(worker => worker._id === e.target.value)?.[0]._id))
                            }
                        }}
                    >
                        {workersFromShop?.map((worker, i) => {
                            return (<MenuItem sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 'bolder'
                            }} key={i}
                                              value={worker._id}>{worker.firstName[0]} {worker.lastName}</MenuItem>)
                        })}
                    </Select></FormControl>}
        </div>
    </div>)
}


export default WorkersModal
