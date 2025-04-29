import SlideInOverlay from "../../components/SlideInOverlay.jsx";

const ImprintOverlay = ({ activeOverlay, setActiveOverlay}) => {
    return (
        <SlideInOverlay
            isVisible={activeOverlay === 'imprint'}
            onClose={() => setActiveOverlay(null)}
            title="Impressum"
        >
            <p>Dieses Anwendung wurde im Rahmen eines Hochschulprojekts entwickelt.</p>
            <p className="lead">Verantwortlich für den Inhalt der Anwendung nach § 5 TMG:</p>

            <ul>
                <li>Elias Kugel</li>
                <li>Paul Rist</li>
                <li>Janek Wilk</li>
                <li>Sören Lehmann</li>
            </ul>

            <p>Kontaktaufnahme ist über die Staatliche Studienakademie Dresden möglich:</p>
            <ul>
                <li>Website: <a href="https://www.dhsn.de/dresden" target="_blank" rel="noopener noreferrer">www.dhsn.de/dresden</a></li>
            </ul>

        </SlideInOverlay>
    )
}

export default ImprintOverlay;