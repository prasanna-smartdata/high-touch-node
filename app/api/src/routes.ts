import { healthCheck, authorize, oAuthCallback, refreshToken, getDestinations, postDestinations, syncs, onError, logOut, verifYServer2ServerOAuth } from './controller.js'
import express from "express";
//import csurf from "csurf";

export default (app: any) => {
    var router = express.Router();

    // var csrfProtection = csurf({ cookie: true });
      
    //   router.use(csrfProtection);
    //To test the server is running
    router.get("/api/healthcheck", healthCheck);
    
    router.get("/api/oauth2/sfmc/authorize", authorize);
    router.get("/api/oauth2/sfmc/callback",oAuthCallback);
    router.post("/api/oauth2/sfmc/refresh_token",refreshToken)
    router.post("/api/sfmc/verifys2s",verifYServer2ServerOAuth)
    router.get("/api/oauth2/error",onError);
    router.get("/api/destinations",getDestinations);
    router.post("/api/destinations",postDestinations);
    router.get("/api/syncs",syncs);
    
    router.get("/logout",logOut);

    app.use(router);
}

