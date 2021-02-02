import axios from 'axios'
import { setItem, getItem, removeItem } from '../utilities/localStorage.utilities'

const API_URL = "http://localhost:8080/api/auth/"

// function to register a new User
const signup = (username, email, password) => {
    return axios.post(API_URL + 'signup', {
        username,
        email,
        password
    })
}

// login the User
const login = (username, password) => {
    return axios.post(API_URL + 'signin', {
        username,
        password
    })
    .then((response) => {
        // Check if the response of the user has accessToken
        if(response.data.accessToken) {
            setItem('user', response.data)
        }
        return response.data
    })
}

// Logout the User (remove all data)
const logOut = () => {
    removeItem('user')
}

//get the current user
const getCurrentUser = () => {
    return getItem('user')
}

export default {
    signup,
    login,
    logOut,
    getCurrentUser
}

