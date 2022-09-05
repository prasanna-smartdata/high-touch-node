// import classNames from "classnames";
// import { useEffect } from "react";
import { Route, Link, Routes, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import { refreshSfmcToken } from "./sfmcClient";
import AppDetails from "./views/ApplicationSetup";
import ConfigHightouch from "./views/ConfigHightouch";
import Review from "./views/ReviewSetup";
import classNames from "classnames";
import Header from "./components/Header";
import { NavigationProvider } from "./components/NavigationContext";
import { Icon, PageHeader } from "@salesforce/design-system-react";

function App() {



    return (
        <div className="App configs" >

            <NavigationProvider>

                <Container>
                    <div className="slds-m-top_xxx-small ">
                        <PageHeader
                            className="slds-align_absolute-center"
                            title="Configuration Page"
                            truncate
                            variant="object-home"
                        />
                        <Header></Header>

                        <Routes>
                            <Route path='/' element={<AppDetails />} />

                            <Route path='/CheckApplicationDetails' element={<AppDetails />} />
                            <Route path='/ConfigHightouch' element={<ConfigHightouch />} />
                            <Route path='/ReviewSetup' element={<Review />} />
                        </Routes>
                    </div>
                </Container>
            </NavigationProvider>
        </div>


    );
}

export default App;
