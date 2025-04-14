import { Outlet } from 'react-router-dom';
import { useState } from "react";
import { LayoutContext } from "../hooks/useLayout.jsx";


const PublicLayout = () => {
    const [headline, setHeadline ] = useState('');

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
                    {/*  Hier könnte ihre Werbung stehen.  */}
                </footer>
            </div>
        </LayoutContext.Provider>
    );
};

export default PublicLayout;
