import { useLayout } from "../../hooks/useLayout.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useEffect, useState } from "react";
import { BootstrapIcons } from "../../components/BootstrapIcons.jsx";
import apiService from "../../service/apiService.jsx";

const SettingsPage = ({ user }) => {
    const { setHeadline } = useLayout();
    const { logout, loading } = useAuth();
    const [activeOverlay, setActiveOverlay] = useState(null);

    const placeholderImg = "src/assets/profil.png";
    const imgSrc = user?.imgPath && user?.imgPath.trim() !== "" ? `${apiService.getBaseUrl()}/images/${user?.imgPath}` : placeholderImg;

    useEffect(() => {
        setHeadline("Einstellungen");
        return () => setHeadline("");
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
    };

    return (
        <>
            <div className="settings_overview__data">
                <img className="settings_overview__img" src={ imgSrc } alt={`${user?.displayName}`} />
                <p className="settings_overview__displayname">{ user?.displayName }</p>
                <p className="settings_overview__username">{ user?.userName }</p>
            </div>

            <button className="settings_overlay__btn">
                <p>Profil bearbeiten</p>
                <BootstrapIcons.ChevronRight width={24} height={24} className="settings_overlay__icon"/>
            </button>

            <button className="settings_overlay__btn">
                <p>Passwort ändern</p>
                <BootstrapIcons.ChevronRight width={24} height={24} className="settings_overlay__icon"/>
            </button>

            <button className="settings_overlay__btn">
                <p>Blockierte Kontakte</p>
                <BootstrapIcons.ChevronRight width={24} height={24} className="settings_overlay__icon"/>
            </button>

            <button className="settings_overlay__btn">
                <p>Sicherheit & Datenschutz</p>
                <BootstrapIcons.ChevronRight width={24} height={24} className="settings_overlay__icon"/>
            </button>

            <button className="settings_overlay__btn">
                <p>Kontakt & Impressum</p>
                <BootstrapIcons.ChevronRight width={24} height={24} className="settings_overlay__icon"/>
            </button>

            <button className="btn btn-secondary btn-flat form-control mb-3" onClick={handleLogout} disabled={ loading }>
                {loading ? (
                    <>
                        <span className="btn-spinner me-2" />
                        <span>Sende...</span>
                    </>
                ) : (
                    <span>Ausloggen</span>
                )}
            </button>

            {/*TODO: Profil löschen implementieren*/}
            <button className="btn btn-secondary btn-flat form-control">
                {loading ? (
                    <>
                        <span className="btn-spinner me-2" />
                        <span>Sende...</span>
                    </>
                ) : (
                    <span>Profil löschen</span>
                )}
            </button>

            <div className="settings_banner">
                <p className="h1">
                    <span className="text-primary">Try</span>
                    <span>Later</span>
                </p>
                <small>Aktuelle Version: 1.0.0</small>
                <small>Empfehlungen für dich!</small>
            </div>
        </>
    )
}

export default SettingsPage;
