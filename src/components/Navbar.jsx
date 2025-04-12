import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <nav className="d-flex gap-2 flex-wrap">
        <NavLink to="/recommendations">Empfehlungen</NavLink>
        <NavLink to="/recommendations/received">Erhalten</NavLink>
        <NavLink to="/recommendations/create">Neu</NavLink>
        <NavLink to="/contacts">Kontakte</NavLink>
        <NavLink to="/settings">Einstellungen</NavLink>
    </nav>
);

export default Navbar;
