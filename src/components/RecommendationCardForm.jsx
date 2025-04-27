import {useEffect, useState} from "react";
import apiService from "../service/apiService.jsx";
import { BootstrapIcons } from "./BootstrapIcons.jsx";


const RecommendationCard = ({ activeRecommendation, onAddTags }) => {
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
            <div className="recommendation-card-f">

                {/* Karte innen */}
                <div className="recommendation-card-f_inner">

                    {/* Headerbild und alles im Bild */}
                    <div className="recommendation-card-f_header" style={{backgroundImage: "url(" + imgSrc + ")", minHeight: "60vh"}}>

                        {/* Kategorie-Tag und Herzbewertung */}
                        <div className="recommendation-card-f_header__top">
                            <span className="recommendation-card-f_tag">
                              {typeof activeRecommendation?.category === 'string'
                                  ? activeRecommendation.category.charAt(0).toUpperCase() + activeRecommendation.category.slice(1).toLowerCase()
                                  : 'Kategorie'}
                            </span>
                            {/* Bewertung */}
                            <button className="recommendation-card-f_rating"><BootstrapIcons.PencilFill width={20} height={20} style={{marginRight: '0.25rem', paddingBottom: '0.1rem'}}/>
                                {Array.from({ length: activeRecommendation?.rating ?? 3 }).map((_, i) => (
                                    <BootstrapIcons.HeartFill key={i} width={18} height={18} />
                                ))}
                            </button>
                        </div>

                        {/* Image Upload Button */}
                        <div className="recommendation-card-f_header__middle">
                            <button className="recommendation-card-f_text">
                                Bild hochladen
                                <BootstrapIcons.CameraFill width={30} height={30} color="$white" style={{marginLeft: '0.5rem', paddingBottom: '0.25rem'}}/>
                            </button>
                        </div>

                        {/* Wer empfiehlt und Titel */}
                        <div className="recommendation-card-f_header__bottom">
                            <span className="recommendation-card-f_tag">{ 'Du' } empfiehlst</span>
                            <div className="recommendation-card-f_title">
                                <input
                                    type="text"
                                    className="recommendation-card-f_title--form"
                                    id="title"
                                    placeholder={activeRecommendation?.title || "Titel deiner tollen Empfehlung"}
                                />
                                <BootstrapIcons.PencilFill width={30} height={30} color="white" style={{paddingTop: '0.3rem'}}/>
                            </div>
                        </div>

                    </div>
                    {/* Ende Headerbild */}


                    {/* Body Empfehlung (Tags, Link, Beschreibung) */}
                    <div className="recommendation-card-f_body">

                        {/* Tag Section */}
                        <div className="mb-3">
                            <label htmlFor="tags" className="form-label">Tags<BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{marginLeft: '0.5rem', paddingBottom: '0.1rem'}}/></label>
                            <div className="recommendation-card-f_tags" id="tags">
                                {activeRecommendation?.tagGroups && activeRecommendation.tagGroups.length > 0
                                    ? activeRecommendation.tagGroups.map((tagGroup, t) =>
                                        tagGroup.tags.map((tag, i) => (
                                            <div className="recommendation-card-f_tag recommendation-card-f_tag--gray" key={`${t}-${i}`}>
                                                {tag.tagName}
                                            </div>
                                        ))
                                    ) : ( <button type="button" className="recommendation-card-f_addtag" onClick={onAddTags}>
                                        <BootstrapIcons.PlusCircleFill width={18} height={18} color="$dark" style={{marginRight: '0.5rem', paddingBottom: '0.15rem'}}/>Tags hinzufügen
                                    </button> )
                                }
                            </div>
                        </div>

                        {/* Link Section */}
                        <div className="mb-3">
                            <label htmlFor="link" className="form-label">Link<BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{marginLeft: '0.5rem', paddingBottom: '0.1rem'}} /></label>
                            <input type="text" className="form-control" id="link"
                                   placeholder={activeRecommendation?.url ? activeRecommendation?.url : "Kein Link vorhanden"} />
                        </div>

                        {/* Beschreibung Section */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Notizen<BootstrapIcons.PencilFill width={20} height={20} color="$dark" style={{marginLeft: '0.5rem', paddingBottom: '0.1rem'}} /></label>
                            <textarea className="form-control" id="description"
                                      placeholder={activeRecommendation?.description ? activeRecommendation?.description : "Keine Beschreibung vorhanden"} />
                        </div>
                    </div>

                    {/* Footer mit Action z.B. ein Button */}
                    <div className="recommendation-card-f_footer">
                           <button className="btn btn-primary form-control mb-4" style={{width: "70%", marginLeft: "15%", marginRight: "15%"}}>An Kontakte senden</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecommendationCard;