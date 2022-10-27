import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
});

const httpRequestNoAuthorization = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};
export const post = async (path, options = {}) => {
    const response = await httpRequest.post(path, options);
    return response.data;
};
export const put = async (path, options = {}) => {
    const response = await httpRequest.put(path, options);
    return response.data;
};
export const deleteMetohd = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export const getNoAuthen = async (path, options = {}) => {
    const response = await httpRequestNoAuthorization.get(path, options);
    return response.data;
};
export const postNoAuthen = async (path, options = {}) => {
    const response = await httpRequestNoAuthorization.post(path, options);
    return response.data;
};
export const putNoAuthen = async (path, options = {}) => {
    const response = await httpRequestNoAuthorization.put(path, options);
    return response.data;
};
export const deleteMetohdNoAuthen = async (path, options = {}) => {
    const response = await httpRequestNoAuthorization.delete(path, options);
    return response.data;
};
export default httpRequest;
