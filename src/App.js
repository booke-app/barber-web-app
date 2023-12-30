import Dashboard from "./Pages/Dashboard/Dashboard";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {
    AdapterDayjs
} from '@mui/x-date-pickers/AdapterDayjs'
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme'
import LoginSignUpResetPass
    from "./Pages/LoginSignUpResetPass/LoginSignUpResetPass";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    getPersonalData,
    getShop,
    logout,
    manualLogin, setUpdatedAppointments
} from "./Features/authorizeUser/authorizeUser-slice";
import {isJwtTokenValid} from "./Utilities/isJwtTokenValid";
import {
    Link,
    Route,
    Routes,
    useNavigate
} from "react-router-dom";
import WorkersPage from "./Pages/WorkersPage/WorkersPage";
import ServicesPage
    from "./Pages/ServicesPage/ServicesPage";
import SettingsPage
    from "./Pages/SettingsPage/SettingsPage";
import VacationPage
    from "./Pages/VacationPage/VacationPage";
import {Backdrop, CircularProgress} from "@mui/material";
import AlertComponent
    from "./Components/AlertComponent/AlertComponent";
import {getBookings} from "./actions";
import {setGlobalLoading} from "./Features/ui/ui-slice";
import {
    Bars3Icon,
    HomeIcon,
    UsersIcon,
    QueueListIcon,
    Cog6ToothIcon,
    PauseIcon
} from "@heroicons/react/24/outline";
import DesktopNavigationSideBar
    from "./Components/DesktopNavigationSideBar/DesktopNavigationSideBar";
import MobileNavigationSideBar
    from "./Components/MobileNavigationSideBar/MobileNavigationSideBar";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import {
    setModalContent
} from "./Features/modal/modal-slice";
import {clientId} from "./Utilities/utilities";
import {gapi} from "gapi-script";

const urls = [{
    name: 'Calendar',
    path: '/calendar',
    icon: HomeIcon
}, {
    name: 'Workers',
    path: '/workers',
    icon: UsersIcon
}, {
    name: 'Services',
    path: '/services',
    icon: QueueListIcon
}, {
    name: 'Settings',
    path: '/settings',
    icon: Cog6ToothIcon
}, {name: 'Vacations', path: '/vacation', icon: PauseIcon},]


function App() {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const isLoggedIn = useSelector(
        (state) => state.authorizeUser.isLoggedIn
    );

    const navigation = useNavigate()
    let accessToken = JSON?.parse(localStorage.getItem('accessToken'))
    const dispatch = useDispatch()
    const shopId = useSelector(state => state.authorizeUser?.shop?._id)
    const isLoading = useSelector(state => state.authorizeUser?.isLoading)
    const isGlobalLoading = useSelector(state => state.userInterface.isGlobalLoading)
    const personalInfo = useSelector(state => state.authorizeUser.userData)

    const updateTheBookings = async () => {
        if (isLoggedIn) {
            try {
                const res = await getBookings({shopId: shopId})
                dispatch(setUpdatedAppointments(res))
            } catch (e) {

            }
        }

    }

    useEffect(() => {
        if (isLoggedIn && window.location.pathname === '/') {
            navigation('/calendar')
        }

    }, [isLoggedIn]);

    useEffect(() => {
            setInterval(() => {
                updateTheBookings()
            }, 150000)
            if (accessToken) {
                let isValidToken = isJwtTokenValid(accessToken)
                if (isValidToken) {
                    dispatch(manualLogin(true))
                    dispatch(getShop())
                    dispatch(getPersonalData())

                } else {
                    dispatch(logout())
                }
            }
        }
        , [])
    useEffect(() => {
            dispatch(setGlobalLoading(isLoading))
        }
        , [isLoading])


    useEffect(() => {
        function start() {
            gapi.client.init({
                    clientId: clientId,
                    scope: 'openid'
                }
            )
        }

        gapi.load('client:auth2', start
        )
        if (isLoggedIn) {
            let interval = setInterval(() => {
                if (accessToken) {
                    let isValid = isJwtTokenValid(accessToken)
                    if (!isValid) {
                        dispatch(logout())
                        localStorage.removeItem('accessToken')
                        dispatch(setModalContent({
                            message: 'Your connection timed out, please log in again',
                            status: 500
                        }))
                        clearInterval(interval)

                    }


                }

            }, 5000)
        }
    }, []);
    useEffect(() => {

        if (isLoggedIn) {
            let interval = setInterval(() => {
                if (accessToken) {
                    let isValid = isJwtTokenValid(accessToken)
                    if (!isValid) {
                        dispatch(logout())
                        localStorage.removeItem('accessToken')
                        dispatch(setModalContent({
                            message: 'Your connection timed out, please log in again',
                            status: 500
                        }))
                        clearInterval(interval)

                    }


                }

            }, 5000)
        }
    }, [isLoggedIn]);


    return (

        <ThemeProvider theme={theme}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}>
                <AlertComponent/>
                {!isLoggedIn && <LoginSignUpResetPass/>}
                {isLoggedIn && <div>
                    <MobileNavigationSideBar urls={urls}
                                             setSidebarOpen={setSidebarOpen}
                                             sidebarOpen={sidebarOpen}/>
                    {/* Static sidebar for desktop */}
                    <DesktopNavigationSideBar urls={urls}/>

                    <div
                        className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                        <button type="button"
                                className="-m-2.5 p-2.5 text-indigo-200 lg:hidden"
                                onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6"
                                       aria-hidden="true"/>
                        </button>
                        <div
                            className="flex-1 text-sm font-semibold leading-6 text-white">Menu
                        </div>
                        <Link to={'/profile'} href="#">
                            <span className="sr-only">Your profile</span>
                            {!personalInfo?.profilePhotoUrl ?
                                <UserCircleIcon
                                    className="h-8 w-8 text-gray-300"
                                    aria-hidden="true"/> :
                                <img
                                    style={{
                                        objectFit: 'cover'
                                    }}
                                    className="h-8 w-8 rounded-full bg-indigo-700"
                                    src={personalInfo.profilePhotoUrl}
                                    alt=""
                                />}
                        </Link>
                    </div>

                    <main className="py-10 lg:pl-72">
                        <div
                            className="px-4 sm:px-6 lg:px-8">
                            <Routes>
                                <Route path="/calendar"
                                       element={
                                           <Dashboard/>}/>
                                <Route path="/services"
                                       element={
                                           <ServicesPage/>}/>
                                <Route path="/workers"
                                       element={
                                           <WorkersPage/>}/>
                                <Route path="/settings"
                                       element={
                                           <SettingsPage/>}/>
                                <Route path="/vacation"
                                       element={
                                           <VacationPage/>}/>
                                <Route path="/profile"
                                       element={
                                           <ProfilePage/>}/>
                            </Routes>
                        </div>
                    </main>
                </div>}

            </LocalizationProvider>
        </ThemeProvider>


    );
}

export default App;
