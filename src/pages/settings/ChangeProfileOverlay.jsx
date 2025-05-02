import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import useImageProcessor from "../../hooks/useImageProcessor.jsx";
import {useEffect, useRef, useState} from "react";
import { Modal } from 'bootstrap';
import apiService from "../../service/apiService.jsx";
import PasswordModal from "../../components/PasswordModal.jsx";
import { motion, AnimatePresence } from "framer-motion";

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
                isVisible={isVisible}
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
                        <input type="text" className={`form-control ${error?.errors?.displayName ? 'is-invalid' : ''}`} id="displayName" placeholder={user?.displayName} />
                        <small className="text-danger ps-3 pe-3 d-inline-flex">{ error?.errors?.displayName }</small>
                    </div>
                    <div>
                        <label htmlFor="userName" className="form-label"><strong>Benutzername</strong></label>
                        <input type="text" className={`form-control ${error?.errors?.userName ? 'is-invalid' : ''}`} id="userName" placeholder={user?.userName} />
                        <small className="text-danger ps-3 pe-3 d-inline-flex">{ error?.errors?.userName }</small>
                    </div>
                    <div>
                        <label htmlFor="email" className="form-label"><strong>E-Mail</strong></label>
                        <input type="email" className={`form-control ${error?.errors?.email ? 'is-invalid' : ''}`} id="email" placeholder={user?.email} />
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

            <AnimatePresence mode="wait">
                {isVisible && (
                    <motion.div
                        key="passwordModal"
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.5
                        }}
                    >
                        <PasswordModal
                            onSubmit={handlePasswordConfirm}
                            password={password}
                            setPassword={setPassword}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default ChangeProfileOverlay;