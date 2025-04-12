import {useLayout} from "../../hooks/useLayout.jsx";
import {useEffect} from "react";

const NewRecommendationsPage = () => {
    const { setHeadline, setActions } = useLayout();

    useEffect(() => {
        setHeadline("Empfehlen");
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

export default NewRecommendationsPage;
