import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import HomePage from "../components/HomePage";

function Routers(){
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    )
}

export default Routers;