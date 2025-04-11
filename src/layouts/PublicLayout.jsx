import { Outlet } from 'react-router-dom';

const PublicLayout = ({ setIsLoggedIn }) => (
    <main className="base-layout">
        <div className="content-container">
            <Outlet />
            <button className="btn btn-primary mt-4" onClick={() => setIsLoggedIn(true)}>Login (Dev)</button>
        </div>
    </main>
);

export default PublicLayout;
