import {FormControl, MenuItem, Select} from "@mui/material";
import styles from "./styles";

const RepeatComponent = ({setVacationLocalObject, vacation, repeat}) => {

    return (
        <div style={styles.wrapper}>
            <p style={styles.text}>Repeat: </p>
            <FormControl fullWidth>
                <Select
                    defaultValue={'no'}
                    value={repeat}
                    onChange={(e) => {
                        setVacationLocalObject({...vacation, repeat: e.target.value})
                    }}>
                    <MenuItem value={'no'}>No</MenuItem>
                    <MenuItem value={'weekly'}>Weekly</MenuItem>
                    <MenuItem value={'monthly'}>Monthly</MenuItem>

                </Select>

            </FormControl>
        </div>
    )
}


export default RepeatComponent
