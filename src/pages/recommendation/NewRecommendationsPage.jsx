import { useLayout } from "../../hooks/useLayout.jsx";
import { useEffect } from "react";
import CategorySelection from "./../../components/CategorySelection.jsx";

const NewRecommendationsPage = () => {
    const { setHeadline } = useLayout();

    useEffect(() => {
        setHeadline("Empfehlen");
        return () => setHeadline("");
    }, []);

    // handler für Nav nach Kategorie-Auswahl
    const handleCategorySelect = (categoryId) => {
        // setSelectedCategory(categoryId);
        console.log("Selected category:", categoryId);
    };


    return (
        <>
            <div className="recommendations-page">
                <CategorySelection onCategorySelect={handleCategorySelect} />
            </div>
        </>
    )
}

export default NewRecommendationsPage;
