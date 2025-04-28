import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import { useState } from "react";
import Contact from "../../components/Contact.jsx";
import { BootstrapIcons } from "../../components/BootstrapIcons.jsx";
import apiService from "../../service/apiService.jsx";

const BlockedContactsOverlay = ({ activeOverlay, setActiveOverlay }) => {
    const [error, setError] = useState(null);
    const { data: blockedContacts, refetch: refetchBlockedContacts } = useFetch('/contact?status=BLOCKED');

    const handleDeleteBlockedContact = async (contactId) => {
        try {
            await apiService.delete(`/contact/${contactId}`);
            await refetchBlockedContacts();
        } catch (error) {
            setError(error?.data?.message);
        }
    }

    return (
        <SlideInOverlay
            isVisible={activeOverlay === 'blockedContacts'}
            onClose={() => setActiveOverlay(null)}
            title="Blockierte Kontakte"
        >
            {error && <p className="text-center">{error}</p>}

            <ul className="contact_list">
                {blockedContacts?.map((blockedContact) => (
                    <Contact
                        key={blockedContact.contactId}
                        contactPartner={blockedContact.contactPartner}
                        actions={
                            <button
                                className="contact_list__btn contact_list__btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    void handleDeleteBlockedContact(
                                        blockedContact.contactId
                                    );
                                }}
                            >
                                <BootstrapIcons.X width={24} height={24} fill="white" />
                            </button>
                        }
                    />
                ))}
            </ul>
        </SlideInOverlay>
    );
}

export default BlockedContactsOverlay;