import { useState } from "react";
import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import Contact from "../../components/Contact.jsx";

const ContactSelectionOverlay = ({ activeOverlay, setActiveOverlay }) => {
    const [selectedContacts, setSelectedContacts] = useState([]);
    const { data: contacts } = useFetch('/contact?status=ACCEPTED');
    const [selfSelected, setSelfSelected] = useState(true);

    const toggleContact = (contact) => {
        if (selectedContacts.includes(contact.contactId)) {
            setSelectedContacts(selectedContacts.filter(id => id !== contact.contactId));
        } else {
            setSelectedContacts([...selectedContacts, contact.contactId]);
        }
    };

    const toggleSelf = () => {
        setSelfSelected(!selfSelected);
    };

    const handleSendToContacts = () => {
        // senden an gewählte Kontakte
        console.log("Sending to self:", selfSelected);
        console.log("Sending to contacts:", selectedContacts);
        // navigate back or confirmation??
        setActiveOverlay(null);
    };

    return (
        <SlideInOverlay
            isVisible={activeOverlay === 'contactSelection'}
            onClose={() => setActiveOverlay(null)}
            title="Wem möchtest du deine Empfehlung senden?"
        >
            <div className="contact-selection">
                {/* Self selection option */}
                <Contact
                    contactPartner={{
                        id: "self",
                        displayName: "Ich",
                        username: "",
                        profilePicture: "/path/to/default/profile.jpg" // Replace with actual path
                    }}
                    onClick={toggleSelf}
                    isSelected={selfSelected}
                />

                <h3 className="contact-selection__title">Deine Kontakte</h3>

                <ul className="contact_list">
                    {contacts?.map((contact) => (
                        <Contact
                            key={contact.contactId}
                            contactPartner={contact.contactPartner}
                            onClick={() => toggleContact(contact)}
                            isSelected={selectedContacts.includes(contact.contactId)}
                        />
                    ))}
                </ul>

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