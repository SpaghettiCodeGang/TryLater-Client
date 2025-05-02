import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import {useEffect, useRef, useState} from "react";
import apiService from "../../service/apiService.jsx";
import {BootstrapIcons} from "../../components/BootstrapIcons.jsx";

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

        if (newPassword !== confirmPassword) {
            setError({message: "Die neuen Passwörter stimmen nicht überein."});
            return;
        }

        setLoading(true);
        try {
           await apiService.patch("/user/me", {
                currentPassword: currentPassword,
                newPassword: newPassword
            });

            setActiveOverlay(null);
        } catch (error) {
            setError(error?.data?.errors?.newPassword);
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
                        <BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{ marginLeft: "0.5rem", paddingBottom: "0.1rem" }} />
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value.trim())}
                        required
                        autoComplete="current-password"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                        <strong>Neues Passwort</strong>
                        <BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{ marginLeft: "0.5rem", paddingBottom: "0.1rem" }} />
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value.trim())}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                        <strong>Neues Passwort bestätigen</strong>
                        <BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{ marginLeft: "0.5rem", paddingBottom: "0.1rem" }} />
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value.trim())}
                        required
                        autoComplete="new-password"
                    />
                </div>

                {error && (
                    <div className="mb-4 d-flex justify-content-center">
                        <small className="text-danger ps-3 pe-3 d-inline-flex">
                            {error}
                        </small>
                    </div>
                )}

                <button className="btn btn-primary form-control mt-5" type="submit" disabled={loading}>
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