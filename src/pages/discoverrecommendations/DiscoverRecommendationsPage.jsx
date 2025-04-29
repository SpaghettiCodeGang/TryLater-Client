import { useEffect, useState } from "react";
import { useLayout } from "../../hooks/useLayout.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import RecommendationCard from "../../components/RecommendationCard.jsx";
import SwipeCard from "../../components/SwipeCard.jsx";
import { BootstrapIcons } from "../../components/BootstrapIcons.jsx";
import apiService from "../../service/apiService.jsx";
import { motion } from "framer-motion";

const DiscoverRecommendationsPage = () => {
    const { setHeadline } = useLayout();
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);

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
            await apiService.patch(`/recommendation/${recommendation.id}`, {
                "recommendationAssignmentStatus": "ACCEPTED",
            });
        } catch (error) {
            setError(error?.data?.message);
        } finally {
            setTimeout(() => {
                setRecommendations((prev) =>
                    prev.filter((swipedRecommendation) =>
                        swipedRecommendation.id !== recommendation.id));
                }, 500);

            setTimeout(() => {
                setError(null);
            }, 1000)
        }
    };

    const handleDelete = async (recommendation) => {
        try {
            await apiService.delete(`/recommendation/${recommendation.id}`);
        } catch (error) {
            setError(error?.data?.message);
        } finally {
            setTimeout(() => {
                setRecommendations((prev) =>
                    prev.filter((swipedRecommendation) =>
                        swipedRecommendation.id !== recommendation.id));
            }, 500);

            setTimeout(() => {
                setError(null);
            }, 1000)
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

            <motion.div
                className="swipe-card_icon"
                style={{
                    zIndex: 1000,
                    opacity: error ? 1 : 0
                }}
            >
                <BootstrapIcons.XCircleFill width={120} height={120} fill="#D40000" />
            </motion.div>
        </div>
    )
}

export default DiscoverRecommendationsPage;
