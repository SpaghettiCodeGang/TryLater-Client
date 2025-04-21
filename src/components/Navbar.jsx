import { NavLink } from 'react-router-dom';
import { BootstrapIcons } from "./BootstrapIcons.jsx";

const Navbar = () => {
    // stellt Klassenanwendung sicher
    const getNavLinkClass = ({ isActive }) => isActive ? "navbar__link active" : "navbar__link";

    return (
        <nav className="navbar">

            <NavLink to="/recommendations" className={getNavLinkClass} end>
                <BootstrapIcons.HouseDoor size={24} />
            </NavLink>

            <NavLink to="/recommendations/received" className={getNavLinkClass}>
                <BootstrapIcons.Search size={24} />
            </NavLink>

            <NavLink to="/recommendations/create" className={getNavLinkClass}>
                <BootstrapIcons.Plus size={24} />
            </NavLink>

            <NavLink to="/contacts" className={getNavLinkClass}>
                <BootstrapIcons.Person size={24} />
            </NavLink>

            <NavLink to="/settings" className={getNavLinkClass}>
                <BootstrapIcons.Gear size={24} />
            </NavLink>
        </nav>
    );
};

export default Navbar;
