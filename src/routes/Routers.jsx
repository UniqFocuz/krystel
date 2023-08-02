import { Route, Routes, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import Transfer from "../components/trasnfer/Transfer";

function Routers(){
    const toast = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
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
                navigate("/login")
            }
        });
    },[])
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
        </Routes>
    )
}

export default Routers;