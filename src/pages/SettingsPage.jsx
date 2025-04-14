import { useLayout } from "../hooks/useLayout.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { useEffect } from "react";

const SettingsPage = () => {
    const { setHeadline } = useLayout();
    const { logout, loading, error } = useAuth();

    useEffect(() => {
        setHeadline("Einstellungen");
        return () => setHeadline("");
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
    };

    return (
        <>
            <p>Content</p>
            <button className="btn btn-secondary form-control p-2 d-flex align-items-center justify-content-center" onClick={handleLogout} disabled={ loading }>
                {loading ? (
                    <>
                        <span className="btn-spinner me-2" />
                        <strong>Sende...</strong>
                    </>
                ) : (
                    <strong>Ausloggen</strong>
                )}
            </button>
        </>
    )
}

export default SettingsPage;
