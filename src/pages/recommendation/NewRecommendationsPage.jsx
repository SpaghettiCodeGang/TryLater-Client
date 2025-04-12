import {useLayout} from "../../hooks/useLayout.jsx";
import {useEffect} from "react";

const NewRecommendationsPage = () => {
    const { setHeadline } = useLayout();

    useEffect(() => {
        setHeadline("Empfehlen");
        return () => setHeadline("");
    }, []);

    return (
        <>
            <p>Content</p>
        </>
    )
}

export default NewRecommendationsPage;
