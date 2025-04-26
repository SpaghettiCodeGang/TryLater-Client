import {useLayout} from "../../hooks/useLayout.jsx";
import {useEffect, useState} from "react";
import RecommendationCard from "../../components/RecommendationCard.jsx";
import {useFetch} from "../../hooks/useFetch.jsx";

const DiscoverRecommendationsPage = () => {
    const { setHeadline } = useLayout();

    const { data: recommendations, refetch } = useFetch('/recommendation?status=SENT');

    useEffect(() => {
        setHeadline("Entdecke");
        return () => setHeadline("");
    }, []);

    return (
        <>
            <RecommendationCard
                activeRecommendation={recommendations?.[0]}
            />
        </>
    )
}

export default DiscoverRecommendationsPage;
