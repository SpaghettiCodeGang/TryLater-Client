import { useState } from "react";
import SlideInOverlay from "../../components/SlideInOverlay.jsx";

const TagSelectionOverlay = ({ activeOverlay, setActiveOverlay, tagGroups = [], onAddTags }) => {
    const [selectedTags, setSelectedTags] = useState([]);  // State für ausgewählte Tags

    // Funktion, die ein Tag hinzufügt oder entfernt
    const toggleTag = (tagId) => {
        setSelectedTags(prevSelectedTags => {
            if (prevSelectedTags.includes(tagId)) {
                return prevSelectedTags.filter(id => id !== tagId);  // Entfernt das Tag, wenn es bereits ausgewählt ist
            } else {
                return [...prevSelectedTags, tagId];  // Fügt das Tag hinzu, wenn es noch nicht ausgewählt ist
            }
        });
    };

    // Wenn die Tags hinzugefügt wurden, übergebe die Auswahl zurück an die Elternkomponente
    const handleAddTags = () => {
        console.log("Selected tags:", selectedTags);
        setActiveOverlay(null);  // Schließt das Overlay
        onAddTags(selectedTags);  // Übergibt die Tags an die Elternkomponente, falls benötigt
    };

    return (
        <SlideInOverlay isVisible={activeOverlay === 'tagSelection'} onClose={() => setActiveOverlay(null)} title="Tags auswählen">
            <div className="tag-selection">
                {tagGroups.map((group) => (
                    <div key={group.tagGroupId} className="tag-selection__group">

                        {/* Untergruppennamen der Tags */}
                        <h3 className="tag-selection__title">{group.tagGroupName}</h3>

                        {/* Ausgabe der eigentlichen Tags */}
                        <div className="tag-selection__tags">
                            {group.tags.map((tag) => (
                                <button key={tag.tagId}
                                    className={`tag-selection__tag ${selectedTags.includes(tag.tagId) ? 'tag-selection__tag--selected' : ''}`}
                                    onClick={() => toggleTag(tag.tagId)}
                                >
                                    {tag.tagName}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Hinzufügen der Tags Button */}
                <button className="btn btn-secondary form-control mb-2" onClick={handleAddTags}>Tags hinzufügen</button>
            </div>
        </SlideInOverlay>
    );
};

export default TagSelectionOverlay;
