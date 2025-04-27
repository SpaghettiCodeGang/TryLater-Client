import { useState } from "react";
import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import Contact from "../../components/Contact.jsx";
import apiService from "./../../service/apiService.jsx";

const ContactSelectionOverlay = ({ activeOverlay, setActiveOverlay, currentUser, title, description, url, rating, selectedCategory, selectedTags, setShowSuccessModal, setIsErrorModal }) => {

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
    const handleSendToContacts = async () => {
        const receiverIds = [...selectedContacts];
        if (selfSelected && currentUser?.id) {
            receiverIds.push(currentUser.id);
        }

        const recommendationData = {
            title,
            description,
            url,
            imgId: "",
            rating,
            category: selectedCategory,
            receiverIds: receiverIds,
            tagIds: selectedTags
        };

        try {
            await apiService.post('/recommendation', recommendationData);
            console.log("Empfehlung erfolgreich erstellt!");

            setActiveOverlay(null);
            setTimeout(() => {
                setIsErrorModal(false);
                setShowSuccessModal(true);
            }, 300);
        } catch (error) {
            console.error("Fehler beim Erstellen der Empfehlung:", error);
            setActiveOverlay(null);
            setTimeout(() => {
                setIsErrorModal(true);
                setShowSuccessModal(false);
            }, 300);
        }
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