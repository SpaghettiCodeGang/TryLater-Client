import { NavLink } from 'react-router-dom';
import { BootstrapIcons } from "./BootstrapIcons.jsx";

const Navbar = () => {
    // stellt Klassenanwendung sicher
    const getNavLinkClass = ({ isActive }) => isActive ? "navbar__link active" : "navbar__link";

    return (
        <nav className="navbar">

            <NavLink to="/recommendations" className={getNavLinkClass} end>
                <BootstrapIcons.HouseDoor width={24} height={24} />
            </NavLink>

            <NavLink to="/received" className={getNavLinkClass}>
                <BootstrapIcons.Search width={24} height={24} />
            </NavLink>

            <NavLink to="/create" className={getNavLinkClass}>
                <BootstrapIcons.PlusLG width={32} height={32} />
            </NavLink>

            <NavLink to="/contacts" className={getNavLinkClass}>
                <BootstrapIcons.Person width={28} height={28} />
            </NavLink>

            <NavLink to="/settings" className={getNavLinkClass}>
                <BootstrapIcons.Gear width={24} height={24} />
            </NavLink>
        </nav>
    );
};

export default Navbar;
