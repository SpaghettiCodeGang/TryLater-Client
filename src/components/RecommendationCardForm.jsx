import { useEffect, useState, useMemo } from "react";
import apiService from "../service/apiService.jsx";
import { BootstrapIcons } from "./BootstrapIcons.jsx";
import useImageProcessor from "../hooks/useImageProcessor.jsx";

const RecommendationCardForm = ({ selectedCategory, selectedTags, onAddTags, onOpenContacts, tagGroups, data, updateData, errors }) => {
    const [imgSrc, setImgSrc] = useState(null);

    /* Empfehlung aktiv (Memo, damit sich der Wert nur bei Änderungen ändert) */
    const activeRecommendation = useMemo(() => ({
        category: selectedCategory,
        tagGroups: selectedTags
    }), [selectedCategory, selectedTags]);

    const { processImage } = useImageProcessor({ targetWidth: 1000, targetHeight: 1000 });

    /* Funktionen */
    const getTagNameById = (tagId) => {
        for (const group of tagGroups) {
            const foundTag = group.tags.find(tag => tag.id === tagId);
            if (foundTag) return foundTag.tagName;
        }
        return "Unbekanntes Tag";
    };

    const handleRatingClick = () => {
        const newRating = data.rating >= 3 ? 1 : data.rating + 1;
        updateData("rating", newRating);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const processedFile = await processImage(file);
            const response = await apiService.post("/image", processedFile);

            if (Array.isArray(response) && response[0]?.imgPath) {
                updateData("uploadedImgPath", response[0].imgPath);
                setImgSrc(`${apiService.getImgUrl()}${response[0].imgPath}`);
            } else if (response?.imgPath) {
                updateData("uploadedImgPath", response.imgPath);
                setImgSrc(`${apiService.getImgUrl()}${response.imgPath}`);
            }
        } catch (error) {
            console.error("Fehler beim Hochladen des Bildes:", error);
        }
    };

    /* Bildquelle automatisch aktualisieren */
    useEffect(() => {
        if (data.uploadedImgPath) {
            setImgSrc(`${apiService.getImgUrl()}${data.uploadedImgPath}`);
        } else {
            setImgSrc(
                activeRecommendation?.imgPath?.trim()
                    ? `${apiService.getImgUrl()}${activeRecommendation.imgPath}`
                    : `/assets/${activeRecommendation.category?.toLowerCase()}.png`
            );
        }
    }, [activeRecommendation, data.uploadedImgPath]);

    return (
        <>
            <div className="recommendation-card-f">
                <div className="recommendation-card-f_inner">

                    {/* Headerbild und alles im Bild */}
                    <div
                        className="recommendation-card-f_header"
                        style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 12.5%, rgba(0,0,0,0) 62.5%, rgba(0,0,0,1) 100%), url(${imgSrc})`}}
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
                                {Array.from({ length: data.rating }).map((_, i) => (
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

                        {/* Wer empfiehlt und Titel + Titel-Validierung */}
                        <div className="recommendation-card-f_header__bottom">
                            <span className="recommendation-card-f_tag">Du empfiehlst</span>
                            <div className={`recommendation-card-f_title ${errors.title ? 'is-invalid' : ''}`}>
                                <input
                                    type="text"
                                    className="recommendation-card-f_title--form"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => updateData("title", e.target.value)}
                                    placeholder={errors.title ? "Titel erforderlich" : "Titel (Pflichtfeld)"}
                                />
                                <BootstrapIcons.PencilFill width={30} height={30} color="white" style={{ paddingTop: "0.3rem" }} />
                            </div>
                            {errors.title && (
                                <div className="invalid-feedback">
                                    {errors.title}
                                </div>
                            )}
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
                                <button type="button" className="recommendation-card-f_addtag text-dark" onClick={onAddTags}>
                                    <BootstrapIcons.PlusCircleFill width={18} height={18} fill="#1E171A" style={{ marginRight: "0.5rem", paddingBottom: "0.15rem" }} />
                                    Tags hinzufügen
                                </button>
                            </div>
                        </div>

                        {/* Link Section + Link-Validierung */}
                        <div className="mb-3">
                            <label htmlFor="link" className="form-label">
                                Link
                                <BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{ marginLeft: "0.5rem", paddingBottom: "0.1rem" }} />
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.url ? 'is-invalid' : ''}`}
                                id="link"
                                value={data.url}
                                onChange={(e) => updateData("url", e.target.value)}
                                placeholder={errors.url ? "Ungültiger Link" : "Kein Link vorhanden (optional)"}
                            />
                            {errors.url && (
                                <div className="invalid-feedback">
                                    {errors.url}
                                </div>
                            )}
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
                                value={data.description}
                                onChange={(e) => updateData("description", e.target.value)}
                                placeholder="Keine Beschreibung vorhanden (optional)"
                                maxLength={2000}
                            />
                            <div className="form-text text-muted text-right" style={{ float: "right" }}>
                                {data.description.length}/2000 Zeichen
                            </div>
                        </div>
                    </div>

                    {/* Footer mit Action */}
                    <div className="recommendation-card-f_footer">
                        <button
                            className="btn btn-primary form-control mb-4"
                            onClick={onOpenContacts}

                        >
                            Kontakte auswählen
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default RecommendationCardForm;
