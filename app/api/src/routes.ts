import { healthCheck, authorize, oAuthCallback, refreshToken, getDestinations, postDestinations, syncs, onError, logOut } from './controller.js'
import express from "express";

export default (app: any) => {
    var router = express.Router();
    //To test the server is running
    router.get("/healthcheck", healthCheck);
    
    router.get("/oauth2/sfmc/authorize", authorize);
    router.get("/oauth2/sfmc/callback",oAuthCallback);
    router.post("/oauth2/sfmc/refresh_token",refreshToken)
    router.get("/oauth2/error",onError);
    router.get("/destinations",getDestinations);
    router.post("/destinations",postDestinations);
    router.get("/syncs",syncs);
    
    router.get("/logout",logOut);

    app.use(router);
}

