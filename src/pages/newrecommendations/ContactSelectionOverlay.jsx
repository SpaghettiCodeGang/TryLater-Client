import { useState } from "react";
import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import Contact from "../../components/Contact.jsx";
import apiService from "./../../service/apiService.jsx";

const ContactSelectionOverlay = ({ activeOverlay, setActiveOverlay, currentUser, data, selectedCategory, selectedTags, setShowSuccessModal, setIsErrorModal, onSubmit, validateForm }) => {

    const [selectedContacts, setSelectedContacts] = useState([]); /* Array mit IDs der gewählten Kontakte */
    const { data: contacts } = useFetch('/contact?status=ACCEPTED'); /* Alle Kontakte, die vom Server geladen werden */
    const [selfSelected, setSelfSelected] = useState(false); /* Boolean (true/false), ob selbst ausgewählt */
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (!validateForm()) {
            setActiveOverlay(null);
            setTimeout(() => {
                setIsErrorModal(true);
                setShowSuccessModal(true);
            });
            return;
        }

        setIsSubmitting(true);
        let receiverIds = [...selectedContacts];

        if (selfSelected && currentUser?.id) {
            if (!receiverIds.includes(currentUser.id)) {
                receiverIds.push(currentUser.id);
            }
        }

        const recommendationData = {
            title: data.title,
            description: data.description,
            url: data.url,
            rating: data.rating,
            category: selectedCategory,
            receiverIds: receiverIds,
            tagIds: selectedTags,
            imgPath: data.uploadedImgPath
        };

        try {
            await apiService.post('/recommendation', recommendationData);

            if (onSubmit) {
                onSubmit(recommendationData);
            }

            setActiveOverlay(null);
            setTimeout(() => {
                setIsErrorModal(false);
                setShowSuccessModal(true);
            });
        } catch (error) {
            console.error("Fehler beim Erstellen der Empfehlung:", error);
            setActiveOverlay(null);
            setTimeout(() => {
                setIsErrorModal(true);
                setShowSuccessModal(true);
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        /* Slide-In Overlay */
        <SlideInOverlay
            isVisible={activeOverlay === 'contactSelection'}
            onClose={() => setActiveOverlay(null)}
            title="Empfehlung senden?" >

            <div className="contact-selection">
                {/* Eigener Benutzer */}
                {currentUser && (
                    <Contact
                        contactPartner={{
                            displayName: "An mich",
                            imgPath: currentUser.imgPath,
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
                            key={contact.contactPartner.id}
                            contactPartner={contact.contactPartner}
                            onClick={() => toggleContact(contact.contactPartner.id)}
                            isSelected={selectedContacts.includes(contact.contactPartner.id)}
                        />
                    ))}
                </ul>

                {/* An Kontakte senden */}
                <button
                    className="btn btn-primary form-control mb-4"
                    onClick={handleSendToContacts}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Wird gesendet..." : "An Kontakte senden!"}
                </button>
            </div>
        </SlideInOverlay>
    );
};

export default ContactSelectionOverlay;