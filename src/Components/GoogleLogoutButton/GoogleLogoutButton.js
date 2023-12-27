import {GoogleLogout} from "react-google-login";
import {
    classNames,
    clientId
} from "../../Utilities/utilities";
import GoogleIcon from "@mui/icons-material/Google";
import {
    logout
} from "../../Features/authorizeUser/authorizeUser-slice";
import {
    ArrowRightEndOnRectangleIcon
} from "@heroicons/react/16/solid";
import {useDispatch} from "react-redux";

const GoogleLogoutButton = () => {
    const dispatch = useDispatch()
    const onSuccess = () => {
        dispatch(logout())

    };
    const onFailure = (e) => {
        console.log('failure', e)
    }
    return (
        <GoogleLogout
            render={renderProps => {
                console.log(renderProps, 'renderProds')
                return (
                    <span
                        onClick={() => renderProps.onClick()}
                        className={classNames(
                            'cursor-pointer text-indigo-200 hover:text-white hover:bg-indigo-700',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                    >
                        <ArrowRightEndOnRectangleIcon
                            className={classNames(
                                'text-indigo-200 group-hover:text-white',
                                'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                        />
                        Logout
                    </span>)
            }} onLogoutSuccess={onSuccess}
            onFailure={onFailure}
            clientId={clientId}/>
    )
}


export default GoogleLogoutButton
