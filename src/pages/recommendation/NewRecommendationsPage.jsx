import { useState, useEffect } from "react";
import { useLayout } from "../../hooks/useLayout.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import apiService from "../../service/apiService.jsx";
import CategorySelection from "../../components/CategorySelection.jsx";
import RecommendationCardForm from "../../components/RecommendationCardForm.jsx";
import TagSelectionOverlay from "../newrecommendation/TagSelectionOverlay.jsx";
import ContactSelectionOverlay from "../newrecommendation/ContactSelectionOverlay.jsx";
import RecommendationSuccessModal from "../newrecommendation/RecommendationSuccessModal.jsx";
import { motion, AnimatePresence} from "framer-motion";

const NewRecommendationsPage = () => {

    /* Zustände */
    const { setHeadline } = useLayout();
    const { data: currentUser } = useFetch("/user/me");

    const [activeOverlay, setActiveOverlay] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagGroups, setTagGroups] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isErrorModal, setIsErrorModal] = useState(false);

    const [data, setData] = useState({
        title: "",
        description: "",
        url: "",
        rating: 3,
        uploadedImgPath: null,
    });

// Updatefunktion für einzelne Felder
    const updateData = (field, value) => {
        setData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    useEffect(() => {
        setHeadline("Empfehlen");
        return () => setHeadline("");
    }, [setHeadline]);

    /* Auswählen und speichern der Kategorie */
    const handleCategorySelect = async (categoryId) => {
        const upperCaseId = categoryId.toUpperCase();
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

    /* Tags hinzufügen öffnen */
    const handleAddTags = () => setActiveOverlay("tagSelection");

    return (
        <div className="recommendations-page">
            <AnimatePresence mode="wait">
                {!activeOverlay && (
                    <motion.div
                        key="main-content"
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.5
                    }}
                    >
                        {!selectedCategory ? (
                            <CategorySelection onCategorySelect={handleCategorySelect} />
                        ) : (
                            /* zeige das RecommendationCardForm zum Schreiben der Empfehlung */
                            <RecommendationCardForm
                                selectedTags={selectedTags}
                                selectedCategory={selectedCategory}
                                onSubmit={handleCreateRecommendation}
                                onAddTags={handleAddTags}
                                onOpenContacts={() => setActiveOverlay("contactSelection")}
                                tagGroups={tagGroups}
                                data={data}
                                updateData={updateData}
                            />
                        )}

                        </motion.div>
                    )}
            </AnimatePresence>

            {/* zeigen des Tag Overlays nach bedarf */}
            <TagSelectionOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
                tagGroups={tagGroups}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />

            {/* zeigen des Contact Overlays nach bedarf */}
            <ContactSelectionOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
                currentUser={currentUser}
                data={data}
                selectedCategory={selectedCategory}
                selectedTags={selectedTags}
                setShowSuccessModal={setShowSuccessModal}
                setIsErrorModal={setIsErrorModal}
            />

            {/* Popup für erfolgreiche Empfehlung */}
            <RecommendationSuccessModal
                show={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                isError={isErrorModal}
            />
        </div>
    );
};

export default NewRecommendationsPage;
