import { getAppConfig } from "./config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import { AccessTokenResponse } from "sfmc";
import { sfmcClient } from './sfmcClient'
import { Connect } from "app";
import { getCookieOptions, ONE_HOUR_IN_SECONDS, TWENTY_MINS_IN_SECONDS } from "./cookies";


const appConfig = getAppConfig();
const sfmcOAuthCallbackPath = "/oauth2/sfmc/callback";

export const healthCheck = (_req: Request, res: Response) => {
    return res.status(200).send("OK");
}

export const authorize = async (_req: Request, res: Response, next: NextFunction) => {
    console.error("authorize inside");

    const authUrl = new URL(
        `https://${appConfig.sfmcDefaultTenantSubdomain}.auth.marketingcloudapis.com/v2/authorize`
    );
    authUrl.searchParams.append("client_id", appConfig.sfmcClientId);
    authUrl.searchParams.append(
        "redirect_uri",
        `${appConfig.selfDomain}${sfmcOAuthCallbackPath}`
    );
    authUrl.searchParams.append("response_type", "code");

    try {
        // Generate a signed string that can be validated in the callback.
        const state = jwt.sign({}, appConfig.jwtSecret, {
            expiresIn: "10m",
        });
        authUrl.searchParams.append("state", state);

        console.log(authUrl.toString());
        res.redirect(authUrl.toString());
        return;
    } catch (err) {
        console.error("Failed to create a signed JWT. ", err);
    }

    next(
        new Error(
            "An error occurred while generating the authorization URL."
        )
    );
}

async function verifyOAuth2Callback(
    req: Request,
    next: NextFunction
): Promise<string | undefined> {
    const code = req.query.code as string;
    console.log("Code:::", code);
    if (!code) {
        console.error("SFMC OAuth callback didn't have the code query-param");
        next(new Error("invalid_request: Missing code param"));
        return;
    }

    const state = req.query.state as string;
    if (!state) {
        console.error("SFMC OAuth callback didn't have the state query-param");
        next(new Error("invalid_request: Missing state param"));
        return;
    }

    try {
        await new Promise((resolve, reject) => {
            jwt.verify(
                state as string,
                appConfig.jwtSecret,
                {
                    algorithms: ["HS256"],
                },
                (err, decoded) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(decoded);
                }
            );
        });
    } catch (err) {
        console.error("Unable to verify the state param.", err);
        next(new Error("invalid_request: Invalid state param"));
        return;
    }

    return code;
}


export const oAuthCallback = async (req: Request, res: Response, next: NextFunction) => {

    console.log("inside oAuthCallback");

    const code = await verifyOAuth2Callback(req, next);
    const tssd = req.query.tssd || appConfig.sfmcDefaultTenantSubdomain;
    const resp = await sfmcClient.post<AccessTokenResponse>(
        `https://${tssd}.auth.marketingcloudapis.com/v2/token`,
        {
            grant_type: "authorization_code",
            code,
            client_id: appConfig.sfmcClientId,
            client_secret: appConfig.sfmcClientSecret,
            redirect_uri: `${appConfig.selfDomain}${sfmcOAuthCallbackPath}`,
        }
    );


    const accessTokenResp = resp.data;


    res.cookie(
        "sfmc_access_token",
        accessTokenResp.access_token,
        getCookieOptions(TWENTY_MINS_IN_SECONDS)
    );
    res.cookie(
        "sfmc_refresh_token",
        accessTokenResp.refresh_token,
        getCookieOptions(ONE_HOUR_IN_SECONDS)
    );

    res.cookie("sfmc_tssd", tssd, getCookieOptions(TWENTY_MINS_IN_SECONDS)
    );
    console.log("Response saved:", req.signedCookies);


    res.redirect("/");
}

export const verifYServer2ServerOAuth = async (req: Request, res: Response, next: NextFunction) => {

    //Reading the tssd from the cookie.
    const tssd = req.signedCookies["sfmc_tssd"] || appConfig.sfmcDefaultTenantSubdomain;
    console.log('inside', req.signedCookies["sfmc_tssd"])
    await sfmcClient.post<AccessTokenResponse>(
        `https://${tssd}.auth.marketingcloudapis.com/v2/token`,
        {
            grant_type: "client_credentials",
            scope: "email_read email_write email_send",
            client_id: req.body.clientId,
            client_secret: req.body.secretKey,
            
        }
    ).then((_resp: any) => {

        return res.sendStatus(200);
    })
        .catch((err: any) => {
            console.log("err")
            next(err);
        });
}

export const getUserInfo = async (req: Request, res: Response) => {

    let object: any = {}
    try {
        const tssd = req.signedCookies["sfmc_tssd"]
        const sfmcToken = req.signedCookies["sfmc_access_token"];

        await axios.get(
            `https://${tssd}.auth.marketingcloudapis.com/v2/userinfo`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sfmcToken}`,
                }
            }
        ).then((resp: any) => {
            if (resp.data) {
                const userId = resp.data.user.sub;
                const email = resp.data.user.email;
                const accountId = resp.data.organization.enterprise_id;
                res.cookie("sfmc_userId", userId,
                    getCookieOptions(TWENTY_MINS_IN_SECONDS)
                );
                res.cookie("sfmc_email", email,
                    getCookieOptions(TWENTY_MINS_IN_SECONDS)
                );
                res.cookie("sfmc_accountId", accountId,
                    getCookieOptions(TWENTY_MINS_IN_SECONDS)
                );
                object = {
                    userId: userId,
                    email: email,
                    accountId: accountId,
                    subdomain: tssd
                }
            }
            return res.send(object);
        })

    } catch (error) {
        return res.send(error);
        console.log(error)

    }
}
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {

    if (
        !req.signedCookies["sfmc_tssd"] ||
        !req.signedCookies["sfmc_refresh_token"]
    ) {

        res.status(401).send();
        return;
    }

    const tssd = req.signedCookies["sfmc_tssd"];
    const refreshToken = req.signedCookies["sfmc_refresh_token"];

    try {
        const resp = await sfmcClient.post<AccessTokenResponse>(
            `https://${tssd}.auth.marketingcloudapis.com/v2/token`,
            {
                grant_type: "refresh_token",
                client_id: appConfig.sfmcClientId,
                client_secret: appConfig.sfmcClientSecret,
                refresh_token: refreshToken,
            }
        );
        const accessTokenResp = resp.data;
        res.cookie(
            "sfmc_access_token",
            accessTokenResp.access_token,
            getCookieOptions(TWENTY_MINS_IN_SECONDS)
        );
        res.cookie(
            "sfmc_tssd",
            tssd,
            getCookieOptions(TWENTY_MINS_IN_SECONDS)
        );
        res.cookie(
            "sfmc_refresh_token",
            accessTokenResp.refresh_token,
            getCookieOptions(ONE_HOUR_IN_SECONDS)
        );

        res.status(200).send();
    } catch (err: any) {
        if (
            err.response?.data &&
            err.response.data.error === "invalid_token"
        ) {
            console.error(err.response.data);
            res.status(401).send();
            return;
        }
        console.error("Failed to refresh SFMC token", err);
        next(err);
    }
}

export const connectToHightouch = async (req: Request, res: Response) => {
    console.log("connectToHightouch Hit::");
    try {


        const payLoad: Connect = {
            accountId: req.signedCookies["sfmc_accountId"],
            userId: req.signedCookies["sfmc_userId"],
            email: req.signedCookies["sfmc_email"],
            resources: {
                subdomain: req.signedCookies["sfmc_tssd"],
                clientId: req.body.clientId,
                clientSecret: req.body.secretKey,
            }
        }
        const resp = await axios.post(
            `https://api.hightouch.io/api/partner-connect/v1/sfmc/connect`, payLoad,
            {
                headers: {
                    Authorization: "Basic c2ZtYzp3eEVHQnRDb1VNOXR5VDBvOXNCaA==",
                    "Content-Type": "application/json"
                },

            }
        )

        console.log("Response of connectHightouch:", resp.data);
        return res.status(200).send(resp.data);
    } catch (error) {
        console.log("Error:", Error);

    }
}
export const onError = (req: Request, _res: Response, next: NextFunction) => {
    console.error(
        "Redirected to /oauth2/error while handling:",
        req.headers.referer
    );
    // Call the next() method with an error and let the error handler middleware
    // take care of writing the error response.
    next(new Error());
};

export const logOut = (_req: Request, res: Response) => {
    res.clearCookie("sfmc_access_token");
    res.clearCookie("sfmc_refresh_token");
    res.clearCookie("sfmc_tssd");
    res.clearCookie("XSRF-Token");

    res.status(200).send("You have been successfully logged out!");
}