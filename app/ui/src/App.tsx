// import classNames from "classnames";
// import { useEffect } from "react";
import {Route, Link,Routes } from "react-router-dom";
import React from "react";
import { Container } from "react-bootstrap";
// import { refreshSfmcToken } from "./sfmcClient";
import AppDetails from "./ApplicationSetup";
import ConfigHightouch from "./ConfigHightouch";
import Review from "./ReviewSetup";
import { Header } from "./views/Header";

function App() {
    // useEffect(() => {
    //     refreshSfmcToken();
    // });

    return (
        <div className="App configs" >
            
            <div className="navigation" >
                <div className="navigation-sub">
                <Link to ='/CheckApplicationDetails'></Link>&nbsp;
                <Link to='/ConfigHightouch'></Link>&nbsp;
                <Link to='/ReviewSetup'></Link>
                </div>
            </div>
            <Container>
            <div className="content">
                <Routes>
                <Route path='/' element={<AppDetails />}/>
              
                <Route path='/CheckApplicationDetails' element={<AppDetails />}/>
                <Route path='/ConfigHightouch' element = {<ConfigHightouch />}/>
                <Route path='/ReviewSetup' element = {<Review />}/>
                </Routes>               
            </div>
            </Container>
            
        </div>
       
        
    );
}

export default App;
