import {
    registerFunction
} from "../../Pages/LoginSignUpResetPass/actions";

export const registerUserUsingOAuth = async (ObjectReturnedFromGoogle) => {
    //firstName, email, password, lastName
    const firstName = ObjectReturnedFromGoogle?.profileObj?.givenName
    const lastName = ObjectReturnedFromGoogle?.profileObj?.familyName
    const email = ObjectReturnedFromGoogle?.profileObj?.email
    const response = await registerFunction(firstName, email, null, lastName, true)

}
