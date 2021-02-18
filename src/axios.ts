import axios from 'axios';
export const configAxios = (url:string) => {
    return axios.create({
        baseURL: url,
        withCredentials: true
    });
}