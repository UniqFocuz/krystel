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

export const validatePreRegisterEmail = (email) => {
    return axios.get(`${baseURL}/validate-email`, {
            params: { email },
        });
    };



// Main API
const params = () => {
    return {
        headers: {
            Authorization : `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
}

// Auth API

export const pingLogin = () => {
    return axios.get(`${baseURL}/auth/login`, params())

}

export const login = (username, password) => {
    return axios.post(`${baseURL}/auth/login`, {username, password})
}

export const pingMfa = () => {
    return axios.get(`${baseURL}/auth/login/mfa`, params())
}

export const mfa = (otp) => {
    return axios.post(`${baseURL}/auth/login/mfa`, { otp }, params())
}

export const register = (email) => {
    return axios.post(`${baseURL}/auth/register`, { email })
}

// Application API
export const dashboard = () => {
    return axios.get(`${baseURL}/dashboard`, params())
}