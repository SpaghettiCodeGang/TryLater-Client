import { motion, useMotionValue, useTransform } from "framer-motion";
import {useEffect, useState} from "react";

const SwipeCard = ({ children, onSwipeLeft, onSwipeRight, currentCard, allCards }) => {
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-250, 0, 250], [0, 1, 0]);
    const [isFront, setIsFront] = useState(false);

    useEffect(() => {
        if (currentCard.id === allCards[allCards.length - 1].id) {
            setIsFront(true);
        }
    }, [allCards]);

    const handleDragEnd = () => {
        if (x.get() > 50) {
            onSwipeRight();
        } else if (x.get() < -50) {
            onSwipeLeft();
        }
    }

    return (
        <>
            <motion.div
                className="swipe-card"
                style={{
                    x,
                    opacity,
                }}
                initial={{
                    filter:"grayscale(0%)",
                    scale: 1,
                }}
                animate={{
                    filter: isFront? "grayscale(0%)": "grayscale(100%)",
                    scale: isFront? 1: 0.95,
                    transition: {
                        duration: 1.5,
                    }
                }}
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0
                }}
                onDragEnd={handleDragEnd}
            >
                {children}
            </motion.div>
        </>
    );
};

export default SwipeCard;
