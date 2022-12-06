import * as httpRequest from '../utils/httpRequest';

export const getDashboard = async () => {
    try {
        const res = await httpRequest.get(`api/admin/dashboard`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getUserHot = async () => {
    try {
        const res = await httpRequest.get(`api/admin/getUserHot`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
