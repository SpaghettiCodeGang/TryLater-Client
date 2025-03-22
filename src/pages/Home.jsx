import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <h1>Willkommen</h1>
            <p><Link to="/login">Login</Link> oder <Link to="/register">Registrieren</Link></p>
        </>
    );
};

export default Home;
