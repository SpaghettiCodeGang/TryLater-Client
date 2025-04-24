import React, { useState } from "react";
import { BootstrapIcons } from "./BootstrapIcons.jsx";

const RecommendationCreateCard = ({ selectedTags, onAddTags, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [imgId, setImgId] = useState(null);

    const handleSubmit = () => {
        const recommendationData = {
            title,
            description,
            url,
            imgId,
            tags: selectedTags,
        };
        onSubmit(recommendationData);
    };

    return (
        <div className="recommendation-card">
            <div className="recommendation-card_inner">
                <div className="recommendation-card_header" style={{backgroundImage: "url(" + imgId + ")"}}>
                    <div className="recommendation-card_header__top">
                        <span className="recommendation-card_tag">Erstelle eine Empfehlung</span>
                    </div>
                    <div className="recommendation-card_header__bottom">
                        <h2>Empfehlung erstellen</h2>
                    </div>
                </div>
                <div className="recommendation-card_body">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Titel</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Gib einen Titel für deine Empfehlung ein"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Beschreibung</label>
                        <textarea
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Gib eine Beschreibung ein"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="url" className="form-label">Link (optional)</label>
                        <input
                            type="url"
                            className="form-control"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Gib einen Link ein"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imgId" className="form-label">Bild hochladen</label>
                        <input
                            type="file"
                            className="form-control"
                            id="imgId"
                            onChange={(e) => setImgId(URL.createObjectURL(e.target.files[0]))}
                        />
                    </div>
                    <div className="recommendation-card_tags">
                        <button type="button" onClick={onAddTags} className="btn btn-secondary">
                            Tags hinzufügen
                        </button>
                    </div>
                    <div className="mb-3">
                        <button type="button" onClick={handleSubmit} className="btn btn-primary form-control">
                            Empfehlung absenden
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendationCreateCard;
