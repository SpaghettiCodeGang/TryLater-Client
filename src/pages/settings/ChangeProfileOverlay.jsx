import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import useImageProcessor from "../../hooks/useImageProcessor.jsx";
import {useEffect, useRef, useState} from "react";
import { Modal } from 'bootstrap';
import apiService from "../../service/apiService.jsx";

const ChangeProfileOverlay = ({ activeOverlay, setActiveOverlay, user, refetchUser, imgSrc }) => {
    const { processImage } = useImageProcessor({ targetWidth: 300, targetHeight: 300 });
    const [processedImage, setProcessedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(imgSrc);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [pendingUserData, setPendingUserData] = useState(null);
    const formRef = useRef(null);
    const loadingAnimationDuration = 500;

    const isVisible = activeOverlay === 'changeProfile';

    useEffect(() => {
        setPreviewUrl(imgSrc);
        setError(null);
        setProcessedImage(null);
        setPassword("");
        setPendingUserData(null);
        formRef.current?.reset();

        const passwordModal = document.getElementById('passwordModal');

        const handleModalShow = () => {
            setPassword("");
            setTimeout(() => {
                document.querySelector('#passwordModal input[type="password"]')?.focus();
            }, 50);
        };

        const handleModalHide = () => setPassword("");

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
    }, [isVisible]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const processedFile = await processImage(file);
            if (processedFile instanceof File) {
                setPreviewUrl(URL.createObjectURL(processedFile));
                setProcessedImage(processedFile);
            }
        }
    };

    const getChangedFields = (original, current) => {
        const result = {};
        for (const key in current) {
            if (current[key] && current[key] !== original[key]) {
                result[key] = current[key];
            }
        }
        return result;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const userData = {
            displayName: form.displayName.value.trim(),
            userName: form.userName.value.trim(),
            email: form.email.value.trim(),
        };

        const updatedUserData = getChangedFields(user, userData);

        if (updatedUserData.userName || updatedUserData.email) {
            setPendingUserData(updatedUserData);
            Modal.getOrCreateInstance(document.getElementById('passwordModal')).show();
            return;
        }

        await completeUpdate(updatedUserData);
    };

    const handlePasswordConfirm = async (e) => {
        e.preventDefault();
        Modal.getInstance(document.getElementById('passwordModal')).hide();

        if (!pendingUserData) return;

        const updatedUserData = {
            ...pendingUserData,
            currentPassword: password,
        };

        await completeUpdate(updatedUserData);
    };

    const completeUpdate = async (updatedUserData) => {
        setLoading(true);
        try {
            if (processedImage) {
                const imgUploadResponse = await apiService.post("/image", processedImage);
                updatedUserData.imgPath = imgUploadResponse.imgPath;
            }

            await apiService.patch("/user/me", updatedUserData);
            await refetchUser();
            setActiveOverlay(null);
        } catch (error) {
            setTimeout(() =>
                setError(error?.data), loadingAnimationDuration);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, loadingAnimationDuration);
        }
    }

    return (
        <>
            <SlideInOverlay
                isVisible={activeOverlay === 'changeProfile'}
                onClose={() => setActiveOverlay(null)}
                title="Profil bearbeiten"
            >
                <form ref={formRef} onSubmit={handleSubmit}>
                    <label className="settings_profile__img-upload">
                        <img src={previewUrl?.toString()} alt="Vorschau"/>
                        <small>Profilbild ändern</small>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </label>

                    <div>
                        <label htmlFor="displayName" className="form-label"><strong>Anzeigename</strong></label>
                        <input type="text" className="form-control" id="displayName" placeholder={user?.displayName} />
                        <small className="text-danger ps-3 pe-3 d-inline-flex">{ error?.errors?.displayName }</small>
                    </div>
                    <div>
                        <label htmlFor="userName" className="form-label"><strong>Benutzername</strong></label>
                        <input type="text" className="form-control" id="userName" placeholder={user?.userName} />
                        <small className="text-danger ps-3 pe-3 d-inline-flex">{ error?.errors?.userName }</small>
                    </div>
                    <div>
                        <label htmlFor="email" className="form-label"><strong>E-Mail</strong></label>
                        <input type="email" className="form-control" id="email" placeholder={user?.email} />
                        <small className="text-danger ps-3 pe-3 d-inline-flex">{ error?.errors?.email }</small>
                    </div>

                    <div className="mb-4 d-flex justify-content-center">
                        <small className="text-danger ps-3 pe-3 d-inline-flex">{ error?.errors?.currentPassword || error?.message }</small>
                    </div>

                    <button className="btn btn-primary form-control" type="submit" disabled={ loading }>
                        {loading ? (
                            <>
                                <span className="btn-spinner me-2" />
                                <span>Sende...</span>
                            </>
                        ) : (
                            <span>Speichern</span>
                        )}
                    </button>
                </form>
            </SlideInOverlay>

            <div className="modal fade" id="passwordModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={handlePasswordConfirm}>
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
        </>
    )
}

export default ChangeProfileOverlay;