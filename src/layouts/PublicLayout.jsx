import { Outlet } from 'react-router-dom';

const PublicLayout = ({ setIsLoggedIn }) => (
    <main className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Outlet />
        <button className="btn btn-primary mt-4" onClick={() => setIsLoggedIn(true)}>Login (Dev)</button>
    </main>
);

export default PublicLayout;
