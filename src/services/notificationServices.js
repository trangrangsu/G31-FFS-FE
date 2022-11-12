import * as httpRequest from '../utils/httpRequest';

export const getNotifications = async (userId) => {
    try {
        const res = await httpRequest.get(`api/user/notifications?userId=${userId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
