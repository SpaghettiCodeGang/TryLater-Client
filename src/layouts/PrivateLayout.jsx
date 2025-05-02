import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState } from "react";
import { LayoutContext } from "../hooks/useLayout.jsx";

const PrivateLayout = () => {
    const [headline, setHeadline] = useState('');
    const [actions, setActions] = useState(null);

    return (
        <LayoutContext.Provider value={{ headline, setHeadline, actions, setActions }}>
            <div className="layout_container layout_container--private">
                <header>
                    <h1>
                        <span className="text-primary ms-2">{ headline?.slice(0, 3) }</span>{ headline?.slice(3) }
                    </h1>
                    <div className="d-flex gap-2 align-items-center me-2">{ actions }</div>
                </header>

                <main>
                    <Outlet />
                </main>

                <footer>
                    <Navbar />
                </footer>
            </div>
        </LayoutContext.Provider>
    );
};

export default PrivateLayout;
