import { useState, useEffect } from "react";
import CategorySelection from "./../../components/CategorySelection.jsx";
import TagSelectionOverlay from "../newrecommendation/TagSelectionOverlay.jsx";
import ContactSelectionOverlay from "../newrecommendation/ContactSelectionOverlay.jsx";
import RecommendationCardForm from "./../../components/RecommendationCardForm.jsx"; // Neues Formular importieren
import apiService from "../../service/apiService.jsx";
import {useLayout} from "../../hooks/useLayout.jsx";

const NewRecommendationsPage = () => {
    const { setHeadline } = useLayout();
    const [activeOverlay, setActiveOverlay] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagGroups, setTagGroups] = useState([]);

    useEffect(() => {
        setHeadline("Empfehlen");
        return () => setHeadline("");
    }, []);

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

    const handleCreateRecommendation = (recommendationData) => {
        console.log("Empfehlung wird erstellt mit den Daten:", recommendationData);
    };

    const handleAddTags = () => {
        setActiveOverlay('tagSelection');
    };

    return (
        <div className="recommendations-page">
            {!selectedCategory ? (
                <CategorySelection onCategorySelect={handleCategorySelect} />
            ) : (
                <RecommendationCardForm
                    selectedTags={selectedTags}
                    onSubmit={handleCreateRecommendation}
                    onAddTags={handleAddTags} // Übergibt den Button-Handler zum Öffnen des Tag-Overlays
                />
            )}

            <TagSelectionOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
                tagGroups={tagGroups}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                onAddTags={handleAddTags}
            />

            <ContactSelectionOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
            />
        </div>
    );
};

export default NewRecommendationsPage;
