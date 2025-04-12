import { Outlet } from 'react-router-dom';
import {useState} from "react";
import { LayoutContext } from "../hooks/useLayout.jsx";


const PublicLayout = ({ setIsLoggedIn }) => {
    const [headline, setHeadline] = useState('');

    return (
        <LayoutContext.Provider value={{ headline, setHeadline }}>
            <div className="layout_container layout_container--public">
                <header>
                    <h1>
                        <span className="text-primary">{ headline?.slice(0, 3) }</span>{ headline?.slice(3) }
                    </h1>
                </header>
                <main>
                    <Outlet/>
                </main>
                <footer>
                    <div className="d-flex flex-column gap-2">
                        <button className="btn btn-primary w-100" onClick={() => setIsLoggedIn(true)}>Login (Dev)</button>
                    </div>
                </footer>
            </div>
        </LayoutContext.Provider>
    );
};

export default PublicLayout;
