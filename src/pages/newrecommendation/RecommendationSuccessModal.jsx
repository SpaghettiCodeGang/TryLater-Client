import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";

const RecommendationSuccessModal = ({ show, onClose }) => {
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
        modalInstanceRef.current?.hide(); // Modal schließen
        navigate("/home"); // oder die Route zu deiner Startseite anpassen
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
                        <h2 className="modal-title">Empfehlung verschickt!</h2>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Schließen"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body text-center">
                        <p className="h5">Deine Empfehlung wurde erfolgreich versendet! 🎉</p>
                        <p className="mt-2">Teile deine Freude mit deinen Kontakten!</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary form-control"
                            onClick={handleContinue}
                        >
                            Weiter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendationSuccessModal;