import {GoogleLogin} from 'react-google-login'
import {clientId} from "../../Utilities/utilities";
import GoogleIcon from '@mui/icons-material/Google';
import {gapi} from "gapi-script";
import {useDispatch} from "react-redux";
import {
    login,
    manualLogin
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    registerFunction
} from "../../Pages/LoginSignUpResetPass/actions";
import {
    setModalContent
} from "../../Features/modal/modal-slice";
import {registerUserUsingOAuth} from "./actions";

const OAuthGoogle = ({type}) => {
    const dispatch = useDispatch()
    const onSuccess = async (objectReturnedFromGoogle) => {
        if (objectReturnedFromGoogle) {
            if (type === 'login') {
                // tokenId

                const loginAction = await dispatch(login({
                    email: objectReturnedFromGoogle?.profileObj?.email,
                    password: null,
                    isFromOAuth2: true,
                    tokenId: objectReturnedFromGoogle?.tokenId

                }))

                // dispatch(manualLogin())}

            }
            if (type === 'register') {
                const res = await registerUserUsingOAuth(objectReturnedFromGoogle)
                console.log(res)
            }


        }
    }
    const onFailure = () => {
        console.log('fail')
    }

    const accessToken = gapi?.auth?.getToken()?.access_token;

    return (
        <GoogleLogin

            clientId={clientId}
            render={renderProps => {
                return (
                    <div
                        className={'flex w-full  border border-gray-900 rounded p-1 b cursor-pointer '}
                        onClick={renderProps.onClick}
                    >
                        <GoogleIcon/>
                        <span className={'pl-4'}>Sign in with Google</span>

                    </div>)
            }} onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single-host-origin'}
            isSignedIn={true}
        />
    )
}


export default OAuthGoogle
