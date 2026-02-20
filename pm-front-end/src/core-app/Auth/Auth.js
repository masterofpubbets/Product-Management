import axios from "axios";

const clientId = "MyPH6PbmD3pTSPed5ZKnKDxLDp4oGHsPpbtQMUiVy4U5MiLN"
const clientSecret = "2zfRqewhUpidQJLdVfLFHrigGWkevffvjYXSfwjha0mJ9iwO08lYxhpXboAeHRaa"

// Base64 encode the client ID and client secret
const concatword = clientId + ":" + clientSecret;
const base64word = btoa(concatword);

const url = 'https://developer.api.autodesk.com/authentication/v2/token';
const body = new URLSearchParams({
    'grant_type': 'client_credentials',
    'scope': 'data:read'
});

const config  = {
    'grant_type': 'client_credentials',
    'scope': 'data:read',
    headers : {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + base64word
}}


export const getAccesstoken = () => {
    return async () => {
        try {

            axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
            axios.defaults.headers.common['Authorization'] = 'Basic ' + base64word

            let result = await axios.post(
                url,
                { 'grant_type': 'client_credentials',
                'scope': 'data:read' 
                }
            );
            return result
        } catch(er) {
            console.log(er)
        }
    }
};


