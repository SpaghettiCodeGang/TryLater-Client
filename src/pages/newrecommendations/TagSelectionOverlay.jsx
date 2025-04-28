import SlideInOverlay from "../../components/SlideInOverlay.jsx";

const TagSelectionOverlay = ({ activeOverlay, setActiveOverlay, tagGroups = [], selectedTags, setSelectedTags }) => {
    // Achtung: Kein eigener useState mehr hier!

    // Tag an- oder abwählen
    const toggleTag = (tagId) => {
        setSelectedTags(prevSelectedTags => {
            if (prevSelectedTags.includes(tagId)) {
                return prevSelectedTags.filter(id => id !== tagId);
            } else {
                return [...prevSelectedTags, tagId];
            }
        });
    };

    const handleAddTags = () => {
        setActiveOverlay(null);
    };

    return (
        <SlideInOverlay
            isVisible={activeOverlay === 'tagSelection'} onClose={() => setActiveOverlay(null)} title="Tags auswählen">
            <div className="tag-selection">
                {tagGroups.map((group) => (
                    <div key={group.tagGroupId} className="tag-selection__group">
                        <h3 className="tag-selection__title">{group.tagGroupName}</h3>
                        <div className="tag-selection__tags">
                            {group.tags.map((tag) => (
                                <button
                                    key={tag?.id}
                                    className={`tag-selection__tag ${selectedTags.includes(tag.id) ? 'tag-selection__tag--selected' : ''}`}
                                    onClick={() => toggleTag(tag.id)}
                                >
                                    {tag.tagName}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <button className="btn btn-secondary form-control mb-2" onClick={handleAddTags}>
                    Tags hinzufügen
                </button>
            </div>
        </SlideInOverlay>
    );
};

export default TagSelectionOverlay;
