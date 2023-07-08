import axios from "axios";

export const DEBUG = true

let baseURL = ""


if(DEBUG){
    baseURL = "http://localhost:8000/api"
}
else{
    baseURL = "http://localhost:8000/api"
}

// Support API

export const validateUsername = (username) => {
    return axios.get(`${baseURL}/validate-username`, {
            params: { username },
        });
    };

export const validatePatron = (patron) => {
    return axios.get(`${baseURL}/validate-patron`, {
            params: { patron },
        });
    };

export const validatePreRegisterEmail = (email) => {
    return axios.get(`${baseURL}/validate-email`, {
            params: { email },
        });
    };

// Main API
const AccessParams = () => {
    return {
        headers: {
            Authorization : `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
}

const RegistrationParams = () => {
    return {
        headers: {
            Authorization : `Bearer ${localStorage.getItem('registrationToken')}`
        }
    }
}

// Auth API

export const pingLogin = () => {
    return axios.get(`${baseURL}/auth/login`, AccessParams())

}

export const login = (username, password) => {
    return axios.post(`${baseURL}/auth/login`, {username, password})
}

export const pingMfa = () => {
    return axios.get(`${baseURL}/auth/login/mfa`, AccessParams())
}

export const mfa = (otp) => {
    return axios.post(`${baseURL}/auth/login/mfa`, { otp }, AccessParams())
}

export const register = (email) => {
    return axios.post(`${baseURL}/auth/register`, { email })
}

export const pingProfileBuilder = () => {
    return axios.get(`${baseURL}/auth/profile`, RegistrationParams())
}

export const setPassword = (password) => {
    return axios.post(`${baseURL}/auth/set-password`, { password }, RegistrationParams())
}

export const sendVerificationLink = () => {
    return axios.post(`${baseURL}/auth/send-verification`, {}, RegistrationParams())
}

export const profileBuilder = (data) => {
    return axios.post(`${baseURL}/auth/profile`, data, RegistrationParams())
}



// Application API
export const dashboard = () => {
    return axios.get(`${baseURL}/dashboard`, AccessParams())
}