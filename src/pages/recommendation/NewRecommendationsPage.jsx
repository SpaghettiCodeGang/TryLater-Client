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

    const [data, setData] = useState({})

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [rating, setRating] = useState(3);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isErrorModal, setIsErrorModal] = useState(false);
    const [uploadedImgPath, setUploadedImgPath] = useState(null);

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
                            duration: 0.25
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
                                title={title}
                                setTitle={setTitle}
                                description={description}
                                setDescription={setDescription}
                                url={url}
                                setUrl={setUrl}
                                rating={rating}
                                setRating={setRating}
                                uploadedImgPath={uploadedImgPath}
                                setUploadedImgPath={setUploadedImgPath}
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
                title={title}
                description={description}
                url={url}
                rating={rating}
                selectedCategory={selectedCategory}
                selectedTags={selectedTags}
                setShowSuccessModal={setShowSuccessModal}
                setIsErrorModal={setIsErrorModal}
                uploadedImgPath={uploadedImgPath}

                data={data}
                setData={setData}
                onSubmit={handleCreateRecommendation}
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
