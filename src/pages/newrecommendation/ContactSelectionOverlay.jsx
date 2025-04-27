import { useState } from "react";
import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import Contact from "../../components/Contact.jsx";
import apiService from "./../../service/apiService.jsx";

const ContactSelectionOverlay = ({ activeOverlay, setActiveOverlay, currentUser }) => {
    const [selectedContacts, setSelectedContacts] = useState([]); /* Array mit IDs der gewählten Kontakte */
    const { data: contacts } = useFetch('/contact?status=ACCEPTED'); /* Alle Kontakte, die vom Server geladen werden */
    const [selfSelected, setSelfSelected] = useState(false); /* Boolean (true/false), ob selbst ausgewählt */

    /* Kontakt-Auswahl umschalten */
    const toggleContact = (contactId) => {
        if (selectedContacts.includes(contactId)) {
            setSelectedContacts(selectedContacts.filter(id => id !== contactId));
        } else {
            setSelectedContacts([...selectedContacts, contactId]);
        }
    };

    /* Sich selbst auswählen */
    const toggleSelf = () => {
        setSelfSelected(!selfSelected);
    };

    /* Absenden */
    const handleSendToContacts = () => {
        // senden an gewählte Kontakte
        console.log("Sending to self:", selfSelected);
        console.log("Sending to contacts:", selectedContacts);
        // navigate back or confirmation??
        setActiveOverlay(null);
    };

    return (
        /* Slide-In Overlay */
        <SlideInOverlay
            isVisible={activeOverlay === 'contactSelection'}
            onClose={() => setActiveOverlay(null)}
            title="Wem möchtest du deine Empfehlung senden?" >

            <div className="contact-selection">
                {/* eigener Benutzer */}
                {currentUser && (
                    <Contact
                        contactPartner={{
                            id: "self",
                            displayName: currentUser.displayName || "Ich",
                            username: currentUser.userName || "",
                            profileImage: currentUser.imgPath ? `${apiService.getImgUrl()}${currentUser?.imgPath}` : "/assets/profil.png"
                        }}
                        onClick={toggleSelf}
                        isSelected={selfSelected}
                    />
                )}

                <h3 className="contact-selection__title">Deine Kontakte</h3>

                {/* Kontakte anzeigen */}
                <ul className="contact_list">
                    {contacts?.map((contact) => (
                        <Contact
                            key={contact.contactId}
                            contactPartner={contact.contactPartner}
                            onClick={() => toggleContact(contact.contactId)}
                            isSelected={selectedContacts.includes(contact.contactId)}
                        />
                    ))}
                </ul>

                {/* An Kontakte senden */}
                <button
                    className="btn btn-primary form-control mb-4"
                    onClick={handleSendToContacts}
                    style={{width: "70%", marginLeft: "15%", marginRight: "15%"}}
                >
                    An Kontakte senden!
                </button>
            </div>
        </SlideInOverlay>
    );
};

export default ContactSelectionOverlay;