import { useEffect, useState } from "react";
import { useLayout } from "../../hooks/useLayout.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import Contact from "../../components/Contact.jsx";
import ContactSearchOverlay from "./ContactSearchOverlay.jsx";
import ContactRequestOverlay from "./ContactRequestOverlay.jsx";
import ContactViewOverlay from "./ContactViewOverlay.jsx";
import { BootstrapIcons } from "../../components/BootstrapIcons.jsx";

const ContactPage = () => {
    const [activeOverlay, setActiveOverlay] = useState(null);
    const [activeContact, setActiveContact] = useState(null);
    const { setHeadline, setActions } = useLayout();

    const { data: contacts, refetch: refetchContacts } = useFetch('/contact?status=ACCEPTED');
    const { data: incomingContactRequests, refetch: refetchIncomingRequests } = useFetch('/contact?status=PENDING&role=RECEIVER');
    const { data: outgoingContactRequests, refetch: refetchOutgoingRequests } = useFetch('/contact?status=PENDING&role=REQUESTER');

    useEffect(() => {
        setHeadline("Kontakte");
        setActions(
            <>
                <button
                    className={`contact_nav__btn ${incomingContactRequests?.length > 0 ? 'active' : ''}`}
                    onClick={() => setActiveOverlay(activeOverlay === 'contactRequests' ? null : 'contactRequests')}
                >
                    <BootstrapIcons.Bell width={18} height={18} fill="white" />
                </button>
                <button
                    className={`contact_nav__btn `}
                    onClick={() => setActiveOverlay(activeOverlay === 'contactSearch' ? null : 'contactSearch')}
                >
                    <BootstrapIcons.Plus width={32} height={32} fill="white" />
                </button>
            </>
        );

        return () => {
            setHeadline("");
            setActions(null);
        };
    }, [incomingContactRequests]);

    return (
        <>
            <div className="contact_page">
                <div className="contact_border"></div>
                <h2 className="ms-2">Deine Kontakte</h2>

                <ul className="contact_list">
                    {contacts?.map((contact) => (
                        <Contact
                            key={contact.contactId}
                            contactPartner={contact.contactPartner}
                            onClick={() => {
                                setActiveContact(contact);
                                setActiveOverlay(activeOverlay === 'contactView' ? null : 'contactView')}
                            }
                        />
                    ))}
                </ul>
            </div>

            <ContactViewOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
                contact={activeContact}
                refetchContacts={refetchContacts}
            />

            <ContactRequestOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
                incomingContactRequests={incomingContactRequests}
                refetchIncomingRequests={refetchIncomingRequests}
                refetchContacts={refetchContacts}
            />

            <ContactSearchOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
                outgoingContactRequests={outgoingContactRequests}
                refetchOutgoingRequests={refetchOutgoingRequests}
                refetchContacts={refetchContacts}
            />
        </>
    );
};

export default ContactPage;
