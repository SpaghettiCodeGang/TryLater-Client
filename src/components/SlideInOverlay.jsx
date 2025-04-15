import { BootstrapIcons } from "./BootstrapIcons.jsx";

const SlideInOverlay = ({ isVisible, onClose, title, children }) => {
    return (
        <div className={`slide-in_overlay ${isVisible ? 'slide-in_overlay--visible' : ''}`}>
            <button className="slide-in_overlay__btn" onClick={onClose}>
                <BootstrapIcons.ChevronLeft width={24} height={24} className="slide-in_overlay__icon" />
                <h2>{title}</h2>
            </button>
            <div className="slide-in_overlay__content">
                {children}
            </div>
        </div>
    );
};

export default SlideInOverlay;
