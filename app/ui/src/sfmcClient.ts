import * as axios from "axios";


export const settings = {
    accessTokenCookieName: "sfmc_access_token",
    tenantSubDomainCookieName: "sfmc_tssd",
    tokenRefreshInterval: 15 * 60 * 1000,
    maxTokenLifetime: 20 * 60 * 1000,
};

const client = axios.default.create({
    timeout: 20 * 1000,
});

client.interceptors.response.use(undefined, (err) => {
    if (err.response.status === 401) {
        window.location.href = "/oauth2/sfmc/authorize";
        return;
    }

    return Promise.reject(err);
});


//Call this method in App.tsx
export async function refreshSfmcToken(token: string) {

    await client({
        method: 'POST',
        url: "/oauth2/sfmc/refresh_token",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((resp: any) => {
            console.log(resp)
        })
        .catch((err: any) => {
            console.log(err)

        })
}


