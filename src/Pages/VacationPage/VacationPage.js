import VacationModeButton from "../../Components/VacationModeButton/VacationModeButton";
import styles from "./styles";
import {Button} from "@mui/material";
import WorkersVacationWrapper from "../../Components/WorkersVacationWrapper/WorkersVacationWrapper";
import {sendVacationsToServer} from "./actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setUpdatedVacations} from "../../Features/authorizeUser/authorizeUser-slice";
import {getVacations} from "../../Components/WorkersVacationWrapper/actions";
import {setShouldViewUpdate} from "../../Features/typeOfView/typeOfView-slice";
import {setModalContent} from "../../Features/modal/modal-slice";

const VacationPage = () => {
    const dispatch = useDispatch()
    const [vacationsObject, setVacationsObject] = useState({})
    const parseVacationsFromServer = async () => {
        const res = await getVacations()
        console.log(res, 'fromSe')
        if (res) {
            setVacationsObject({...res})
            dispatch(setShouldViewUpdate())

        }

    }

    useEffect(() => {
        parseVacationsFromServer()
    }, [])


    const sendVacations = async () => {
        try {
            const res = await sendVacationsToServer({vacations: vacationsObject})
            console.log(res, 'fromVacationPage')
            if (res) {
                dispatch(setUpdatedVacations(res))
                setVacationsObject(res)
                dispatch(setModalContent({message: 'Vacations were saved successfully', status: 200}))
            }
        } catch (e) {

            dispatch(setModalContent({message: 'Vacations were not saved', status: 500}))
        }

    }
    return (
        <div style={styles.wrapper}>

            <VacationModeButton/>
            <WorkersVacationWrapper vacationsObject={vacationsObject}
                                    setVacationsObject={setVacationsObject}/>
            <Button onClick={() => {
                sendVacations()

            }} fullWidth variant='outlined'>Save</Button>
        </div>
    )
}


export default VacationPage
