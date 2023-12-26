import {Checkbox} from "@mui/material";
import {useState} from "react";

const CheckBoxWrapper = ({text, setVacationLocalObject, vacationLocalObject, isCheckedFromParent}) => {
    return (<div>
        <Checkbox checked={isCheckedFromParent} onChange={(e) => {
            setVacationLocalObject({
                ...vacationLocalObject, hasSpecificHours: !isCheckedFromParent
            })

        }}/>
        {text}
    </div>)
}


export default CheckBoxWrapper
