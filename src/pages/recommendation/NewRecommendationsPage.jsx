import { useLayout } from "../../hooks/useLayout.jsx";
import { useEffect, useState } from "react";
import CategorySelection from "./../../components/CategorySelection.jsx";
import TagSelectionOverlay from "../newrecommendation/TagSelectionOverlay.jsx";
import ContactSelectionOverlay from "../newrecommendation/ContactSelectionOverlay.jsx";
import apiService from "../../service/apiService.jsx";

const NewRecommendationsPage = () => {
    const { setHeadline } = useLayout();
    const [activeOverlay, setActiveOverlay] = useState(null);
    const [ ,setSelectedCategory] = useState(null);
    const [tagGroups, setTagGroups] = useState([]);

    useEffect(() => {
        setHeadline("Empfehlen");
        return () => setHeadline("");
    }, []);

    // Handler für Kategorie-Auswahl
    const handleCategorySelect = async (categoryId) => {
        const upperCaseId = categoryId.toUpperCase(); // fix!
        setSelectedCategory(upperCaseId);

        try {
            const response = await apiService.get(`/recommendation/tags?category=${upperCaseId}`);
            setTagGroups(response);
        } catch (error) {
            console.error("Fehler beim Laden der Tags:", error);
        }
    };

    // Development-Buttons
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
                    tagGroups={tagGroups}
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
