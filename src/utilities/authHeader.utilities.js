
import { getItem } from "./localStorage.utilities"

export default function authHeader(){
    // grabbing the user from the local storage
    // local storage is provided by the browser
    // user now becomes the key that will get passed into the localStorage 
    const user = getItem('user')
    // check if user was in the local storage and if user has access token
    if(user && user.accessToken){
        // if so set 'x-access-token' to the access token that was found
        return { 'x-access-token': user.accessToken}
    } else {
        return {};
    }
}

