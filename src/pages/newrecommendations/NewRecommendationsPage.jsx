import { useState, useEffect } from "react";
import { useLayout } from "../../hooks/useLayout.jsx";
import apiService from "../../service/apiService.jsx";
import CategorySelection from "../../components/CategorySelection.jsx";
import RecommendationCardForm from "../../components/RecommendationCardForm.jsx";
import TagSelectionOverlay from "./TagSelectionOverlay.jsx";
import ContactSelectionOverlay from "./ContactSelectionOverlay.jsx";
import RecommendationSuccessModal from "./RecommendationSuccessModal.jsx";
import { motion, AnimatePresence } from "framer-motion";

const NewRecommendationsPage = ({ user }) => {

    /* Zustände */
    const { setHeadline } = useLayout();
    const [activeOverlay, setActiveOverlay] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagGroups, setTagGroups] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isErrorModal, setIsErrorModal] = useState(false);

    /* Validierung im Frontend */
    const [errors, setErrors] = useState({
        title: "",
        url: ""
    });

    /* Datenobjekt zusammen bauen */
    const [data, setData] = useState({
        title: "",
        description: "",
        url: "",
        rating: 3,
        uploadedImgPath: null,
    });

    /* Updatefunktion für einzelne Felder */
    const updateData = (field, value) => {
        setData(prevData => ({
            ...prevData,
            [field]: value
        }));

        /* Error entfernen wenn der User im Feld tippt */
        if (errors[field]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [field]: ""
            }));
        }
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

    /* Validierung der Formularfelder */
    const validateForm = () => {
        let isValid = true;
        const newErrors = { title: "", url: "" };

        // Validierung Titel
        if (!data.title.trim()) {
            newErrors.title = "Titel ist erforderlich";
            isValid = false;
        }

        // Validierung URL
        if (data.url.trim() && !isValidUrl(data.url)) {
            newErrors.url = "Ungültiger Link";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    /* Tags hinzufügen öffnen */
    const handleAddTags = () => setActiveOverlay("tagSelection");

    /* Vorbereitung öffnet ContactOverlay */
    const handleOpenContacts = () => {
        if (validateForm()) {
            setActiveOverlay("contactSelection");
        }
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {!activeOverlay && (
                    <motion.div
                        className="main-content"
                        key="main-content"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {!selectedCategory ? (
                            <CategorySelection onCategorySelect={handleCategorySelect} />
                        ) : (
                            /* Zeige das RecommendationCardForm zum Schreiben der Empfehlung */
                            <RecommendationCardForm
                                selectedTags={selectedTags}
                                selectedCategory={selectedCategory}
                                onAddTags={handleAddTags}
                                onOpenContacts={handleOpenContacts}
                                tagGroups={tagGroups}
                                data={data}
                                updateData={updateData}
                                errors={errors}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Zeigen des Tag Overlays nach bedarf */}
            <TagSelectionOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
                tagGroups={tagGroups}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />

            {/* Zeigen des Contact Overlays nach bedarf */}
            <ContactSelectionOverlay
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
                currentUser={user}
                data={data}
                selectedCategory={selectedCategory}
                selectedTags={selectedTags}
                setShowSuccessModal={setShowSuccessModal}
                setIsErrorModal={setIsErrorModal}
                validateForm={validateForm}
            />

            {/* Popup für erfolgreiche Empfehlung */}
            <RecommendationSuccessModal
                show={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                isError={isErrorModal}
            />
        </>
    );
};

export default NewRecommendationsPage;