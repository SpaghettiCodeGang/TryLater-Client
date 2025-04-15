import { useEffect, useState } from "react";
import { useLayout } from "../../hooks/useLayout.jsx";
import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import { BootstrapIcons } from "../../components/BootstrapIcons.jsx";

const ContactPage = () => {
    const [activeOverlay, setActiveOverlay] = useState(null);
    const { setHeadline, setActions } = useLayout();

    useEffect(() => {
        setHeadline("Kontakte");
        setActions(
            <>
                <button
                    className={`contact_nav__btn active`}
                    onClick={() => setActiveOverlay(activeOverlay === 'requests' ? null : 'requests')}
                >
                    <BootstrapIcons.Bell width={18} height={18} fill="white" />
                </button>
                <button
                    className={`contact_nav__btn `}
                    onClick={() => setActiveOverlay(activeOverlay === 'add' ? null : 'add')}
                >
                    <BootstrapIcons.Plus width={18} height={18} fill="white" />
                </button>
            </>
        );

        return () => {
            setHeadline("");
            setActions(null);
        };
    }, []);

    return (
        <>
            <div className="contact_page">
                <div className="contact_border"></div>
                <h2 className="ms-2">Deine Kontakte</h2>
            </div>


            <SlideInOverlay
                isVisible={activeOverlay === 'requests'}
                onClose={() => setActiveOverlay(null)}
                title="Deine Anfragen"
            >
                <p>Content</p>
            </SlideInOverlay>

            <SlideInOverlay
                isVisible={activeOverlay === 'add'}
                onClose={() => setActiveOverlay(null)}
                title="Kontakt hinzufügen"
            >
                <p>Content</p>
            </SlideInOverlay>
        </>
    );
};

export default ContactPage;
