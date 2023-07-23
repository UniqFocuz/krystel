import { useNavigate } from "react-router-dom"

function Logout(){
    const navigate = useNavigate()
    localStorage.removeItem('accessToken')
    navigate('/login')
}

export default Logout;