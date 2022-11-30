import * as httpRequest from '../utils/httpRequest';

export const login = async (user) => {
    try {
        const res = await httpRequest.postNoAuthen('login', user);
        return res;
    } catch (error) {
        return error;
    }
};
export const forgetPassword = async (email) => {
    try {
        const res = await httpRequest.getNoAuthen(`forgot-password?email=${email}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getInfoUser = async (userId) => {
    try {
        const res = await httpRequest.get(`api/user/getInfoUser?userId=${userId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const resetPassword = async (code) => {
    try {
        const res = await httpRequest.getNoAuthen(`reset/verify-token?resetPasswordToken=${code}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const changePassword = async (user) => {
    try {
        const res = await httpRequest.putNoAuthen('change-password', user);
        return res;
    } catch (error) {
        console.log(error);
    }
};
// {
//     "email": "congbvhe141326@fpt.edu.vn",
//      "oldPassword":"congthanh123",
//     "password": "123456"
//   }
export const changePasswordAuthentication = async (user) => {
    try {
        const res = await httpRequest.put('api/user/changePassword', user);
        return res;
    } catch (error) {
        console.log(error);
    }
};
