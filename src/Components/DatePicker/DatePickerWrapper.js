import {ArrowLeftIcon, ArrowRightIcon, DatePicker} from "@mui/x-date-pickers";
import datePickerStyles from "./styles";
import {IconButton} from "@mui/material";
import dayjs from 'dayjs';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedDate} from "../../Features/calendar/calendar-slice";
import theme from "../../theme";

let isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)
let isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)

dayjs().isToday()
const DatePickerWrapper = () => {
    const dispatch = useDispatch()
    const selectedDate = useSelector(state => state.calendar.selectedDate)
    return (
        <div style={datePickerStyles.wrapper}>

            <IconButton
                disbled={!dayjs(dayjs(selectedDate).subtract(1, 'd')).isBefore(dayjs(Date.now()), 'day')}
                onClick={() => {

                    if (!dayjs(dayjs(selectedDate).subtract(1, 'd')).isBefore(dayjs(Date.now()), 'day')) {
                        dispatch(setSelectedDate(dayjs(selectedDate).subtract(1, 'd')))

                    }
                }}><ArrowLeftIcon/></IconButton>
            <DatePicker
                slotProps={{
                    textField: {
                        size: "small",
                        error: false,
                    },
                }}
                closeOnSelect={true}
                disablePast
                format="DD-MM-YYYY"
                defaultValue={dayjs(Date.now())}
                value={dayjs(selectedDate)}
                onChange={
                    (e) => {
                        dispatch(setSelectedDate({...e}))
                    }
                }
                sx={{
                    '& .MuiOutlinedInput-root': {

                        '& fieldset': {
                            padding: 0,
                            borderColor: 'transparent',
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'transparent',
                        }
                    },
                }}
            />
            <IconButton onClick={() => {
                dispatch(setSelectedDate(dayjs(selectedDate).add(1, 'd')))
            }}><ArrowRightIcon/></IconButton>

        </div>
    )
}


export default DatePickerWrapper
