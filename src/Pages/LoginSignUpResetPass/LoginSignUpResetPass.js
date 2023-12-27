import styles from './styles'
import {
    Button,
    FormControl,
    Input,
    InputAdornment,
    InputLabel
} from "@mui/material";
import {
    LockOutlined,
    MailOutline,
    PersonOutlined
} from "@mui/icons-material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {
    login
} from '../../Features/authorizeUser/authorizeUser-slice'
import {registerFunction, resetPassword} from "./actions";
import {
    setModalContent
} from "../../Features/modal/modal-slice";
import OAuthGoogle
    from "../../Components/OAuthGoogle/OAuthGoogle";

const LoginSignUpResetPass = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const dispatch = useDispatch()
    const [responseObject, setResponseObject] = useState({})
    const loginText = 'login'
    const register = 'register'
    const resetPass = 'reset-pass'
    const [whichTypeOfActionDoesUserWantToDo, setWhichTypeOfActionDoesUserWantToDo] = useState('login')//login , register, reset-pass
    const loginUser = async () => {
        const loginAction = await dispatch(login({
            email,
            password
        }))
    }
    const resetPasswordAction = async () => {

    }
    const registerUser = async () => {
        const response = await registerFunction(firstName, email, password, lastName)
        dispatch(setModalContent({...response}))
    }


    return (
        <div style={styles.wrapper}>
            <div
                style={styles.title}>{whichTypeOfActionDoesUserWantToDo === loginText ? "Login" : whichTypeOfActionDoesUserWantToDo === resetPass ? 'Reset Password' : 'Sign Up'}</div>
            <div style={styles.form}>
                <div style={styles.inputField}>
                    <FormControl variant="standard">
                        <InputLabel>
                            Email
                        </InputLabel>
                        <Input
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            fullWidth={true}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment
                                    position="start">
                                    <MailOutline/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                {whichTypeOfActionDoesUserWantToDo === loginText &&
                    <div style={styles.inputField}>
                        <FormControl variant="standard">
                            <InputLabel>
                                Password
                            </InputLabel>
                            <Input
                                type='password'
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                fullWidth={true}
                                startAdornment={
                                    <InputAdornment
                                        position="start">
                                        <LockOutlined/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>}
                {whichTypeOfActionDoesUserWantToDo === register &&
                    <div style={styles.inputField}>
                        <FormControl variant="standard">
                            <InputLabel>
                                Password
                            </InputLabel>
                            <Input
                                type={'password'}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                fullWidth={true}
                                startAdornment={
                                    <InputAdornment
                                        position="start">
                                        <LockOutlined/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>


                        <div style={styles.inputField}>
                            <FormControl variant="standard">
                                <InputLabel>
                                    First Name
                                </InputLabel>
                                <Input
                                    onChange={(e) => setFirstName(e.currentTarget.value)}
                                    fullWidth={true}
                                    startAdornment={
                                        <InputAdornment
                                            position="start">
                                            <PersonOutlined/>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                        <FormControl variant="standard">
                            <InputLabel>
                                Last Name
                            </InputLabel>
                            <Input
                                onChange={(e) => setLastName(e.currentTarget.value)}
                                fullWidth={true}
                                startAdornment={
                                    <InputAdornment
                                        position="start">
                                        <PersonOutlined/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl></div>
                }

            </div>
            {(whichTypeOfActionDoesUserWantToDo === loginText || whichTypeOfActionDoesUserWantToDo === register) &&
                <OAuthGoogle
                    type={whichTypeOfActionDoesUserWantToDo === loginText ? 'login' : 'register'}/>}
            <Button fullWidth={true}
                    onClick={() => {

                        if (whichTypeOfActionDoesUserWantToDo === loginText) {
                            loginUser()
                        }
                        if (whichTypeOfActionDoesUserWantToDo === resetPass) {
                            resetPassword()
                        }
                        if (whichTypeOfActionDoesUserWantToDo === register) {
                            registerUser()
                        }


                    }}
                    variant="outlined">
                {whichTypeOfActionDoesUserWantToDo === loginText ? "Login" :
                    whichTypeOfActionDoesUserWantToDo === resetPass ? 'Reset Password' : 'Sign Up'}</Button>
            <div>
                {whichTypeOfActionDoesUserWantToDo === loginText &&
                    <div onClick={() => {
                        setWhichTypeOfActionDoesUserWantToDo(resetPass)
                    }} style={styles.forgotPassword}>Forgot
                        Password
                    </div>}
                {whichTypeOfActionDoesUserWantToDo === loginText ?
                    <div onClick={() => {
                        setWhichTypeOfActionDoesUserWantToDo(register)
                    }} style={styles.signUp}>Don't have an
                        account? Sign Up</div> :
                    <div onClick={() => {
                        setWhichTypeOfActionDoesUserWantToDo(loginText)
                    }} style={styles.signUp}>Back to
                        login</div>}
            </div>


        </div>)
}


export default LoginSignUpResetPass
