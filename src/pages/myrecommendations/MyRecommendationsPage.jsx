import {useLayout} from "../../hooks/useLayout.jsx";
import {useEffect} from "react";

const MyRecommendationsPage = () => {
    const { setHeadline } = useLayout();

    useEffect(() => {
        setHeadline("Sammlung");
        return () => setHeadline("");
    }, []);

    return (
        <div className="main-content">
            <p>Content</p>
        </div>
    )
}

export default MyRecommendationsPage;
