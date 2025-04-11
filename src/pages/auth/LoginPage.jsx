import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <>
            <h2>Login</h2>
            <p>Noch kein Konto? <Link to="/register">Registrieren</Link></p>
        </>
    )
};

export default LoginPage;
