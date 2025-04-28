import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";

const RecommendationSuccessModal = ({ show, onClose, isError = false }) => {
    const modalRef = useRef(null);
    const modalInstanceRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (modalRef.current) {
            modalInstanceRef.current = Modal.getOrCreateInstance(modalRef.current);
        }
    }, []);

    useEffect(() => {
        const modal = modalInstanceRef.current;
        if (modal) {
            if (show) {
                modal.show();
            } else {
                modal.hide();
            }
        }
    }, [show]);

    useEffect(() => {
        const modalElement = modalRef.current;
        if (!modalElement) return;

        const handleHidden = () => {
            onClose();
        };

        modalElement.addEventListener('hidden.bs.modal', handleHidden);

        return () => {
            modalElement.removeEventListener('hidden.bs.modal', handleHidden);
        };
    }, [onClose]);

    const handleContinue = () => {
        modalInstanceRef.current?.hide();
        if (!isError) {
            navigate("/home"); // nur bei Erfolg weiterleiten
        }
        // bei Fehler passiert nichts, Modal schließt nur
    };

    return (
        <div
            className="modal fade"
            id="recommendationSuccessModal"
            tabIndex="-1"
            aria-hidden="true"
            ref={modalRef}
            style={{ zIndex: 4000 }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">
                            {isError ? "Fehler aufgetreten" : "Empfehlung verschickt!"}
                        </h2>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Schließen"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body text-center">
                        {isError ? (
                            <>
                                <p className="h5">Beim Versenden der Empfehlung ist ein Fehler aufgetreten.</p>
                                <p className="mt-2">Bitte überprüfe deine Eingaben und versuche es erneut.</p>
                            </>
                        ) : (
                            <>
                                <p className="h5">Deine Empfehlung wurde erfolgreich versendet!</p>

                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className={`btn ${isError ? 'btn-danger' : 'btn-primary'} form-control`}
                            onClick={handleContinue}
                        >
                            {isError ? "Zurück" : "Weiter"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendationSuccessModal;
