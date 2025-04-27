import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import Contact from "../../components/Contact.jsx";
import { BootstrapIcons } from "../../components/BootstrapIcons.jsx";
import apiService from "../../service/apiService.jsx";
import { useState } from "react";

const ContactRequestOverlay = ({ activeOverlay, setActiveOverlay, incomingContactRequests, refetchIncomingRequests, refetchContacts }) => {
    const [updateError, setUpdateError] = useState(null);

    const handleAddContact = async (contactId) => {
        try {
            await apiService.patch(`/contact/${contactId}`, { contactStatus: "ACCEPTED" });
            await refetchIncomingRequests();
            await refetchContacts();
            if (incomingContactRequests?.length === 1) setActiveOverlay(null)
        } catch (error) {
            setUpdateError(error?.data?.message);
        }
    }

    const handleDeleteContact = async (contactId) => {
        try {
            await apiService.delete(`/contact/${contactId}`);
            await refetchIncomingRequests();
            await refetchContacts();
            if (incomingContactRequests?.length === 1) setActiveOverlay(null)
        } catch (error) {
            setUpdateError(error?.data?.message);
        }
    }

    return (
        <SlideInOverlay
            isVisible={activeOverlay === 'contactRequests'}
            onClose={() => setActiveOverlay(null)}
            title="Deine Anfragen"
        >
            {updateError && <p className="text-center">{updateError}</p>}

            <ul className="contact_list">
                {incomingContactRequests?.map((contactRequest) => (
                    <Contact
                        key={contactRequest.contactId}
                        contactPartner={contactRequest.contactPartner}
                        actions={
                            <>
                                <button
                                    className="contact_list__btn contact_list__btn--primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        void handleAddContact(
                                            contactRequest.contactId
                                        );
                                    }}
                                >
                                    <BootstrapIcons.Check width={24} height={24} fill="white" />
                                </button>
                                <button
                                    className="contact_list__btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        void handleDeleteContact(
                                            contactRequest.contactId
                                        );
                                    }}
                                >
                                    <BootstrapIcons.X width={24} height={24} fill="white" />
                                </button>
                            </>
                        }
                    />
                ))}
            </ul>
        </SlideInOverlay>
    );
}

export default ContactRequestOverlay;