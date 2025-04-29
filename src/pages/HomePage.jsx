import { Link } from 'react-router-dom';
import {useLayout} from "../hooks/useLayout.jsx";
import {useEffect} from "react";

const HomePage = () => {
    const { setHeadline } = useLayout();

    useEffect(() => {
        setHeadline("TryLater");
        return () => setHeadline("");
    }, []);

    return (
        <>
            <h2 className="mb-2 text-center">Empfehlen. Swipen. <br /> Entdecken</h2>

            <div className="d-flex justify-content-center my-4">
                <div  style={{ width: '150px' }}>
                    <img
                        src="/assets/Homepage-mainimage.png"
                        alt="Main"
                        className="img-fluid p z-2"
                    />
                    <img
                        src="/assets/Homepage-shadow.png"
                        alt="Shadow"
                        className=" mt-3 start-50 d-flex justify-content-center mg-fluid p z-2 z-1"
                        style={{ width: '100px'}}
                    />
                </div>
            </div>

            <Link to="/register">
            <button className="btn btn-primary form-control" type="submit">
                    <span>Jetzt Registrieren!</span>
            </button>
            </Link>

            <p className="text-center mb-5">
                <small>Schon ein Account? <Link className="text-black" to="/login"><strong>Hier Einloggen</strong></Link></small>
            </p>
        </>
    );
};

export default HomePage;