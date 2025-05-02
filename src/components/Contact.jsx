import apiService from "../service/apiService.jsx";

const Contact = ({ contactPartner, actions, onClick, isSelected  }) => {

    const imgSrc = contactPartner?.imgPath && contactPartner?.imgPath.trim() !== "" ?
        `${apiService.getBaseUrl()}/images/${contactPartner?.imgPath}` :
        "/assets/profil.png";

    const isClickable = typeof onClick === 'function';

    return (
        <li
            className={`contact_list__item ${isSelected ? "contact_list__item--selected" : ""}`}
            {...(isClickable && {
                role: "button",
                tabIndex: 0,
                onClick: onClick,
                onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        onClick();
                    }
                }
            })}
        >
            <div className="contact_list__data">
                <div className="contact_list__img-wrapper">
                    <img className="contact_list__img" src={ imgSrc } alt={`${contactPartner?.displayName}`} />
                </div>
                <p className="contact_list__displayname">{ contactPartner?.displayName }</p>
                <p className="contact_list__username">{ contactPartner?.userName }</p>
            </div>
            <div className="contact_list__actions">{ actions }</div>
        </li>
    )
}

export default Contact;