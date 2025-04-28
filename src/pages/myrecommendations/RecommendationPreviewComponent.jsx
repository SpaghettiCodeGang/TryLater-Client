import {useEffect, useState} from "react";
import apiService from "../../service/apiService.jsx";


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
            <li className="contact_list__item" role="button" onClick={onClick} tabIndex="0"
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        onClick();
                    }
                }}
            >
                <div className="contact_list__data">
                    <img className="contact_list__img" src={imgSrc?.toString()} alt={`${recommendation?.title}`}/>
                    <p className="contact_list__displayname">{recommendation?.title}</p>
                    <p className="contact_list__username">{recommendation?.creator?.displayName}</p>
                </div>
            </li>
        </>
    )

}


export default RecommendationPreviewComponent;