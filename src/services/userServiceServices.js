import * as httpRequest from '../utils/httpRequest';

export const getServices = async (role) => {
    try {
        const res = await httpRequest.get(`api/user/getAllService?role=${role}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const buyService = async (userId, serviceId) => {
    try {
        const res = await httpRequest.post(`api/user/buy-service?userId=${userId}&serviceId=${serviceId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
