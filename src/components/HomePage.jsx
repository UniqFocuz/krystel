import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function HomePage(){

    const navigate = useNavigate()
    const gotoDashboard = () => {
        navigate('/dashboard')
    }
    return(
        <>
            <Button onClick={gotoDashboard}>Go to dashboard</Button>
        </>
    )
}

export default HomePage;