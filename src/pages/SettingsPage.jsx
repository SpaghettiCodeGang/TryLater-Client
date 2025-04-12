import {useLayout} from "../hooks/useLayout.jsx";
import {useEffect} from "react";

const SettingsPage = () => {
    const { setHeadline } = useLayout();

    useEffect(() => {
        setHeadline("Einstellungen");
        return () => setHeadline("");
    }, []);

    return (
        <>
            <p>Content</p>
        </>
    )
}

export default SettingsPage;
