import { useState, useEffect } from "react";
import CategorySelection from "./../../components/CategorySelection.jsx";
import TagSelectionOverlay from "../newrecommendation/TagSelectionOverlay.jsx";
import ContactSelectionOverlay from "../newrecommendation/ContactSelectionOverlay.jsx";
import RecommendationCardForm from "./../../components/RecommendationCardForm.jsx"; // Neues Formular importieren
import apiService from "../../service/apiService.jsx";
import {useLayout} from "../../hooks/useLayout.jsx";

/* Zustände */
const NewRecommendationsPage = () => {
    const { setHeadline } = useLayout();
    const [activeOverlay, setActiveOverlay] = useState(null); /* Welches Overlay gerade offen ist (Tag-Auswahl, Kontakt-Auswahl) */
    const [selectedCategory, setSelectedCategory] = useState(null); /* Welche Kategorie der Nutzer gewählt hat */
    const [selectedTags, setSelectedTags] = useState([]); /* Welche Tags der Nutzer ausgewählt hat */
    const [tagGroups, setTagGroups] = useState([]); /* Die Gruppierten Tags, die vom Server geladen werden */

    useEffect(() => {
        setHeadline("Empfehlen");
        return () => setHeadline("");
    }, []);




    /* Auswählen und speichern der Kategorie */
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

    /* Speichern der Empfehlung */
    const handleCreateRecommendation = (recommendationData) => {
        console.log("Empfehlung wird erstellt mit den Daten:", recommendationData);
    };

    /* "Tags hinzufügen" öffnen */
    const handleAddTags = () => {
        setActiveOverlay('tagSelection');
    };

    return (
        <div className="recommendations-page">

            {/* CategorySelection Komponente wenn noch keine Kategorie gewählt */}
            {!selectedCategory ? (
                <CategorySelection onCategorySelect={handleCategorySelect} />
            ) : (

                /* zeige das RecommendationCardForm zum Schreiben der Empfehlung */
                <RecommendationCardForm
                    selectedTags={selectedTags}
                    selectedCategory={selectedCategory}
                    onSubmit={handleCreateRecommendation}
                    onAddTags={handleAddTags}
                    onOpenContacts={() => setActiveOverlay('contactSelection')}
                />
            )}

            {/* zeigen des Tag Overlays nach bedarf */}
            <TagSelectionOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
                tagGroups={tagGroups}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                onAddTags={handleAddTags}
            />

            {/* zeigen des Contact Overlays nach bedarf */}
            <ContactSelectionOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
            />
        </div>
    );
};

export default NewRecommendationsPage;
