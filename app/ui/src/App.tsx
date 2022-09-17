import { Route, Routes, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import AppDetails from "./views/ApplicationSetup";
import Review from "./views/ReviewSetup";
import Header from "./components/Header";
import { NavigationProvider } from "./components/NavigationContext";
import { Icon, PageHeader, Panel } from "@salesforce/design-system-react";
import { refreshSfmcToken } from "./sfmcClient";

function getCookie(name: any) {
    const cookieDict = document.cookie
        .split(";")
        .map((x) => x.split("="))
        .reduce((accum, current) => {
            accum[current[0]] = current[1];
            return accum;
        }, Object());
    return cookieDict[name];
}
function App() {
    const token = getCookie("_csrf");

    useEffect(() => {
        refreshSfmcToken(token);
    }, []);

    return (
        <div className="slds-p-around_x-small">
            <NavigationProvider>
                <Panel>
                    <div className="slds-m-top_xxx-small slds-p-around_xxx-large">
                        <div className="slds-text-heading_large">
                            <h2>Configuration Pages</h2>
                        </div>
                        <Header></Header>

                        <Routes>
                            <Route path="/" element={<AppDetails />} />

                            <Route
                                path="/CheckApplicationDetails"
                                element={<AppDetails />}
                            />
                            <Route path="/ReviewSetup" element={<Review />} />
                        </Routes>
                    </div>
                </Panel>
            </NavigationProvider>
        </div>
    );
}

export default App;
