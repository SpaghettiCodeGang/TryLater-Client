import {useEffect, useState} from "react";
import apiService from "../service/apiService.jsx";
import { BootstrapIcons } from "./BootstrapIcons.jsx";

// Speichert Bild URL
const RecommendationCard = ({ activeRecommendation, action }) => {
    const [imgSrc, setImgSrc] = useState(null);

    // Bild Url wird gesetzt ansonsten wird default Bild genommen
    useEffect(() => {
        setImgSrc(activeRecommendation?.imgPath && activeRecommendation?.imgPath.trim() !== "" ?
            `${apiService.getImgUrl()}${activeRecommendation?.imgPath}` :
            `/assets/recipe.png`);
        //`/assets/${activeRecommendation?.category.toLowerCase()}.png`);
    }, [activeRecommendation]);

// Content
    return (
        <>
           {/* Bau der eigentlichen Karte */}
            <div className="recommendation-card">

                {/* Karte innen */}
                <div className="recommendation-card_inner">

                    {/* Headerbild und alles im Bild */}
                    <div className="recommendation-card_header" style={{backgroundImage: "url(" + imgSrc + ")", minHeight: "60vh"}}>

                        {/* Kategorie-Tag und Herzbewertung */}
                        <div className="recommendation-card_header__top">
                            <span className="recommendation-card_tag">
                              {typeof activeRecommendation?.category === 'string'
                                  ? activeRecommendation.category.charAt(0).toUpperCase() + activeRecommendation.category.slice(1).toLowerCase()
                                  : 'Kategorie'}
                            </span>
                            {/* Bewertung */}
                            <div className="recommendation-card_rating"><BootstrapIcons.PencilFill width={20} height={20}  style={{marginRight: '0.25rem', paddingBottom: '0.1rem', color:'$white'}}/>
                                {Array.from({ length: activeRecommendation?.rating ?? 3 }).map((_, i) => (
                                    <BootstrapIcons.HeartFill key={i} width={18} height={18} />
                                ))}
                            </div>
                        </div>

                        {/* Wer empfiehlt und Titel */}
                        <div className="recommendation-card_header__bottom">
                            <span className="recommendation-card_tag">{ 'Du' } empfiehlst</span>
                            <h2>{activeRecommendation?.title || 'Titel der Empfehlung' } <BootstrapIcons.PencilFill width={30} height={30} color="$white" style={{marginLeft: '0.5rem', paddingBottom: '0.1rem'}}/></h2>
                        </div>

                    </div>
                    {/* Ende Headerbild */}


                    {/* Body Empfehlung (Tags, Link, Beschreibung) */}
                    <div className="recommendation-card_body">

                        {/* Tag Section */}
                        <div className="mb-3">
                            <label htmlFor="tags" className="form-label">Tags<BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{marginLeft: '0.5rem', paddingBottom: '0.1rem'}}/></label>
                            <div className="recommendation-card_tags" id="tags">
                                {activeRecommendation?.tagGroups?.map((tagGroup, t) =>
                                    tagGroup.tags.map((tag, i) => (
                                        <div className="recommendation-card_tag recommendation-card_tag--gray" key={`${t}-${i}`}>
                                            {tag.tagName}
                                        </div>
                                    ))
                                )}
                            </div>

                        </div>

                        {/* Link Section */}
                        <div className="mb-3">
                            <label htmlFor="link" className="form-label">Link<BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{marginLeft: '0.5rem', paddingBottom: '0.1rem'}} /></label>
                            <input type="text" className="form-control" id="link" disabled
                                   placeholder={activeRecommendation?.url ? activeRecommendation?.url : "Kein Link vorhanden"} />
                        </div>

                        {/* Beschreibung Section */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Notizen<BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{marginLeft: '0.5rem', paddingBottom: '0.1rem'}} /></label>
                            <textarea className="form-control" id="description" disabled
                                      placeholder={activeRecommendation?.description ? activeRecommendation?.description : "Keine Beschreibung vorhanden"} />
                        </div>
                    </div>

                    {/* Footer mit Action z.B. ein Button */}
                    <div className="recommendation-card_footer">
                        { action }
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecommendationCard;