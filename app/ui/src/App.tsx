// import classNames from "classnames";
// import { useEffect } from "react";
import { Route, Link, Routes, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import { refreshSfmcToken } from "./sfmcClient";
import AppDetails from "./views/ApplicationSetup";
import ConfigHightouch from "./views/ConfigHightouch";
import Review from "./views/ReviewSetup";
import Header from "./components/Header";
import { NavigationProvider } from "./components/NavigationContext";
import { Icon, PageHeader, Panel } from "@salesforce/design-system-react";
import { refreshSfmcToken } from "./sfmcClient";

function App() {

 useEffect(()=>{
    refreshSfmcToken();
 },[])

    return (
        <div  >

            <NavigationProvider>

                <Panel className="slds-p-around_xxx-large">
                    <div className="slds-m-top_xxx-small slds-p-around_xxx-large">
                        <div className="slds-text-heading_large">
                            <h2>Configuration Pages</h2>
                        </div>
                        <Header></Header>

                        <Routes>
                            <Route path='/' element={<AppDetails />} />

                            <Route path='/CheckApplicationDetails' element={<AppDetails />} />
                            {/* <Route path='/ConfigHightouch' element={<ConfigHightouch />} /> */}
                            <Route path='/ReviewSetup' element={<Review />} />
                        </Routes>
                    </div>
                </Panel>
            </NavigationProvider>
        </div>


    );
}

export default App;
