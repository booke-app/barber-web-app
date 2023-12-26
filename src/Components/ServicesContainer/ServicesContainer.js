import styles from "./styles";
import ServiceSlot from "../ServiceSlot/ServiceSlot";
import {useSelector} from "react-redux";

const ServicesContainer = () => {
    const services = useSelector(state => state.authorizeUser.shop.services)


    return (<div style={styles.wrapper}>
        <div style={styles.slotsWrapper}><p style={styles.mainTitle}>All
            Services</p>
            {services?.map((service, i) => <ServiceSlot data={service} key={i}/>)}
        </div>

    </div>)
}


export default ServicesContainer
