import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <>
            <h2>Registrieren</h2>
            <p>Schon ein Konto? <Link to="/login">Login</Link></p>
        </>
    )
}

export default RegisterPage;
