import * as apiTypes from '../constants/ApiConstants';
const axios = require('axios').default;

export function verifYServer2ServerOAuth(authRequest: AuthRequestBody, csrf: any) {

    try {
        axios.post("/api/healthcheckpost", authRequest, {
            'csrf-token': csrf
        })
            .then((resp: any) => {
                console.log(resp);
            })


    } catch (error) {
        console.log(error)
    }
}

export interface AuthRequestBody {
    clientId: string,
    secretKey: string,
}