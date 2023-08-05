import axios from "axios";

export const DEBUG = false

let baseURL = ""


if(DEBUG){
    baseURL = "http://localhost:8000/api"
}
else{
    baseURL = "https://api.krystel.io/api"
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

export const profileBuilderPing = () => {
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

export const mfaSettingsPing = () => {
    if(window.location.pathname === '/welcome'){
        return axios.get(`${baseURL}/auth/mfa/settings`, RegistrationParams())
    } else{
        return axios.get(`${baseURL}/auth/mfa/settings`, AccessParams())
    }
}

export const mfaAddNewDevice = () => {
    if(window.location.pathname === '/welcome'){
        return axios.post(`${baseURL}/auth/mfa/add`, {}, RegistrationParams())
    } else{
        return axios.post(`${baseURL}/auth/mfa/add`, {}, AccessParams())
    }
}

export const confirmNewDevice = (otp, id) => {
    if(window.location.pathname === '/welcome'){
        return axios.post(`${baseURL}/auth/mfa/confirm`, { otp, id }, RegistrationParams())
    } else{
        return axios.post(`${baseURL}/auth/mfa/confirm`, { otp, id }, AccessParams())
    }
}

export const mfaDeviceAction = (id, action) => {
    if(window.location.pathname === '/welcome'){
        return axios.post(`${baseURL}/auth/mfa/action`, { id, action }, RegistrationParams())
    } else{
        return axios.post(`${baseURL}/auth/mfa/action`, { id, action }, AccessParams())
    }
}

// Payment API

export const createDepositInvoice = (amount, name) => {
    if(window.location.pathname === '/welcome'){
        return axios.post(`${baseURL}/deposit/invoice/create`, { amount, name }, RegistrationParams())
    } else{
        return axios.post(`${baseURL}/deposit/invoice/create`, { amount, name }, AccessParams())
    }
}

export const depositPing = (type) => {
    if(window.location.pathname === '/welcome'){
        return axios.get(`${baseURL}/deposit/invoices?type=${type}`, RegistrationParams())
    } else{
        return axios.get(`${baseURL}/deposit/invoices?type=${type}`, AccessParams())
    }
}

export const verifyDeposit = (id) => {
    if(window.location.pathname === '/welcome'){
        return axios.get(`${baseURL}/plisio/verify?txnId=${id}`, RegistrationParams())
    } else{
        return axios.get(`${baseURL}/plisio/verify?txnId=${id}`, AccessParams())
    }
}

export const fetchWalletAddresFromNetwork = (id) => {
    if(window.location.pathname === '/welcome'){
        return axios.post(`${baseURL}/deposit/getAddress`, {id}, RegistrationParams())
    } else{
        return axios.post(`${baseURL}/deposit/getAddress`, {id}, AccessParams())
    }
}

export const setWalletAddress = (address) => {
    if(window.location.pathname === '/welcome'){
        return axios.post(`${baseURL}/profile/setAddress`, {address}, RegistrationParams())
    } else{
        return axios.post(`${baseURL}/profile/setAddress`, {address}, AccessParams())
    }
}

// Application API
export const dashboard = () => {
    return axios.get(`${baseURL}/dashboard`, {headers: {
        Authorization : `Bearer ${localStorage.getItem('accessToken')}`
    }})
}

export const harvestKrystel = () => {
    return axios.post(`${baseURL}/app/harvest`, {}, AccessParams())
}

export const purchaseKrystelizer = (username) => {
    return axios.post(`${baseURL}/facility/krystelizer`, {username}, AccessParams())
}

export const transferOre = (coordinate, amount) => {
    return axios.post(`${baseURL}/transfer`, { coordinate, amount }, AccessParams())
}

export const fetchTransactions = (query) => {
    return axios.get(`${baseURL}/logs?query=${query}`, AccessParams())
}

export const refillFuel = () => {
    return axios.post(`${baseURL}/app/refill`, {}, AccessParams())
}

export const fetchTree = (username) => {
    return axios.get(`${baseURL}/tree?username=${username}`, AccessParams())
}