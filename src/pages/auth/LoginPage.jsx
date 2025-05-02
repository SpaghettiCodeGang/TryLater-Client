import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useLayout } from "../../hooks/useLayout.jsx";

const LoginPage = () => {
    const { setHeadline } = useLayout();
    const { login, loading, error } = useAuth();

    useEffect(() => {
        setHeadline("TryLater");
        return () => setHeadline("");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const userData = {
            loginName: form.loginName.value.trim(),
            password: form.password.value.trim(),
        }

        await login(userData);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <label htmlFor="loginName" className="form-label">Benutzername oder E-Mail</label>
                    <input type="text" className={`form-control ${error?.message ? 'is-invalid' : ''}`} id="loginName" placeholder="Benutzername oder E-Mail" />
                    <small className="text-danger ps-3 pe-3 d-inline-flex">{ error?.message }</small>
                </div>
                <div style={{ marginBottom: "10rem" }}>
                    <label htmlFor="password" className="form-label">Passwort</label>
                    <input type="password" className={`form-control ${error?.message ? 'is-invalid' : ''}`} id="password" placeholder="Passwort" />
                </div>
                <button className="btn btn-primary form-control" type="submit" disabled={ loading }>
                    {loading ? (
                        <>
                            <span className="btn-spinner me-2" />
                            <span>Sende...</span>
                        </>
                    ) : (
                        <span>Login</span>
                    )}
                </button>
            </form>
            <p className="text-center mb-5">
                <small>Noch kein Account? <Link className="text-dark" to="/register"><strong>Hier Registrieren</strong></Link></small>
            </p>
        </>
    )
};

export default LoginPage;
