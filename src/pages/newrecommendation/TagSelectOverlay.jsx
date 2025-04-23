import { useState } from "react";
import SlideInOverlay from "../../components/SlideInOverlay.jsx";

const TagSelectionOverlay = ({ activeOverlay, setActiveOverlay, selectedCategory }) => {
    const [selectedTags, setSelectedTags] = useState([]);

    // tags platzhalter
    const tagGroups = {
        recipe: [
            {
                title: "Ernährungspräferenzen",
                tags: ["Omnivor", "Vegetarisch", "Vegan", "Laktosefrei", "Glutenfrei"]
            },
            {
                title: "Zubereitungszeit",
                tags: ["Schnell", "Mittellang", "Zeitintensiv"]
            },
            {
                title: "Weitere Tags",
                tags: ["Wenig Zutaten", "Viele Zutaten", "Scharf", "Mild", "Low Fat", "Low Carb", "Mahlzeit", "Getränk", "Dessert"]
            }
        ],
        media: [
            {
                title: "Genre",
                tags: ["Action", "Drama", "Comedy", "Thriller", "SciFi", "Fantasy"]
            },
            {
                title: "Länge",
                tags: ["Kurz", "Mittel", "Lang"]
            }
        ],
        location: [
            {
                title: "Art",
                tags: ["Restaurant", "Café", "Bar", "Shop", "Museum", "Park"]
            },
            {
                title: "Preisniveau",
                tags: ["Günstig", "Mittel", "Teuer"]
            }
        ],
        product: [
            {
                title: "Kategorie",
                tags: ["Elektronik", "Kleidung", "Haushalt", "Beauty", "Sport"]
            },
            {
                title: "Preisniveau",
                tags: ["Günstig", "Mittel", "Teuer", "Luxus"]
            }
        ]
    };

    // die Tags werden basierend auf der gewählten Kategorie ausgewählt
    const categoryTags = tagGroups[selectedCategory] || tagGroups.recipe;

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleAddTags = () => {
        // hier werden die ausgewählten Tags gespeichert
        console.log("Selected tags:", selectedTags);
        setActiveOverlay("contactSelection"); // Move to the next step
    };

    return (
        <SlideInOverlay
            isVisible={activeOverlay === 'tagSelection'}
            onClose={() => setActiveOverlay(null)}
            title="Tags auswählen"
        >
            <div className="tag-selection">
                {categoryTags.map((group, index) => (
                    <div key={index} className="tag-selection__group">
                        <h3 className="tag-selection__title">{group.title}</h3>
                        <div className="tag-selection__tags">
                            {group.tags.map((tag, tagIndex) => (
                                <button
                                    key={tagIndex}
                                    className={`tag-selection__tag ${selectedTags.includes(tag) ? 'tag-selection__tag--selected' : ''}`}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    className="tag-selection__button"
                    onClick={handleAddTags}
                >
                    Tags hinzufügen
                </button>
            </div>
        </SlideInOverlay>
    );
};

export default TagSelectionOverlay;
