import SlideInOverlay from "../../components/SlideInOverlay.jsx";

const PrivacyPolicyOverlay = ({ activeOverlay, setActiveOverlay}) => {
    return (
        <SlideInOverlay
            isVisible={activeOverlay === 'privacyPolicy'}
            onClose={() => setActiveOverlay(null)}
            title="Datenschutz"
        >
            <p>Diese Anwendung wurde im Rahmen eines Hochschulprojekts entwickelt.</p>
            <p className="lead">Eine vollständige Datenschutzerklärung wird bereitgestellt, sobald die Anwendung live geschaltet wird.</p>
        </SlideInOverlay>
    )
}

export default PrivacyPolicyOverlay;