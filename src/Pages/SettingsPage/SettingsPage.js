import styles from './styles'
import ShopContainer from "../../Components/ShopContainer/ShopContainer";
import OpenHoursWrapper from "../../Components/OpenHoursWrapper/OpenHoursWrapper";
import BusinessHoursTable
    from "../../Components/BusinessHoursTable/BusinessHoursTable";

const SettingsPage = () => {


    return (<div style={styles.wrapper}><BusinessHoursTable/></div>)
}


export default SettingsPage
