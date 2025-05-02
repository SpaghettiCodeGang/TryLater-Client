import {useEffect, useState} from "react";
import apiService from "../service/apiService.jsx";
import {BootstrapIcons} from "./BootstrapIcons.jsx";


const RecommendationCard = ({activeRecommendation, action, onClose, error = null}) => {
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

                            {onClose}

                            <div className="recommendation-card_rating">
                                {Array.from({length: activeRecommendation?.rating}).map((_, i) => (
                                    <BootstrapIcons.HeartFill key={i} width={18} height={18}/>
                                ))}
                            </div>
                        </div>
                        <div className="recommendation-card_header__bottom">
                            <span
                                className="recommendation-card_tag">{activeRecommendation?.creator?.displayName} empfiehlt</span>
                            <h2>{activeRecommendation?.title}</h2>
                        </div>
                    </div>

                    <div className="recommendation-card_body">
                        <div className="mb-3">
                            <label htmlFor="tags" className="form-label">Tags</label>
                            <div className="recommendation-card_tags" id="tags">
                                {activeRecommendation?.tagGroups?.map((tagGroup, t) =>
                                    tagGroup.tags.map((tag, i) => (
                                        <div className="recommendation-card_tag recommendation-card_tag--gray"
                                             key={`${t}-${i}`}>
                                            {tag.tagName}
                                        </div>
                                    ))
                                )}
                            </div>

                        </div>

                        <div className="mb-3">
                            <label htmlFor="link" className="form-label">Link</label>
                            <div className="form-control" id="link">
                                {activeRecommendation?.url ? (
                                    <a href={activeRecommendation?.url} target="_blank">{activeRecommendation?.url}</a>
                                ) : (
                                    <p className="m-0">Kein Link vorhanden</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Notizen</label>
                            <div className="form-control" id="description">
                                {activeRecommendation?.description ? (
                                    <p className="m-0">{activeRecommendation?.description}</p>
                                ) : (
                                    <p className="m-0">Keine Beschreibung vorhanden</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="recommendation-card_footer">
                        {error && (
                            <div className="mb-4 d-flex justify-content-center">
                                <small className="text-danger ps-3 pe-3 d-inline-flex">
                                    {error}
                                </small>
                            </div>
                        )}
                        {action}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecommendationCard;