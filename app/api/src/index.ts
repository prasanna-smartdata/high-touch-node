import https from "https";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

import express, {  Request, Response } from "express";

 
// import jwt from "jsonwebtoken";

// Middleware
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import csurf from "csurf";
import ejs from "ejs";
import morgan from "morgan";

//import { AccessTokenResponse } from "sfmc";

import { getAppConfig, getAppPort, isDev } from "./config";
import {
    getCookieOptions,
    //ONE_HOUR_IN_SECONDS,
   // TWENTY_MINS_IN_SECONDS,
} from "./cookies";
import { clientErrorHandler, errorHandler } from "./errors";
import   routes from './routes'
//import { healthCheck } from './controller'
// These are commented out because the code that uses
// these imports are also commented out below and only
// exist to demonstrate how to structure the app.
//
// import vimeoApiRouter from "./vimeoApi";
// import { VimeoAccessTokenResponse } from "vimeo";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Make sure we initialize the app config from the env vars
// as early as possible.
const appConfig = getAppConfig();
//const sfmcOAuthCallbackPath = "/oauth2/sfmc/callback";

// The API path where the customer's OAuth service should
// redirect the user to with the authorization code.
// const vimeoOAuthCallbackPath = "/oauth2/vimeo/callback";

//const defaultAxiosClient = axios.create();
// const hightouchBaseURL = axios.create({baseUrl: "https://api.hightouch.io/api/v1"});
const app = express();
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
// Set the EJS `renderFile` function as the view render
// function for HTML files. This allows us to use EJS
// inside files with the .html extension instead of .ejs.
app.engine("html", ejs.renderFile);

// Add the request logging middleware.
// Use the `dev` predefined format for local development purposes
// so that we get colored log output, but for all other times
// use the `common` format which following the Apache log
// format.
app.use(morgan(isDev() ? "dev" : "common"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    bodyParser.json({
        type: [
            "application/json",
            "application/vnd.vimeo.video",
            "application/vnd.vimeo.video+json",
        ],
    })
);

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                frameAncestors: [
                    "https://*.exacttarget.com",
                    "https://*.marketingcloudapps.com",
                ],
                connectSrc: [
                    "'self'",
                    "https://*.marketingcloudapis.com/",
                    "https://api.vimeo.com/",
                ],
            },
        },
    })
);

app.use(cookieParser(appConfig.cookieSecret));

app.use(
    csurf({
        cookie: {
            httpOnly: true,
            sameSite: "none",
            secure: !isDev(),
            signed: true,
        },
        value: (req) => req.signedCookies["XSRF-Token"],
    })
);

app.use("/assets", express.static(join(__dirname, "dist/ui")));

// Setup the error handling middlewares last.
app.use(clientErrorHandler);
app.use(errorHandler);


routes(app) 
app.get("/*", (req: Request, res: Response) => {
    let token = req.csrfToken();
    console.log("XCRF Token ::", token);
    res.cookie("XSRF-Token", req.csrfToken(), getCookieOptions());

    if (isDev() && appConfig.redirectUiToLocalhost) {
        console.log("Redirecting to localhost...");
        res.redirect("https://app.localhost:3000");
        return;
    }

    res.sendFile(join(__dirname, "ui", "index.html"));
});


const port = getAppPort();
if (isDev()) {
    console.log("Starting HTTPS server for local development");
    const options = {
        key: readFileSync(join(__dirname, "..", "localhost.key")),
        cert: readFileSync(join(__dirname, "..", "localhost.crt")),
    };
    https.createServer(options, app).listen(443);
} else {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}
