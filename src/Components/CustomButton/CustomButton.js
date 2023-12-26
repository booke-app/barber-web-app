import styles from "./styles";

const CustomButton = ({innerText, customStyling}) => {


    return (<button style={customStyling ? customStyling : styles.button}>{innerText}</button>)
}


export default CustomButton
