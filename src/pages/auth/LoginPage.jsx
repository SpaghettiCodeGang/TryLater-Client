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
            <h2>Login</h2>
            <p>Noch kein Konto? <Link to="/register">Registrieren</Link></p>
            <p className="text-center">
                <small>Noch kein Account? <Link className="text-black" to="/register"><strong>Hier Registrieren</strong></Link></small>
            </p>
        </>
    )
};

export default LoginPage;
