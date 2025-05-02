import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import {useEffect, useRef, useState} from "react";
import apiService from "../../service/apiService.jsx";

const ChangePasswordOverlay = ({activeOverlay, setActiveOverlay}) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);
    const loadingAnimationDuration = 500;

    const isVisible = activeOverlay === 'changePassword';

    useEffect(() => {
        if (isVisible) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setError(null);
            formRef.current?.reset();
        }
    }, [isVisible]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const form = e.target;

        currentPassword: form.password.value.trim();

        if (currentPassword !== form.password.value.trim) {}

        if (newPassword !== confirmPassword) {
            setError({message: "Die neuen Passwörter stimmen nicht überein."});
            return;
        }

        setLoading(true);
        try {
            const response = await apiService.patch("/user/me/password", {
                currentPassword,
                newPassword
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Unbekannter Fehler beim Passwortwechsel");
            }

            setActiveOverlay(null);
        } catch (error) {
            console.error("Password change error:", error);

            let errorMessage = "Ein Fehler ist aufgetreten";

            if (error.message.includes("Failed to fetch")) {
                errorMessage = "Verbindung zum Server fehlgeschlagen";
            } else if (error.message.includes("404")) {
                errorMessage = "Passwort-Änderungs-Endpunkt nicht gefunden";
            } else if (error.message.includes("401")) {
                errorMessage = "Aktuelles Passwort ist falsch";
            } else if (error.message) {
                errorMessage = error.message;
            }

            setError({message: errorMessage});
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, loadingAnimationDuration);
        }
    };

    return (
        <SlideInOverlay
            isVisible={isVisible}
            onClose={() => setActiveOverlay(null)}
            title="Passwort ändern"
        >
            <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">
                        <strong>Aktuelles Passwort</strong>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                        <strong>Neues Passwort</strong>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                        <strong>Neues Passwort bestätigen</strong>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>

                {error && (
                    <div className="mb-4 d-flex justify-content-center">
                        <small className="text-danger ps-3 pe-3 d-inline-flex">
                            {error.message}
                        </small>
                    </div>
                )}

                <button className="btn btn-primary form-control" type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="btn-spinner me-2"/>
                            <span>Sende...</span>
                        </>
                    ) : (
                        <span>Passwort ändern</span>
                    )}
                </button>
            </form>
        </SlideInOverlay>
    );
};

export default ChangePasswordOverlay;