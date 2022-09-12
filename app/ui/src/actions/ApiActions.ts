import * as apiTypes from '../constants/ApiConstants';
const axios = require('axios').default;
// Call the s2s Api
export async function verifYServer2ServerOAuth(authRequest: AuthRequestBody): Promise<string> {
    let response = '';
    try {


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

//Getting user info
export async function getUserInfo(): Promise<object> {

    let data = {};
    try {


        await axios.get(apiTypes.GET_USER_INFO_URL)
            .then((resp: any) => {
                data = resp.data;
            })


    } catch (error) {
        console.log(error)
    }

    return Promise.resolve(data)
}
export async function connectToHightouch(authRequest: AuthRequestBody): Promise<object> {
    let data={}
    try {

        await axios.post(apiTypes.CONNECT_HIGHTOUCH_URL, authRequest)
            .then((resp: any) => { 
                if (resp.status === 200) {
                    data=resp.data;
                }  
 
            })


    } catch (error) {
        console.log(error)
         
    }

    return Promise.resolve(data);
}
export interface AuthRequestBody {
    clientId: string,
    secretKey: string,
}