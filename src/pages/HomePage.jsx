import { Link } from 'react-router-dom';
import {useLayout} from "../hooks/useLayout.jsx";
import {useEffect} from "react";
import { motion } from "framer-motion";

const HomePage = () => {
    const { setHeadline } = useLayout();

    useEffect(() => {
        setHeadline("TryLater");
        return () => setHeadline("");
    }, []);

    return (
        <>
            <h2 className="position-relative start-50 translate-middle-x text-center" style={{ top: '-2.5rem' }}>
                Empfehlen. Swipen. <br /> Entdecken
            </h2>


            <div className="d-flex flex-column align-items-center my-4">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="col-4"
                >
                    <img
                        src="/assets/Homepage-mainimage.png"
                        alt="Main"
                        className="img-fluid z-2"
                    />
                </motion.div>

                <motion.div
                    animate={{ scale: [1, 0.95, 1] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="mt-3 col-3"
                >
                    <img
                        src="/assets/Homepage-shadow.png"
                        alt="Shadow"
                        className="img-fluid"
                    />
                </motion.div>
            </div>

            <Link to="/register">
            <button className="btn btn-primary form-control" type="submit">
                    <span>Jetzt Registrieren!</span>
            </button>
            </Link>

            <p className="text-center mb-5">
                <small>Schon ein Account? <Link className="text-dark" to="/login"><strong>Hier Einloggen</strong></Link></small>
            </p>
        </>
    );
};

export default HomePage;