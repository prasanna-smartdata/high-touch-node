// import classNames from "classnames";
// import { useEffect } from "react";
import {Route, Link,Routes } from "react-router-dom";
import React from "react";
import { Container } from "react-bootstrap";
// import { refreshSfmcToken } from "./sfmcClient";
import AppDetails from "./views/ApplicationSetup";
import ConfigHightouch from "./views/ConfigHightouch";
import Review from "./views/ReviewSetup";

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
