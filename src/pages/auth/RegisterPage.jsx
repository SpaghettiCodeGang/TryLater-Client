import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useLayout } from "../../hooks/useLayout.jsx";

const RegisterPage = () => {
    const { setHeadline } = useLayout();
    const { register, login, loading, error } = useAuth();
    const [ passwordConfirmError, setPasswordConfirmError ] = useState({})

    useEffect(() => {
        setHeadline("TryLater");
        return () => setHeadline("");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        setPasswordConfirmError({})

        if (password !== confirmPassword) {
            setPasswordConfirmError({ confirmPassword: "Passwörter stimmen nicht überein." });
            return;
        }

        const userData = {
            userName: form.userName.value.trim(),
            email: form.email.value.trim(),
            password: form.password.value.trim(),
        }

        const success = await register(userData);

        if (success) {
             const loginData = {
                 loginName: form.userName.value,
                 password: form.password.value,
             }

             await login(loginData);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userName" className="form-label"><strong>Benutzername</strong></label>
                    <input type="text" className={`form-control ${error?.userName ? 'is-invalid' : ''}`} id="userName" placeholder="Benutzername" />
                    <small className="text-danger ps-3 pe-3 d-inline-flex">{ error?.userName }</small>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label"><strong>E-Mail</strong></label>
                    <input type="email" className={`form-control ${error?.email ? 'is-invalid' : ''}`} id="email" placeholder="E-Mail" />
                    <small className="text-danger ps-3 pe-3 d-inline-flex">{ error?.email }</small>
                </div>
                <div>
                    <label htmlFor="password" className="form-label"><strong>Passwort</strong></label>
                    <input type="password" className={`form-control ${error?.password ? 'is-invalid' : ''}`} id="password" placeholder="Passwort" />
                    <small className="text-danger ps-3 pe-3 d-inline-flex">{ error?.password }</small>
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label"><strong>Passwort wiederholen</strong></label>
                    <input type="password" className={`form-control ${passwordConfirmError?.confirmPassword ? 'is-invalid' : ''}`} id="confirmPassword" placeholder="Passwort wiederholen" />
                    <small className="text-danger ps-3 pe-3 d-inline-flex">{ passwordConfirmError?.confirmPassword }</small>
                </div>
                <button className="btn btn-primary form-control" type="submit" disabled={ loading }>
                    {loading ? (
                        <>
                            <span className="btn-spinner me-2" />
                            <span>Sende...</span>
                        </>
                    ) : (
                        <span>Registrieren</span>
                    )}
                </button>
            </form>
            <p className="text-center mb-5">
                <small>Schon ein Account? <Link className="text-dark" to="/login"><strong>Hier Anmelden</strong></Link></small>
            </p>
        </>
    )
}

export default RegisterPage;
