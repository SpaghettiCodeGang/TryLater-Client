import { useLayout } from "../../hooks/useLayout.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useEffect, useState } from "react";
import ChangeProfileOverlay from "./ChangeProfileOverlay.jsx";
import BlockedContactsOverlay from "./BlockedContactsOverlay.jsx";
import { BootstrapIcons } from "../../components/BootstrapIcons.jsx";
import apiService from "../../service/apiService.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import { motion, AnimatePresence } from "framer-motion";
import ImprintOverlay from "./ImprintOverlay.jsx";
import PrivacyPolicyOverlay from "./PrivacyPolicyOverlay.jsx";

const SettingsPage = () => {
    const { setHeadline } = useLayout();
    const { logout, loading } = useAuth();
    const [activeOverlay, setActiveOverlay] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);

    const { data: user, refetch: refetchUser } = useFetch('/user/me');

    useEffect(() => {
        setHeadline("Einstellungen");
        setImgSrc(user?.imgPath && user?.imgPath.trim() !== "" ?
            `${apiService.getImgUrl()}${user?.imgPath}` :
            "/assets/profil.png");

        return () => setHeadline("");
    }, [user]);

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {activeOverlay === null && (
                    <motion.div
                        key="main-content"
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.5
                        }}
                    >
                        <div className="settings_overview__data">
                            <img className="settings_overview__img" src={ imgSrc } alt={`${user?.displayName}`} />
                            <p className="settings_overview__displayname">{ user?.displayName }</p>
                            <p className="settings_overview__username">{ user?.userName }</p>
                        </div>

                        <button className="settings_overlay__btn" onClick={() =>
                            setActiveOverlay(activeOverlay === 'changeProfile' ? null : 'changeProfile')}>
                            <p>Profil bearbeiten</p>
                            <BootstrapIcons.ChevronRight width={24} height={24} className="settings_overlay__icon"/>
                        </button>

                        <button className="settings_overlay__btn">
                            <p>Passwort ändern</p>
                            <BootstrapIcons.ChevronRight width={24} height={24} className="settings_overlay__icon"/>
                        </button>

                        <button className="settings_overlay__btn" onClick={() =>
                            setActiveOverlay(activeOverlay === 'changeProfile' ? null : 'blockedContacts')}>
                            <p>Blockierte Kontakte</p>
                            <BootstrapIcons.ChevronRight width={24} height={24} className="settings_overlay__icon"/>
                        </button>

                        <button className="settings_overlay__btn" onClick={() =>
                            setActiveOverlay(activeOverlay === 'privacyPolicy' ? null : 'privacyPolicy')}>
                            <p>Sicherheit & Datenschutz</p>
                            <BootstrapIcons.ChevronRight width={24} height={24} className="settings_overlay__icon"/>
                        </button>

                        <button className="settings_overlay__btn" onClick={() =>
                            setActiveOverlay(activeOverlay === 'imprint' ? null : 'imprint')}>
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
                                <span className="text-dark">Later</span>
                            </p>
                            <small>Aktuelle Version: 1.0.0</small>
                            <small>Empfehlungen für dich!</small>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ChangeProfileOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
                refetchUser={refetchUser}
                imgSrc={imgSrc}
                user={user}
            />

            <BlockedContactsOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
            />

            <PrivacyPolicyOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
            />

            <ImprintOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
            />
        </>
    )
}

export default SettingsPage;
