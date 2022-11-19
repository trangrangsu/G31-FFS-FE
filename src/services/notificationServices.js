import * as httpRequest from '../utils/httpRequest';

export const getNotifications = async (userId, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/user/notifications?userId=${userId}&pageIndex=${pageIndex}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
