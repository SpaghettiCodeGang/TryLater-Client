import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PrivateLayout = ({ setIsLoggedIn }) => (
    <>
        <main className="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <Outlet />
            <Navbar />
            <button className="btn btn-primary mt-5" onClick={() => setIsLoggedIn(false)}>Logout (Dev)</button>
        </main>
    </>
);

export default PrivateLayout;
