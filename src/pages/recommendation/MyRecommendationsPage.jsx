import {useLayout} from "../../hooks/useLayout.jsx";
import {useEffect} from "react";

const MyRecommendationsPage = () => {
    const { setHeadline } = useLayout();

    useEffect(() => {
        setHeadline("Sammlung");
        return () => setHeadline("");
    }, []);

    return (
        <>
            <p>Content</p>
        </>
    )
}

export default MyRecommendationsPage;
