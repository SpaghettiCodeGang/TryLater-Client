import { useEffect, useState } from "react";
import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import Contact from "../../components/Contact.jsx";
import { BootstrapIcons } from "../../components/BootstrapIcons.jsx";
import apiService from "../../service/apiService.jsx";

const ContactSearchOverlay = ({ activeOverlay, setActiveOverlay, outgoingContactRequests, refetchOutgoingRequests }) => {
    const [localOutgoingContactRequests, setLocalOutgoingContactRequests] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchError, setSearchError] = useState(null);

    const isVisible = activeOverlay === 'contactSearch';

    useEffect(() => {
        if (!isVisible) {
            setSearchValue("");
            setSearchError(null);
        }

        if (outgoingContactRequests) {
            setLocalOutgoingContactRequests(outgoingContactRequests);
        }

    }, [isVisible, outgoingContactRequests]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchError(null);

        try {
            const result = await apiService.get(`/user/search?user=${encodeURIComponent(searchValue)}`);

            const newContact = {
                contactId: Math.random(),
                contactPartner: result,
                contactStatus: null
            };

            setLocalOutgoingContactRequests(prev => {
                const updatedContacts = [...prev];

                if (updatedContacts.length > 0 && updatedContacts[0].contactStatus === null) {
                    updatedContacts[0] = newContact;
                } else {
                    updatedContacts.unshift(newContact);
                }

                return updatedContacts;
            });
            setSearchValue("");

        } catch (error) {
            setSearchError(error?.data?.message);
        }
    }

    const handleContactRequest = async (targetUserId) => {
        try {
            await apiService.post("/contact", { targetUserId: targetUserId });
        } catch (error) {
            setSearchError(error?.data?.errors?.targetUserId || error?.data?.message);
        } finally {
            await refetchOutgoingRequests();
        }
    }

    return (
        <SlideInOverlay
            isVisible={activeOverlay === 'contactSearch'}
            onClose={() => setActiveOverlay(null)}
            title="Kontakt hinzufügen"
        >
            <form className="contact_search" onSubmit={handleSearch}>
                <button className="btn btn-outline-secondary" type="submit">
                    <BootstrapIcons.Search width={18} height={18} fill="#1E171A" />
                </button>
                <input type="text" className="form-control"
                       value={searchValue} placeholder="Suche..." aria-label="Suche"
                       onChange={(e) => setSearchValue(e.target.value)}/>
            </form>

            {searchError && <p className="text-center">{searchError}</p>}

            <ul className="contact_list">
                {localOutgoingContactRequests?.map((contactRequest) => (
                    <Contact
                        key={contactRequest.contactId}
                        contactPartner={contactRequest.contactPartner}
                        actions={
                            contactRequest.contactStatus !== "PENDING" ? (
                                <button
                                    className="contact_list__btn contact_list__btn--primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        void handleContactRequest(
                                            contactRequest.contactPartner.id
                                        );
                                    }}
                                >
                                    <BootstrapIcons.Plus
                                        width={24}
                                        height={24}
                                        fill="white"
                                    />
                                </button>
                            ) : (
                                <span className="contact_list__batch">Angefragt</span>
                            )
                        }
                    />
                ))}
            </ul>
        </SlideInOverlay>
    )
}

export default ContactSearchOverlay;