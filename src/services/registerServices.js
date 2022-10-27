import * as httpRequest from '../utils/httpRequest';

export const register = async (user) => {
    try {
        const res = await httpRequest.postNoAuthen('sign-up', user);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const verifyAccount = async (code) => {
    try {
        const res = await httpRequest.putNoAuthen(`verify-account?verifyCode=${code}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
