import {useLayout} from "../../hooks/useLayout.jsx";
import {useEffect} from "react";

const DiscoverRecommendationsPage = () => {
    const { setHeadline } = useLayout();

    useEffect(() => {
        setHeadline("Entdecke");
        return () => setHeadline("");
    }, []);

    return (
        <>
            <p>Content</p>
        </>
    )
}

export default DiscoverRecommendationsPage;
