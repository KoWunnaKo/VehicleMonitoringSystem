import axios from "axios";

export function configureAxios() {
    // URL бэкенд сервера
    // axios.defaults.baseURL = 'http://192.168.43.197:5000/'; // Mobile network
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER_URL; // home wifi
    // Axios все реквесты вместе с куки-авторизации
    // axios.defaults.withCredentials = true;
    // Content Type - json
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    // No cache header
    axios.defaults.headers.post['Cache-Control'] = 'no-cache';
}

// const ASYNC_STORAGE_COOKIE_KEY = 'authCookie';

// Not used 'cause all axios requests have Authorization header
// export async function getAuthCookie(): Promise<any> {
// 	return [await AsyncStorage.getItem(ASYNC_STORAGE_COOKIE_KEY)];
// }

// export async function setAuthCookie(response: AxiosResponse) {
//     const cookie = JSON.stringify(response.headers['set-cookie']);
//     await AsyncStorage.setItem(ASYNC_STORAGE_COOKIE_KEY, cookie);
//     // Axios все реквесты с куки-авторизации
//     axios.defaults.headers.common['Authorization'] = cookie;
// }
//
// /**
//  * Преобразует объект в строку параметров запроса
//  * @param obj - входной объект параметров
//  */
// export function objToQueryParams(obj: any): string {
//     const keyValuePairs = [];
//     for (const key in obj) {
//         keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
//     }
//     return keyValuePairs.join('&');
// }

