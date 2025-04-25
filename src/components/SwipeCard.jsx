import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {BootstrapIcons} from "./BootstrapIcons.jsx";

const SwipeCard = ({ children, onSwipeLeft, onSwipeRight, currentCard, allCards }) => {
    const x = useMotionValue(0);

    const opacity = useTransform(x, [-250, 0, 250], [0, 1, 0]);
    const rightIconOpacity = useTransform(x, [50, 150], [0, 1]);
    const leftIconOpacity = useTransform(x, [-150, -50], [1, 0]);

    const [lockedDirection, setLockedDirection] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isFront, setIsFront] = useState(false);

    useEffect(() => {
        if (currentCard.id === allCards[allCards.length - 1].id) {
            setIsFront(true);
        }
    }, [allCards]);

    useEffect(() => {
        x.on('change', (latestX) => {
            if (latestX > 150 && lockedDirection !== "right") {
                setLockedDirection("right");
            } else if (latestX < -150 && lockedDirection !== "left") {
                setLockedDirection("left");
            } else if (latestX >= -150 && latestX <= 150 && lockedDirection !== null) {
                setLockedDirection(null);
            }
        });

    }, [x, lockedDirection]);

    const handleDragEnd = () => {
        if (x.get() > 150) {
            setIsDragging(true);
            onSwipeRight();
            setTimeout(() => {
                setLockedDirection(null)
            }, 500)
        } else if (x.get() < -150) {
            setIsDragging(true);
            onSwipeLeft();
            setTimeout(() => {
                setLockedDirection(null)
            }, 500)
        }
    }

    return (
        <>
            <motion.div
                className="swipe-card"
                style={{
                    x,
                    opacity,
                    display: isDragging ? "none" : "",
                }}
                initial={{
                    filter: "grayscale(100%)",
                    scale: 0.95,
                }}
                animate={{
                    filter: isFront? "grayscale(0%)": "grayscale(100%)",
                    scale: isFront? 1: 0.95,
                    transition: {
                        duration: 1,
                    }
                }}
                drag="x"
                dragConstraints={{
                    right: 0,
                    left: 0
                }}
                onDragEnd={handleDragEnd}
            >
                {children}
            </motion.div>

            <motion.div
                className="swipe-card_icon"
                style={{
                    zIndex: 1000,
                    opacity: lockedDirection === "right" ? 1 : rightIconOpacity
                }}
            >
                <BootstrapIcons.CheckCircleFill width={120} height={120} fill="#FFA400" />
            </motion.div>

            <motion.div
                className="swipe-card_icon"
                style={{
                    zIndex: 1000,
                    opacity: lockedDirection === "left" ? 1 : leftIconOpacity
                }}
            >
                <BootstrapIcons.XCircleFill width={120} height={120} fill="#D9D9D9" />
            </motion.div>

        </>
    );
};

export default SwipeCard;
