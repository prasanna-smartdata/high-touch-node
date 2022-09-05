import { getAppConfig } from "./config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import { AccessTokenResponse } from "sfmc";
import { sfmcClient } from './sfmcClient'
import { getCookieOptions, ONE_HOUR_IN_SECONDS, TWENTY_MINS_IN_SECONDS } from "./cookies";


const appConfig = getAppConfig();
const sfmcOAuthCallbackPath = "/oauth2/sfmc/callback";

export const healthCheck = (_req: Request, res: Response) => {
    return res.status(200).send("OK");
}

export const authorize = async (_req: Request, res: Response, next: NextFunction) => {
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

export const verifYServer2ServerOAuth = async (req: Request, res: Response) => {
    const tssd = req.query.tssd || appConfig.sfmcDefaultTenantSubdomain;
    console.log('inside')
    await sfmcClient.post<AccessTokenResponse>(
        `https://${tssd}.auth.marketingcloudapis.com/v2/token`,
        {
            grant_type: "client_credentials",
            scope: "email_read email_write email_send",
            account_id: appConfig.sfmcAccountId,
            client_id: req.body.clientId,
            client_secret: req.body.secretKey,
        }
    ).then((resp: any) => {

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

        res.cookie("sfmc_tssd", tssd, getCookieOptions(TWENTY_MINS_IN_SECONDS));
        console.log("successfull")
        return res.sendStatus(200);
    })
        .catch((_err:any) => {
            console.log("err")
            return res.sendStatus(500)
        });
}
export const oAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
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
    console.log("Response:", resp.data);
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

    res.cookie("sfmc_tssd", tssd, getCookieOptions(TWENTY_MINS_IN_SECONDS));

    res.redirect("/");
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Request::", JSON.stringify(req));
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
        console.log("Respo::", resp);
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

export const getDestinations = async (req: Request, res: Response) => {
    console.log("URL Hit::");
    const resp = await axios.get(
        `https://api.hightouch.io/api/v1/destinations?orderBy=id`,
        {
            headers: {
                Authorization: "Bearer eba8870f-973a-42f1-bfcb-9c2dda808be4",
            },
        }
    );

    console.log("Respo::", req);
    console.log("Response:", resp.data);
    res.redirect("/");
}

export const postDestinations = async (req: Request, res: Response) => {
    axios({
        method: "get",
        url: "https://api.hightouch.io/api/v1/destinations",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eba8870f-973a-42f1-bfcb-9c2dda808be4"
        }
    })
        .then(function (_res: any) {
            console.log("Response in API", _res);
            console.log("Response in API", req);
            console.log("Response in API", res);
        })
        .catch(function (error: any) {
            console.log(error);
        })
}
export const syncs = (_req: Request, _res: Response) => {
    axios({
        method: "get",
        url: "https://api.hightouch.io/api/v1/syncs?orderBy=id",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer eba8870f-973a-42f1-bfcb-9c2dda808be4",
        },
    })
        .then(function (_res: any) {
            console.log("Response in API", _res);
        })
        .catch(function (error: any) {
            console.log(error);
        });
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
    res.clearCookie("vimeo_access_token");
    res.clearCookie("sfmc_tssd");
    res.clearCookie("XSRF-Token");

    res.status(200).send("You have been successfully logged out!");
}