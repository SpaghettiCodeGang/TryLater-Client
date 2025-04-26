import {useEffect, useState} from "react";
import apiService from "../service/apiService.jsx";
import { BootstrapIcons } from "./BootstrapIcons.jsx";


const RecommendationCard = ({ activeRecommendation, action }) => {
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        setImgSrc(activeRecommendation?.imgPath && activeRecommendation?.imgPath.trim() !== "" ?
            `${apiService.getImgUrl()}${activeRecommendation?.imgPath}` :
            `/assets/${activeRecommendation?.category.toLowerCase()}.png`);
    }, [activeRecommendation]);

    return (
        <>
            <div className="recommendation-card">
                <div className="recommendation-card_inner">
                    <div className="recommendation-card_header" style={{backgroundImage: "url(" + imgSrc + ")"}}>
                        <div className="recommendation-card_header__top">
                            <span className="recommendation-card_tag">
                              {typeof activeRecommendation?.category === 'string'
                                  ? activeRecommendation.category.charAt(0).toUpperCase() + activeRecommendation.category.slice(1).toLowerCase()
                                  : ''}
                            </span>
                            <div className="recommendation-card_rating">
                                {Array.from({ length: activeRecommendation?.rating }).map((_, i) => (
                                    <BootstrapIcons.HeartFill key={i} width={18} height={18} />
                                ))}
                            </div>
                        </div>
                        <div className="recommendation-card_header__bottom">
                            <span className="recommendation-card_tag">{activeRecommendation?.creator?.displayName} empfiehlt</span>
                            <h2>{activeRecommendation?.title}</h2>
                        </div>
                    </div>

                    <div className="recommendation-card_body">
                        <div className="mb-3">
                            <label htmlFor="tags" className="form-label">Tags</label>
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

                        <div className="mb-3">
                            <label htmlFor="link" className="form-label">Link</label>
                            <input type="text" className="form-control" id="link" disabled
                                   placeholder={activeRecommendation?.url ? activeRecommendation?.url : "Kein Link vorhanden"} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Notizen</label>
                            <textarea className="form-control" id="description" disabled
                                      placeholder={activeRecommendation?.description ? activeRecommendation?.description : "Keine Beschreibung vorhanden"} />
                        </div>
                    </div>

                    <div className="recommendation-card_footer">
                        { action }
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecommendationCard;