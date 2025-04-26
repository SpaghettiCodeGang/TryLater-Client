import apiService from "../service/apiService.jsx";

const Contact = ({ contactPartner, actions, onClick }) => {

    const placeholderImg = "/assets/profil.png";
    const imgSrc = contactPartner?.imgPath && contactPartner?.imgPath.trim() !== "" ? `${apiService.getBaseUrl()}/images/${contactPartner?.imgPath}` : placeholderImg;

    return (
        <li className="contact_list__item" role="button" onClick={ onClick } tabIndex="0"
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    onClick();
                }
            }}
        >
            <div className="contact_list__data">
                <img className="contact_list__img" src={ imgSrc } alt={`${contactPartner?.displayName}`} />
                <p className="contact_list__displayname">{ contactPartner?.displayName }</p>
                <p className="contact_list__username">{ contactPartner?.userName }</p>
            </div>
            <div className="contact_list__actions">{ actions }</div>
        </li>
    )
}

export default Contact;