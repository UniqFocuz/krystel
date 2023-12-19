import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import HomePage from "../components/HomePage";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import MFA from "../components/authentication/MFA";
import ProfileBuilder from "../components/authentication/ProfileBuilder";
import Logout from "../components/authentication/Logout";
import Facility from "../components/facility/Facility";
import Logs from "../components/logs/Logs";
import { dashboard } from "../lib/api";
import { useEffect } from "react";
import { setUserProfile } from "../redux/userProfile/actions";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import Transfer from "../components/transfer/Transfer";
import Tree from "../components/tree/Tree";
import Settings from "../components/settings/Settings";
import Payout from "../components/payout/Payout";
import Shift from "../components/shift/Shift";

function Routers(){
    const toast = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    useEffect(()=>{
        let whitelist = ["/login", "/register", "/logout", "/welcome", "/login/mfa"]
        !whitelist.includes(location.pathname) &&
        dashboard()
        .then((response) => {
            dispatch(setUserProfile(response.data.default))
        })
        .catch((error) => {
            if(error.response.status === 401){
                toast({
                    title: 'Session Expired',
                    variant: 'subtle',
                    status: 'error',
                })
                localStorage.removeItem('accessToken')
                navigate('/login')
                
            }
            if(error.response.status === 400){
                toast({
                    title: 'You are logged out!',
                    variant: 'subtle',
                    status: 'info',
                })
                localStorage.removeItem('accessToken')
            }
            if(error.response.status === 500){
                toast({
                    title: 'An unexpected error occured!',
                    variant: 'subtle',
                    status: 'warning',
                })
                localStorage.removeItem('accessToken')
                navigate('/login')
            }
        });
    },[location.pathname, dispatch, navigate, toast])
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/welcome" element={<ProfileBuilder/>}/>
            <Route path="/login/mfa" element={<MFA/>}/>

            {/* App Routes */}
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/facility" element={<Facility/>}/>
            <Route path="/logs" element={<Logs/>}/>
            <Route path="/transfer" element={<Transfer/>}/>
            <Route path="/shift" element={<Shift/>}/>
            <Route path="/laboratory" element={<Tree/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/payout" element={<Payout/>}/>
        </Routes>
    )
}

export default Routers;