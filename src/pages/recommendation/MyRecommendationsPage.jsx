import {useLayout} from "../../hooks/useLayout.jsx";
import {useEffect} from "react";

const MyRecommendationsPage = () => {
    const { setHeadline, setActions } = useLayout();

    useEffect(() => {
        setHeadline("Sammlung");
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

export default MyRecommendationsPage;
