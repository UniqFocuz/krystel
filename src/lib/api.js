import axios from "axios";

export const DEBUG = true

let baseURL = ""


if(DEBUG){
    baseURL = "http://localhost:8000/api"
}
else{
    baseURL = "http://localhost:8000/api"
}

export const validateUsername = (username) => {
    return axios.get(`${baseURL}/validate-username`, {
        params: { username: username },
      });
  };

const params = () => {
    return {
        headers: {
            Authorization : `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
}

export const pingLogin = () => {
    return axios.get(`${baseURL}/auth/login`, params())

}

export const login = (creds) => {
    return axios.post(`${baseURL}/auth/login`, {
        username : creds.username,
        password : creds.password,
    })
}

export const dashboard = () => {
    return axios.get(`${baseURL}/dashboard`, params())
}

export const pingMfa = () => {
    return axios.get(`${baseURL}/auth/login/mfa`, params())
}

export const mfa = (otp) => {
    return axios.post(`${baseURL}/auth/login/mfa`, {
        otp: otp
        }, params())
}