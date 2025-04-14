import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <nav className="d-flex gap-2 flex-wrap">
        <NavLink to="/recommendations">Sammlung</NavLink>
        <NavLink to="/recommendations/received">Entdecke</NavLink>
        <NavLink to="/recommendations/create">Empfehlen</NavLink>
        <NavLink to="/contacts">Kontakte</NavLink>
        <NavLink to="/settings">Einstellungen</NavLink>
    </nav>
);

export default Navbar;
