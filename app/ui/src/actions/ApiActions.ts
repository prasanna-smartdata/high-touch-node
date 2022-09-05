import * as apiTypes from '../constants/ApiConstants';
const axios = require('axios').default;

export async function verifYServer2ServerOAuth(authRequest: AuthRequestBody, csrf: any): Promise<string> {
    let response = '';
    try {
        axios.defaults.headers['X-CSRF-Token'] = csrf;
        // const headers = { 
        //     'Authorization': 'Bearer my-token',
        //     'My-Custom-Header': 'foobar'
        // };

        await axios.post(apiTypes.VERIFFY_S2S_URL, authRequest)
            .then((resp: any) => {
                console.log("valid");
                if (resp.status === 200) {
                    response = "valid";
                } else {
                    response = "invalid"
                }


            })


    } catch (error) {
        console.log(error)
        response = "invalid"
    }

    return Promise.resolve(response);
}

export interface AuthRequestBody {
    clientId: string,
    secretKey: string,
}