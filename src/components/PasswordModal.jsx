import { useEffect } from "react";

const PasswordModal = ({ onSubmit, password, setPassword  }) => {

    useEffect(() => {
        const passwordModal = document.getElementById('passwordModal');

        const handleModalShow = () => {
            setPassword("");
            setTimeout(() => {
                document.querySelector('#passwordModal input[type="password"]')?.focus();
            }, 50);
        };

        const handleModalHide = () => {
            setPassword("");
        }

        if (passwordModal) {
            passwordModal.addEventListener('shown.bs.modal', handleModalShow);
            passwordModal.addEventListener('hidden.bs.modal', handleModalHide);
        }

        return () => {
            if (passwordModal) {
                passwordModal.removeEventListener('shown.bs.modal', handleModalShow);
                passwordModal.removeEventListener('hidden.bs.modal', handleModalHide);
            }
        };
    }, [])

    return (
        <div className="modal fade" id="passwordModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={ onSubmit }>
                        <div className="modal-header">
                            <h2 className="modal-title">Passwort bestätigen</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Schließen"></button>
                        </div>
                        <div className="modal-body mb-3">
                            <p>Bitte gib dein Passwort ein, um die Änderungen zu bestätigen.</p>
                            <input type="password" className="form-control" value={password} placeholder="Passwort" required
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary form-control" data-bs-dismiss="modal">Abbrechen</button>
                            <button type="submit" className="btn btn-primary form-control">Bestätigen</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PasswordModal;