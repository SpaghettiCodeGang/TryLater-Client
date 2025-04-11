import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PrivateLayout = ({ setIsLoggedIn }) => (
    <>
        <main className="base-layout">
            <div className="content-container">
                <Outlet />
                <Navbar />
                <button className="btn btn-primary mt-5" onClick={() => setIsLoggedIn(false)}>Logout (Dev)</button>
            </div>
        </main>
    </>
);

export default PrivateLayout;
