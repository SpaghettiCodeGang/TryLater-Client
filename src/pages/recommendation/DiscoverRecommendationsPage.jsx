import { useLayout } from "../../hooks/useLayout.jsx";
import { useEffect, useState } from "react";
import RecommendationCard from "../../components/RecommendationCard.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import SwipeCard from "../../components/SwipeCard.jsx";
import {motion} from "framer-motion";
import {BootstrapIcons} from "../../components/BootstrapIcons.jsx";

const DiscoverRecommendationsPage = () => {
    const { setHeadline } = useLayout();
    const [recommendations, setRecommendations] = useState([]);
    const [swipeDirection, setSwipeDirection] = useState(null);

    const { data: fetchedRecommendations } = useFetch('/recommendation?status=SENT');

    useEffect(() => {
        setHeadline("Entdecke");

        if (fetchedRecommendations) {
            setRecommendations(fetchedRecommendations.reverse());
        }

        return () => setHeadline("");
    }, [fetchedRecommendations]);

    const handleAccept = async (recommendation) => {
        setSwipeDirection("right");

        try {
            console.log("Accept");
        } catch (error) {

        } finally {
            setRecommendations((prev) =>
                prev.filter((swipedRecommendation) =>
                    swipedRecommendation.id !== recommendation.id));

            setTimeout(() => {
                setSwipeDirection(null);
            }, 500);
        }
    };

    const handleDelete = async (recommendation) => {
        setSwipeDirection("left");

        try {
            console.log("Delete");
        } catch (error) {

        } finally {
            setRecommendations((prev) =>
                prev.filter((swipedRecommendation) =>
                    swipedRecommendation.id !== recommendation.id));

            setTimeout(() => {
                setSwipeDirection(null);
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
                    allCards={recommendations}
                    currentCard={recommendation}
                >
                    <RecommendationCard activeRecommendation={recommendation} />
                </SwipeCard>
            ))}

            <motion.div
                className="swipe-card"
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
                initial={{
                    opacity: 0,
                    display: "none",
                }}
                animate={{
                    opacity: swipeDirection === "left" ? 1 : 0,
                    display: swipeDirection === "left" ? "flex" : "none",
                    transition: {
                        duration: 0.5,
                        ease: "easeIn",
                    }
                }}
            >
                <BootstrapIcons.XCircleFill width={100} height={100} fill="#797979"/>
            </motion.div>
            <motion.div
                className="swipe-card"
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
                initial={{
                    opacity: 0,
                    display: "none",
                }}
                animate={{
                    opacity: swipeDirection === "right" ? 1 : 0,
                    display: swipeDirection === "right" ? "flex" : "none",
                    transition: {
                        duration: 0.5,
                        ease: "easeIn"
                    }
                }}
            >
                <BootstrapIcons.CheckCircleFill width={100} height={100} fill="#FFA400" />
            </motion.div>
        </div>
    )
}

export default DiscoverRecommendationsPage;
