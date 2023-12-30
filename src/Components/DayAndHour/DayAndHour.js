import {styles} from "./styles";
import {Button, Icon, Tooltip} from "@mui/material";
import {
    AddOutlined,
    DeleteOutlined
} from "@mui/icons-material";
import Shift from "../Shift/Shift";
import {
    PlusIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import {classNames} from "../../Utilities/utilities";

const DayAndHour = ({
                        setAllWeeksShiftObject,
                        allWeekShiftsObject,
                        day
                    }) => {
    const doesDayHaveShifts = allWeekShiftsObject[day].shifts.length > 0

    return (
        <div
            style={styles.day}
        >
            <span
                style={{
                    fontSize: '14px',
                    minWidth: '100px'

                }}
                className={'text-base sm:flex sm:items-center font-semibold leading-7  text-gray-900'}>{day}
            </span>
            {!doesDayHaveShifts &&
                <Tooltip title={'Add Shift'}>
                    <PlusIcon style={{justifySelf: "start"}}
                              onClick={() => {
                                  const newAllWeekShiftsObject = {...allWeekShiftsObject}
                                  newAllWeekShiftsObject[day].shifts = [...newAllWeekShiftsObject[day].shifts, {
                                      from: null,
                                      to: null
                                  }]
                                  setAllWeeksShiftObject(newAllWeekShiftsObject)
                              }}
                              className={classNames(
                                  'text-white rounded bg-indigo-600 hover:bg-indigo-500 h-6 w-6 shrink-0 '
                              )}/>
                </Tooltip>}

            <div style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                width: '100%',
            }}>
                {allWeekShiftsObject[day].shifts.length > 0 && allWeekShiftsObject[day]?.shifts?.map((shift, i) => (
                    <Shift day={day} index={i} key={i}
                           shift={allWeekShiftsObject?.[day].shifts?.[i]}
                           allWeeksShifts={allWeekShiftsObject}
                           setAllWeeksShiftObject={setAllWeeksShiftObject}/>

                ))}</div>


        </div>
    )
}


export default DayAndHour
