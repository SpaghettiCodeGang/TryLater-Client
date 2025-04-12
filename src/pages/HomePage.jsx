import { Link } from 'react-router-dom';
import {useLayout} from "../hooks/useLayout.jsx";
import {useEffect} from "react";

const HomePage = () => {
    const { setHeadline } = useLayout();

    useEffect(() => {
        setHeadline("TryLater");
    }, []);

    return (
        <>
            <p className="text-center"><Link to="/login">Login</Link> oder <Link to="/register">Registrieren</Link></p>
        </>
    );
};

export default HomePage;
