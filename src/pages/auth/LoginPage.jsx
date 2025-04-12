import { useLayout } from "../../hooks/useLayout.jsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const { setHeadline } = useLayout();

    useEffect(() => {
        setHeadline("TryLater");
    }, []);

    return (
        <>

            <p className="text-center">
                <small>Noch kein Account? <Link className="text-black" to="/register"><strong>Hier Registrieren</strong></Link></small>
            </p>
        </>
    )
};

export default LoginPage;
