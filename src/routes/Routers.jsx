import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import HomePage from "../components/HomePage";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import MFA from "../components/authentication/MFA";
import ProfileBuilder from "../components/authentication/ProfileBuilder";
import Logout from "../components/authentication/Logout";
import Facility from "../components/facility/Facility";

function Routers(){
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
        </Routes>
    )
}

export default Routers;