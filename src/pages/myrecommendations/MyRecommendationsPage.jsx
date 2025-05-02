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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const loadingAnimationDuration = 500;

    useEffect(() => {
        setHeadline("Sammlung");
        setMedias([]);
        setLocations([])
        setRecipes([]);
        setProducts([]);
        setError(null);

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

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await apiService.delete(`/recommendation/${id}`);
            await refetch();
        } catch (error) {
            setTimeout(() => {
                setError(error?.data?.message)
            }, loadingAnimationDuration);
        } finally {
            setTimeout(() => {
                setLoading(false);
                /*setActiveCard(false);*/
            }, loadingAnimationDuration);
        }
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
                </>
            ) : (
                <RecommendationCard
                    activeRecommendation={activeCard}
                    error={error}
                    onClose={<button onClick={handleClose}>X</button>}
                    action={
                        <button className="btn btn-primary form-control" type="submit" disabled={loading}
                                onClick={() => {
                                    void handleDelete(activeCard.id)
                                }}>
                            {loading ? (
                                <>
                                    <span className="btn-spinner me-2"/>
                                    <span>Sende...</span>
                                </>
                            ) : (
                                <span>Erledigt</span>
                            )}
                        </button>
                    }
                >

                </RecommendationCard>
            )}
        </>
    )
}

export default MyRecommendationsPage;
