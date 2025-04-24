import { useState } from "react";
import SlideInOverlay from "../../components/SlideInOverlay.jsx";
import "../../styles/components/tag-selection.scss";

const TagSelectionOverlay = ({ activeOverlay, setActiveOverlay, tagGroups = [] }) => {
    const [selectedTags, setSelectedTags] = useState([]);

    const toggleTag = (tagId) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    const handleAddTags = () => {
        console.log("Selected tags:", selectedTags);
        setActiveOverlay("contactSelection"); // oder wohin es weitergehen soll
    };

    return (
        <SlideInOverlay isVisible={activeOverlay === 'tagSelection'} onClose={() => setActiveOverlay(null)} title="Tags auswählen">
            <div className="tag-selection">
                {tagGroups.map((group) => (

                    <div key={group.tagGroupId} className="tag-selection__group">
                        <h3 className="tag-selection__title">{group.tagGroupName}</h3>

                        <div className="tag-selection__tags">
                            {group.tags.map((tag) => (
                                <button key={tag.tagId} className={`tag-selection__tag ${selectedTags.includes(tag.tagId) ? 'tag-selection__tag--selected' : ''}`} onClick={() => toggleTag(tag.tagId)}>
                                    {tag.tagName}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <button className="btn btn-secondary form-control mb-2" onClick={handleAddTags}>Tags hinzufügen</button>
            </div>
        </SlideInOverlay>
    );
};

export default TagSelectionOverlay;
