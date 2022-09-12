import { healthCheck, authorize, oAuthCallback, refreshToken,  onError, logOut, verifYServer2ServerOAuth, getUserInfo, connectToHightouch } from './controller.js'
import express from "express";
// import csurf from 'csurf';
//import csurf from "csurf";

export default (app: any) => {
    var router = express.Router();

    // var csrfProtection = csurf({ cookie: true });

    // router.use(csrfProtection);
    //To test the server is running
    router.get("/api/healthcheck", healthCheck);

    router.get("/oauth2/sfmc/authorize", authorize);
    router.get("/oauth2/sfmc/callback", oAuthCallback);
    router.post("/oauth2/sfmc/refresh_token", refreshToken)
    router.post("/api/sfmc/verifys2s", verifYServer2ServerOAuth);
    router.get("/api/sfmc/getuserinfo", getUserInfo);
    router.get("/api/oauth2/error", onError);
    router.post("/api/connect-hightouch", connectToHightouch);
   

    router.get("/logout", logOut);

    app.use(router);
}

