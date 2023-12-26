import {FormControl, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setTypeOfView} from "../../Features/typeOfView/typeOfView-slice";
import theme from "../../theme";

const SelectTypeOfView = () => {
    const dispatch = useDispatch()
    const currentTypeOfView = useSelector(state => state.typeOfView.typeOfView)
    const workersFromShop = useSelector(state => state.authorizeUser.shop.workers)
    return (
        <FormControl
        >
            <Select
                sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                    fill: "white",
                    background: theme.palette.primary.main,
                    color: 'white',
                    fontWeight: 'bolder',
                    '& .MuiSvgIcon-root': {
                        color: 'white',
                    }
                }}
                defaultValue={1}
                value={currentTypeOfView}
                onChange={(e) => {
                    dispatch(setTypeOfView(e.target.value))
                }}>
                <MenuItem sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'bolder'
                }} value={1}>Single View</MenuItem>

                {workersFromShop.length >= 2 && <MenuItem sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'bolder'
                }} value={2}>Double View</MenuItem>}
                {workersFromShop.length > 2 && <MenuItem sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'bolder'
                }} value={3}>Triple View</MenuItem>}
            </Select>

        </FormControl>)
}


export default SelectTypeOfView
