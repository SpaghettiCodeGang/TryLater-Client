import { Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    return (
        <>
            <h2>Login</h2>
            <p>Noch kein Konto? <Link to="/register">Registrieren</Link></p>
        </>
    )
};

export default Login;
