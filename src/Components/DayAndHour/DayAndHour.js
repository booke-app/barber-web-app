import {styles} from "./styles";
import {Button, Icon, Tooltip} from "@mui/material";
import {AddOutlined, DeleteOutlined} from "@mui/icons-material";
import Shift from "../Shift/Shift";
import RightOfPageEditShift from "../RightOfPageEditShift/RightOfPageEditShift";
import {useState} from "react";

const DayAndHour = ({setAllWeeksShiftObject, allWeekShiftsObject, day}) => {
    const doesDayHaveShifts = allWeekShiftsObject[day].shifts.length > 0
    return (
        <div style={styles.day}><span style={{
            borderBottomWidth: 1, borderBottomColor: "black", borderBottomStyle: "solid",
            fontWeight: 800,
            marginBottom: '5px', minWidth: '100px', padding: '5px 20px,', wordWrap: 'wrap'
        }}>{day}</span>


            {allWeekShiftsObject[day].shifts.length > 0 && allWeekShiftsObject[day]?.shifts?.map((shift, i) => (
                <Shift day={day} index={i} key={i} shift={allWeekShiftsObject?.[day].shifts?.[i]}
                       allWeeksShifts={allWeekShiftsObject} setAllWeeksShiftObject={setAllWeeksShiftObject}/>

            ))}

            <div style={styles.iconDiv}>
                <Tooltip title={'Add Shift'}>
                    <Icon sx={styles.addIcon} onClick={() => {
                        const newAllWeekShiftsObject = {...allWeekShiftsObject}
                        newAllWeekShiftsObject[day].shifts = [...newAllWeekShiftsObject[day].shifts, {
                            from: null,
                            to: null
                        }]
                        setAllWeeksShiftObject(newAllWeekShiftsObject)
                    }}><AddOutlined/>
                    </Icon>
                </Tooltip>
                {doesDayHaveShifts && <Tooltip title={'Delete Shift'}>
                    <Icon sx={styles.addIcon} onClick={() => {
                        let newArr = {...allWeekShiftsObject}
                        newArr[day].shifts?.splice(-1, 1)
                        setAllWeeksShiftObject(newArr)

                    }}><DeleteOutlined/>
                    < /Icon></Tooltip>}
            </div>

        </div>
    )
}


export default DayAndHour
