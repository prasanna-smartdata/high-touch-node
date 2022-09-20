import https from "https";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

import express, { Request, Response } from "express";

// Middleware
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import csurf from "csurf";
import ejs from "ejs";
import morgan from "morgan";
import { getAppConfig, getAppPort, isDev } from "./config";
import { clientErrorHandler, errorHandler } from "./errors";
import routes from "./routes";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Make sure we initialize the app config from the env vars
// as early as possible.
const appConfig = getAppConfig();

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
        type: ["application/json"],
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
                connectSrc: ["'self'", "https://*.marketingcloudapis.com/"],
            },
        },
    })
);

app.use(cookieParser(appConfig.cookieSecret));
var csrfProtection = csurf({
    cookie: {
        httpOnly: true,
        sameSite: "none",
        secure: !isDev(),
        signed: true,
    },
    value: (req) => req.signedCookies["XSRF-Token"],
});

app.use("/assets", express.static(join(__dirname, "dist/ui")));

// Setup the error handling middlewares last.
app.use(clientErrorHandler);
app.use(errorHandler);

app.use(function (_req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

routes(app);

app.get("/*", csrfProtection, (req: Request, res: Response) => {
    console.log("inside crf");
    let token = req.csrfToken();
    console.log("XCRF Token ::", token);
    res.cookie("XSRF-Token", req.csrfToken());
    res.cookie(`Cookie token name`, `encrypted cookie string Value`);
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
