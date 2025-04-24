import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import apiService from "../../service/apiService.jsx";
import { useEffect, useState } from "react";

const ContactViewOverlay = ({ activeOverlay, setActiveOverlay, contact, refetchContacts }) => {
    const [updateError, setUpdateError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [blockLoading, setBlockLoading] = useState(false);
    const loadingAnimationDuration = 500;
    const contactPartner = contact?.contactPartner;

    const isVisible = activeOverlay === 'contactView';

    useEffect(() => {
        if (!isVisible) {
            setUpdateError(null);
        }
    }, [isVisible]);

    const placeholderImg = "src/assets/profil.png";
    const imgSrc = contactPartner?.imgPath && contactPartner?.imgPath.trim() !== "" ? `${apiService.getBaseUrl()}/images/${contactPartner?.imgPath}` : placeholderImg;

    const handleBlockContact = async (contactId) => {
        setBlockLoading(true)
        try {
            await apiService.patch(`/contact/${contactId}`, { contactStatus: "BLOCKED" });
            await refetchContacts();
            setTimeout(() =>
                setActiveOverlay(null), loadingAnimationDuration);
        } catch (error) {
            setTimeout(() =>
                setUpdateError(error?.data?.message), loadingAnimationDuration);
        } finally {
            setTimeout(() =>
                setBlockLoading(false), loadingAnimationDuration);
        }
    }

    const handleDeleteContact = async (contactId) => {
        setDeleteLoading(true)
        try {
            await apiService.delete(`/contact/${contactId}`);
            await refetchContacts();
            setTimeout(() =>
                setActiveOverlay(null), loadingAnimationDuration);
        } catch (error) {
            setTimeout(() =>
                setUpdateError(error?.data?.message), loadingAnimationDuration);
        } finally {
            setTimeout(() =>
                setDeleteLoading(false), loadingAnimationDuration);
        }
    }

    return (
        <SlideInOverlay
            isVisible={activeOverlay === 'contactView'}
            onClose={() => setActiveOverlay(null)}
            title="Kontakt ansehen"
        >

            <div className="contact_view">
                <img className="contact_view__img" src={ imgSrc } alt={`${contactPartner?.displayName}`} />
                <div className="contact_view__data">
                    <div className="mb-4">
                        <label htmlFor="displayName" className="form-label"><strong>Anzeigename</strong></label>
                        <input type="text" className="form-control" id="displayName" placeholder={contactPartner?.displayName} disabled />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="userName" className="form-label"><strong>Benutzername</strong></label>
                        <input type="text" className="form-control" id="userName" placeholder={contactPartner?.userName} disabled />
                    </div>
                </div>

                <button className="btn btn-secondary form-control mb-2"
                        type="submit" disabled={ deleteLoading || blockLoading }
                        onClick={(e) => {
                            e.stopPropagation();
                            void handleBlockContact(
                                contact.contactId
                            );
                        }}
                >
                    {blockLoading ? (
                        <>
                            <span className="btn-spinner me-2" />
                            <span>Sende...</span>
                        </>
                    ) : (
                        <span>Kontakt blockieren</span>
                    )}
                </button>

                <button className="btn btn-secondary form-control mb-3"
                        type="submit" disabled={ deleteLoading || blockLoading }
                        onClick={(e) => {
                            e.stopPropagation();
                            void handleDeleteContact(
                                contact.contactId
                            );
                        }}
                >
                    {deleteLoading ? (
                        <>
                            <span className="btn-spinner me-2" />
                            <span>Sende...</span>
                        </>
                    ) : (
                        <span>Kontakt löschen</span>
                    )}
                </button>

                {updateError && <p className="text-center">{updateError}</p>}

            </div>
        </SlideInOverlay>
    );
}

export default ContactViewOverlay;