import { Link } from 'react-router-dom';
import {useLayout} from "../../hooks/useLayout.jsx";
import {useEffect} from "react";

const RegisterPage = () => {
    const { setHeadline } = useLayout();

    useEffect(() => {
        setHeadline("TryLater");
        return () => setHeadline("");
    }, []);

    return (
        <>
            <p className="text-center">
                <small>Schon ein Account? <Link className="text-black" to="/login"><strong>Hier Anmelden</strong></Link></small>
            </p>
        </>
    )
}

export default RegisterPage;
