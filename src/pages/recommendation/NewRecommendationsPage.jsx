import { useState, useEffect } from "react";
import CategorySelection from "./../../components/CategorySelection.jsx";
import TagSelectionOverlay from "../newrecommendation/TagSelectionOverlay.jsx";
import ContactSelectionOverlay from "../newrecommendation/ContactSelectionOverlay.jsx";
import RecommendationCardForm from "./../../components/RecommendationCardForm.jsx";
import RecommendationSuccessModal from "../newrecommendation/RecommendationSuccessModal.jsx";
import apiService from "../../service/apiService.jsx";
import {useLayout} from "../../hooks/useLayout.jsx";
import {useFetch} from "../../hooks/useFetch.jsx";

/* Zustände */
const NewRecommendationsPage = () => {
    const { setHeadline } = useLayout();
    const [activeOverlay, setActiveOverlay] = useState(null); /* Welches Overlay gerade offen ist (Tag-Auswahl, Kontakt-Auswahl) */
    const [selectedCategory, setSelectedCategory] = useState(null); /* Welche Kategorie der Nutzer gewählt hat */
    const [selectedTags, setSelectedTags] = useState([]); /* Welche Tags der Nutzer ausgewählt hat */
    const [tagGroups, setTagGroups] = useState([]); /* Die Gruppierten Tags, die vom Server geladen werden */
    const { data: currentUser } = useFetch('/user/me');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [rating, setRating] = useState(3);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isErrorModal, setIsErrorModal] = useState(false);
    const [uploadedImgPath, setUploadedImgPath] = useState(null);

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
            />

            <RecommendationSuccessModal
                show={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                isError={isErrorModal}
            />
        </div>
    );
};

export default NewRecommendationsPage;