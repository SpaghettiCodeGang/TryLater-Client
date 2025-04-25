import { useEffect, useState } from "react";
import { useLayout } from "../../hooks/useLayout.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import RecommendationCard from "../../components/RecommendationCard.jsx";
import SwipeCard from "../../components/SwipeCard.jsx";

const DiscoverRecommendationsPage = () => {
    const { setHeadline } = useLayout();
    const [recommendations, setRecommendations] = useState([]);

    const { data: fetchedRecommendations } = useFetch('/recommendation?status=SENT');

    useEffect(() => {
        setHeadline("Entdecke");

        if (fetchedRecommendations) {
            setRecommendations(fetchedRecommendations);
        }

        return () => setHeadline("");
    }, [fetchedRecommendations]);

    const handleAccept = async (recommendation) => {
        try {
            console.log("Accept");
        } catch (error) {

        } finally {
            setTimeout(() => {
                setRecommendations((prev) =>
                    prev.filter((swipedRecommendation) =>
                        swipedRecommendation.id !== recommendation.id));
                }, 500);
        }
    };

    const handleDelete = async (recommendation) => {
        try {
            console.log("Delete");
        } catch (error) {

        } finally {
            setTimeout(() => {
                setRecommendations((prev) =>
                    prev.filter((swipedRecommendation) =>
                        swipedRecommendation.id !== recommendation.id));
            }, 500);
        }
    };

    return (
        <div className="swipe-container">
            {recommendations?.map((recommendation) => (
                <SwipeCard
                    key={recommendation.id}
                    onSwipeLeft={() => handleDelete(recommendation)}
                    onSwipeRight={() => handleAccept(recommendation)}
                    currentCard={recommendation}
                    allCards={recommendations}
                >
                    <RecommendationCard activeRecommendation={recommendation} />
                </SwipeCard>
            ))}
        </div>
    )
}

export default DiscoverRecommendationsPage;
