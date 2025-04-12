import {useLayout} from "../../hooks/useLayout.jsx";
import {useEffect} from "react";

const DiscoverRecommendationsPage = () => {
    const { setHeadline, setActions } = useLayout();

    useEffect(() => {
        setHeadline("Entdecke");
        setActions();

        return () => {
            setHeadline("");
            setActions(null);
        };
    }, []);

    return (
        <>
            <p>Content.</p>
        </>
    )
}

export default DiscoverRecommendationsPage;
