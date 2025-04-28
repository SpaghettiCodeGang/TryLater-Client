import { useEffect, useState, useMemo } from "react";
import apiService from "../service/apiService.jsx";
import { BootstrapIcons } from "./BootstrapIcons.jsx";
import useImageProcessor from "../hooks/useImageProcessor.jsx";

/* RecommendationCardForm - Empfehlung erstellen */
const RecommendationCardForm = ({
                                    selectedCategory, selectedTags, onAddTags, onOpenContacts, tagGroups, title, setTitle, description, setDescription, url, setUrl, rating, setRating, uploadedImgPath, setUploadedImgPath }) => {
    const [imgSrc, setImgSrc] = useState(null);

    /* Empfehlung aktiv (Memo, damit sich der Wert nur bei Änderungen ändert) */
    const activeRecommendation = useMemo(() => ({
        category: selectedCategory,
        tagGroups: selectedTags
    }), [selectedCategory, selectedTags]);

    const { processImage } = useImageProcessor({ targetWidth: 644, targetHeight: 1000 });

    /* Funktionen */
    const getTagNameById = (tagId) => {
        for (const group of tagGroups) {
            const foundTag = group.tags.find(tag => tag.id === tagId);
            if (foundTag) return foundTag.tagName;
        }
        return "Unbekanntes Tag";
    };

    const handleRatingClick = () => {
        const newRating = rating >= 3 ? 1 : rating + 1;
        setRating(newRating);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const processedFile = await processImage(file);
            const response = await apiService.post("/image", processedFile);
            console.log("Upload erfolgreich:", response);

            if (Array.isArray(response) && response[0]?.imgPath) {
                setUploadedImgPath(response[0].imgPath);
                setImgSrc(`${apiService.getImgUrl()}${response[0].imgPath}`);
            } else if (response?.imgPath) {
                setUploadedImgPath(response.imgPath);
                setImgSrc(`${apiService.getImgUrl()}${response.imgPath}`);
            }
        } catch (error) {
            console.error("Fehler beim Hochladen des Bildes:", error);
        }
    };

    /* Bildquelle automatisch aktualisieren */
    useEffect(() => {
        if (uploadedImgPath) {
            setImgSrc(`${apiService.getImgUrl()}${uploadedImgPath}`);
        } else {
            setImgSrc(
                activeRecommendation?.imgPath?.trim()
                    ? `${apiService.getImgUrl()}${activeRecommendation.imgPath}`
                    : `/assets/${activeRecommendation.category?.toLowerCase()}.png`
            );
        }
    }, [activeRecommendation, uploadedImgPath]);

    return (
        <>
            <div className="recommendation-card-f">
                <div className="recommendation-card-f_inner">

                    {/* Headerbild und alles im Bild */}
                    <div
                        className="recommendation-card-f_header"
                        style={{ backgroundImage: `url(${imgSrc})`, minHeight: "60vh" }}
                    >
                        {/* Kategorie-Tag und Herzbewertung */}
                        <div className="recommendation-card-f_header__top">
              <span className="recommendation-card-f_tag">
                {typeof activeRecommendation?.category === "string"
                    ? activeRecommendation.category.charAt(0).toUpperCase() + activeRecommendation.category.slice(1).toLowerCase()
                    : "Kategorie"}
              </span>

                            <button
                                type="button"
                                className="recommendation-card-f_rating"
                                onClick={handleRatingClick}
                                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                            >
                                <BootstrapIcons.PencilFill width={20} height={20} style={{ marginRight: "0.25rem", paddingBottom: "0.1rem" }} />
                                {Array.from({ length: rating }).map((_, i) => (
                                    <BootstrapIcons.HeartFill key={i} width={18} height={18} />
                                ))}
                            </button>
                        </div>

                        {/* Image Upload Button */}
                        <div className="recommendation-card-f_header__middle">
                            <label className="recommendation-card-f_text" style={{ cursor: "pointer" }}>
                                Bild hochladen
                                <BootstrapIcons.CameraFill width={30} height={30} color="$white" style={{ marginLeft: "0.5rem", paddingBottom: "0.25rem" }} />
                                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
                            </label>
                        </div>

                        {/* Wer empfiehlt und Titel */}
                        <div className="recommendation-card-f_header__bottom">
                            <span className="recommendation-card-f_tag">Du empfiehlst</span>
                            <div className="recommendation-card-f_title">
                                <input
                                    type="text"
                                    className="recommendation-card-f_title--form"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Titel deiner tollen Empfehlung"
                                />
                                <BootstrapIcons.PencilFill width={30} height={30} color="white" style={{ paddingTop: "0.3rem" }} />
                            </div>
                        </div>
                    </div>

                    {/* Body Empfehlung (Tags, Link, Beschreibung) */}
                    <div className="recommendation-card-f_body">
                        {/* Tag Section */}
                        <div className="mb-3">
                            <label htmlFor="tags" className="form-label">
                                Tags
                                <BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{ marginLeft: "0.5rem", paddingBottom: "0.1rem" }} />
                            </label>
                            <div className="recommendation-card-f_tags" id="tags">
                                {selectedTags.length > 0 && selectedTags.map((tagId, index) => (
                                    <div key={index} className="recommendation-card-f_tag recommendation-card-f_tag--gray">
                                        {getTagNameById(tagId)}
                                    </div>
                                ))}
                                <button type="button" className="recommendation-card-f_addtag" onClick={onAddTags}>
                                    <BootstrapIcons.PlusCircleFill width={18} height={18} color="$dark" style={{ marginRight: "0.5rem", paddingBottom: "0.15rem" }} />
                                    Tags hinzufügen
                                </button>
                            </div>
                        </div>

                        {/* Link Section */}
                        <div className="mb-3">
                            <label htmlFor="link" className="form-label">
                                Link
                                <BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{ marginLeft: "0.5rem", paddingBottom: "0.1rem" }} />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="link"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Kein Link vorhanden (optional)"
                            />
                        </div>

                        {/* Beschreibung Section */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Notizen
                                <BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{ marginLeft: "0.5rem", paddingBottom: "0.1rem" }} />
                            </label>
                            <textarea
                                className="form-control"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Keine Beschreibung vorhanden (optional)"
                            />
                        </div>
                    </div>

                    {/* Footer mit Action */}
                    <div className="recommendation-card-f_footer">
                        <button
                            className="btn btn-primary form-control mb-4"
                            onClick={onOpenContacts}
                            style={{ width: "70%", marginLeft: "15%", marginRight: "15%" }}
                        >
                            An Kontakte senden
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default RecommendationCardForm;
