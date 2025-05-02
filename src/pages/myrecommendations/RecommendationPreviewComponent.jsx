import {useEffect, useState} from "react";
import apiService from "../../service/apiService.jsx";
import {BootstrapIcons} from "../../components/BootstrapIcons.jsx";


const RecommendationPreviewComponent = ({recommendation, onClick}) => {
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        setImgSrc(recommendation?.imgPath && recommendation
            ?.imgPath.trim() !== "" ?
            `${apiService.getImgUrl()}${recommendation?.imgPath}` :
            `/assets/${recommendation?.category.toLowerCase()}.png`);
    }, [recommendation]);

    return (
        <>
            <li className="recommendation_preview__item" role="button" onClick={onClick} tabIndex="0"
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        onClick();
                    }
                }}
            >
                <div className="recommendation_preview__data">
                    <div className="recommendation_preview__imgwrapper">
                        <img className="recommendation_preview__img" src={imgSrc?.toString()}
                             alt={`${recommendation?.title}`}/>
                    </div>
                    <div className="recommendation_preview__contentwrapper">
                        <div className="recommendation_preview__creatorratingwrapper">
                            <p className="recommendation_preview__creator">
                                Von {recommendation?.creator?.displayName}
                            </p>
                            <p className="recommendation_preview__rating">{Array.from({length: recommendation?.rating}).map((_, i) => (
                                <BootstrapIcons.HeartFill key={i} width={18} height={18}/>
                            ))}</p>
                        </div>
                        <div className="recommendation_preview__titlewrapper">
                            <p className="recommendation_preview__title imp-text">{recommendation?.title}</p>
                        </div>
                        <div className="recommendation_preview__tagwrapper">
                            {recommendation?.tagGroups?.map((tagGroup, t) =>
                                tagGroup.tags.map((tag, i) => (
                                    <div className="recommendation_preview__tag recommendation_preview__tags--gray"
                                         key={`${t}-${i}`}>
                                        {tag.tagName}
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </li>
        </>
    )

}


export default RecommendationPreviewComponent;