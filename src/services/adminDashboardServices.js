import * as httpRequest from '../utils/httpRequest';

export const getDashboard = async () => {
    try {
        const res = await httpRequest.get(`api/admin/dashboard`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
