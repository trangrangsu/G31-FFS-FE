import * as httpRequest from '../utils/httpRequest';

export const getReports = async (keyword, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/staff/report?keyword=${keyword}&pageIndex=${pageIndex}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addReport = async (data) => {
    try {
        const res = await httpRequest.post(`api/user/addReport`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};
