import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import HomePage from "../components/HomePage";
import Login from "../components/authentication/Login";
import MFA from "../components/authentication/MFA";

function Routers(){
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/login/mfa" element={<MFA/>}/>
        </Routes>
    )
}

export default Routers;