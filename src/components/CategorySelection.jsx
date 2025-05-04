import React from "react";
import { BootstrapIcons } from "./BootstrapIcons.jsx";

const CategorySelection = ({ onCategorySelect }) => {
    const categories = [
        {
            id: "MEDIA",
            name: "Media",
            description: "(Filme, Spiele, Musik)",
            icon: <BootstrapIcons.CameraReels width={30} height={30} />
        },
        {
            id: "LOCATION",
            name: "Location",
            description: "(Restaurants, Shops)",
            icon: <BootstrapIcons.GeoAlt width={30} height={30} />
        },
        {
            id: "RECIPE",
            name: "Rezept",
            description: "(Mahlzeiten, Getränke)",
            icon: <BootstrapIcons.CupStraw width={30} height={30} />
        },
        {
            id: "PRODUCT",
            name: "Produkt",
            description: "(alle möglichen Produkte)",
            icon: <BootstrapIcons.Handbag width={30} height={30} />
        }
    ];

    return (
        <div className="category-selection">
            <h2 className="category-selection__title">Was möchtest du empfehlen?</h2>

            <div className="category-selection__buttons">
                {categories.map((category) => (
                    <button key={category.id} className="category-selection__button text-dark" onClick={() => onCategorySelect(category.id)}>

                        <div className="category-selection__icon">{category.icon}</div>
                        <div className="category-selection__text">
                            <h3 className="category-selection__name">{category.name}</h3>
                            <p className="category-selection__description">{category.description}</p>
                        </div>

                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategorySelection;