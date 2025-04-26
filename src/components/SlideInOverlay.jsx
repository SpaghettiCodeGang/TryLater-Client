import { motion, AnimatePresence } from "framer-motion";
import { BootstrapIcons } from "./BootstrapIcons.jsx";

const SlideInOverlay = ({ isVisible, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="slide-in_overlay"
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.4 }}
                >
                    <button className="slide-in_overlay__btn" onClick={onClose}>
                        <BootstrapIcons.ChevronLeft width={24} height={24} className="slide-in_overlay__icon" />
                        <h2>{title}</h2>
                    </button>
                    <div className="slide-in_overlay__content">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SlideInOverlay;
