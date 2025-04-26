import { useEffect, useState } from "react";
import { useLayout } from "../../hooks/useLayout.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import RecommendationCard from "../../components/RecommendationCard.jsx";
import SwipeCard from "../../components/SwipeCard.jsx";
import {BootstrapIcons} from "../../components/BootstrapIcons.jsx";

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
            <div className="d-flex justify-content-center align-items-center"
                 style={{gridColumn: "1", gridRow: "1"}}>
                <div className="d-flex flex-column align-items-center justify-content-center text-center">
                    <BootstrapIcons.HourglassBottom width={50} height={50} fill="#4A4044" className="mb-4"/>
                    <p className="m-0">Du hast keine Empfehlungen mehr.</p>
                    <p>Schau später nochmal rein</p>
                </div>
            </div>
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
