import {useLayout} from "../../hooks/useLayout.jsx";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.jsx";
import RecommendationCard from "../../components/RecommendationCard.jsx";
import RecommendationPreviewComponent from "./RecommendationPreviewComponent.jsx";
import apiService from "../../service/apiService.jsx";

const MyRecommendationsPage = () => {
    const {setHeadline} = useLayout();
    const [activeCard, setActiveCard] = useState(false);
    const {data: acceptedRecommendations, refetch} = useFetch('/recommendation?status=ACCEPTED');
    const [medias, setMedias] = useState([]);
    const [locations, setLocations] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setHeadline("Sammlung");
        setMedias([]);
        setLocations([])
        setRecipes([]);
        setProducts([]);

        acceptedRecommendations?.forEach((recommendation) => {
            if (recommendation?.category === "MEDIA") {
                setMedias(prev => [...prev, recommendation]);
            } else if (recommendation?.category === "LOCATION") {
                setLocations(prev => [...prev, recommendation]);
            } else if (recommendation?.category === "RECIPE") {
                setRecipes(prev => [...prev, recommendation]);
            } else if (recommendation?.category === "PRODUCT") {
                setProducts(prev => [...prev, recommendation]);
            }
        })

        return () => setHeadline("");
    }, [acceptedRecommendations]);

    const handleActive = (activeRecommendation) => {
        setActiveCard(activeRecommendation)
    }

    const handleClose = () => {
        setActiveCard(false)
    }

    return (
        <>

            {!activeCard ? (
                <>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <h3>Media</h3>
                                </button>
                            </h2>
                            <div id="collapseOne" className="collapse"
                                 data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <ul>
                                        {medias?.map((media) => (
                                            <RecommendationPreviewComponent
                                                key={media.id}
                                                recommendation={media}
                                                onClick={() => handleActive(media)}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <h3>Locations</h3>
                                </button>
                            </h2>
                            <div id="collapseTwo" className="collapse"
                                 data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <ul>
                                        {locations?.map((location) => (
                                            <RecommendationPreviewComponent
                                                key={location.id}
                                                recommendation={location}
                                                onClick={() => handleActive(location)}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                    <h3>Rezepte</h3>
                                </button>
                            </h2>
                            <div id="collapseThree" className="collapse"
                                 data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <ul>
                                        {recipes?.map((recipe) => (
                                            <RecommendationPreviewComponent
                                                key={recipe.id}
                                                recommendation={recipe}
                                                onClick={() => handleActive(recipe)}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseFour" aria-expanded="false"
                                        aria-controls="collapseFour">
                                    <h3>Produkte</h3>
                                </button>
                            </h2>
                            <div id="collapseFour" className="collapse"
                                 data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <ul>
                                        {products?.map((product) => (
                                            <RecommendationPreviewComponent
                                                key={product.id}
                                                recommendation={product}
                                                onClick={() => handleActive(product)}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*<button onClick={handleShow}>Show</button>
                    <div className="accordion">
                        {acceptedRecommendations?.map((recommendation) => (
                            <RecommendationCard
                                key={recommendation.id}
                                activeRecommendation={recommendation}/>
                        ))}
                    </div>*/}
                </>
            ) : (
                <RecommendationCard
                    activeRecommendation={activeCard}
                    onClose={<button onClick={handleClose}>X</button>}
                    action={
                        <button>Start</button>
                    }
                >

                </RecommendationCard>
            )}
        </>
    )
}

export default MyRecommendationsPage;
