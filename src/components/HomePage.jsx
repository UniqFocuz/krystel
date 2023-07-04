import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


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