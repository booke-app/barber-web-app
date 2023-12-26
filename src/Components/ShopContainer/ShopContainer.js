import {useSelector} from "react-redux";
import styles from './styles'

const ShopContainer = () => {
    const nameOfShop = useSelector(state => state.authorizeUser.shop.name)
    const phone = useSelector(state => state.authorizeUser.shop.phone)
    const shopId = useSelector(state => state.authorizeUser.shop._id)
    return (
        <div style={styles.wrapper}>
            <p style={styles.mainTitle}>Shop Details</p>
            <div style={styles.innerDiv}>
                <div style={styles.inlineTitleContent}><p style={styles.title}>Name Of Shop:</p> {nameOfShop}</div>
                <div style={styles.inlineTitleContent}><p style={styles.title}>Phone:</p> {phone}</div>
                <div style={styles.inlineTitleContent}><p style={styles.title}>Id:</p> {shopId}</div>
            </div>
        </div>


    )
}

export default ShopContainer
