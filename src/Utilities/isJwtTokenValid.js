import jwt_decode from "jwt-decode";

export const isJwtTokenValid = (token) => {
    let isValid = false
    let decodedToken = jwt_decode(token);
    let currentDate = new Date();
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
    } else {
        console.log("Valid token");
        isValid = true;
    }

    return isValid
}
