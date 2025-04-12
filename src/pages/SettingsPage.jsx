import {useLayout} from "../hooks/useLayout.jsx";
import {useEffect} from "react";

const SettingsPage = () => {
    const { setHeadline, setActions } = useLayout();

    useEffect(() => {
        setHeadline("Einstellungen");
        setActions();

        return () => {
            setHeadline("");
            setActions(null);
        };
    }, []);

    return (
        <>
            <p>Content</p>
        </>
    )
}

export default SettingsPage;
