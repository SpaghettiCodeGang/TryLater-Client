import { useLayout } from "../../hooks/useLayout.jsx";
import { useEffect, useState } from "react";
import CategorySelection from "./../../components/CategorySelection.jsx";
import TagSelectionOverlay from "./../newrecommendation/TagSelectOverlay.jsx";
import ContactSelectionOverlay from "./../newrecommendation/ContactSelectOverlay.jsx";

const NewRecommendationsPage = () => {
    const { setHeadline } = useLayout();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeOverlay, setActiveOverlay] = useState(null);

    useEffect(() => {
        setHeadline("Empfehlen");
        return () => setHeadline("");
    }, []);

    // handler für Nav nach Kategorie-Auswahl
    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        console.log("Selected category:", categoryId);
    };

    // dev buttons
    const renderDebugButtons = () => (
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
                onClick={() => setActiveOverlay('tagSelection')} style={{ padding: '8px 12px', backgroundColor: activeOverlay === 'tagSelection' ? '#FFA400' : '#E8E8E8' }}>Tags</button>
            <button
                onClick={() => setActiveOverlay('contactSelection')} style={{ padding: '8px 12px', backgroundColor: activeOverlay === 'contactSelection' ? '#FFA400' : '#E8E8E8' }}> Kontakt Auswahl</button>
        </div>
    );


    return (
        <>
            <div className="recommendations-page">
                <CategorySelection onCategorySelect={handleCategorySelect} />

                {renderDebugButtons()}

                <TagSelectionOverlay
                    activeOverlay={activeOverlay}
                    setActiveOverlay={setActiveOverlay}
                    selectedCategory={selectedCategory}
                />

                <ContactSelectionOverlay
                    activeOverlay={activeOverlay}
                    setActiveOverlay={setActiveOverlay}
                />

            </div>
        </>
    )
}

export default NewRecommendationsPage;
