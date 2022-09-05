import { healthCheck, authorize, oAuthCallback, refreshToken, getDestinations, postDestinations, syncs, onError, logOut } from './controller.js'
import express from "express";

export default (app: any) => {
    var router = express.Router();
    //To test the server is running
    router.get("/api/healthcheck", healthCheck);
    
    router.get("/api/oauth2/sfmc/authorize", authorize);
    router.get("/api/oauth2/sfmc/callback",oAuthCallback);
    router.post("/api/oauth2/sfmc/refresh_token",refreshToken)
    router.get("/api/oauth2/error",onError);
    router.get("/api/destinations",getDestinations);
    router.post("/api/destinations",postDestinations);
    router.get("/api/syncs",syncs);
    
    router.get("/logout",logOut);

    app.use(router);
}

