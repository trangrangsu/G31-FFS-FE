import * as httpRequest from '../utils/httpRequest';

export const getRecruiters = async (name, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/admin/recruiter?name=${name}&pageIndex=${pageIndex}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getTop5 = async (name) => {
    try {
        const res = await httpRequest.get(`api/admin/top5-recruiter?name=${name}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getRecruiter = async (id) => {
    try {
        const res = await httpRequest.get(`api/admin/detail-recruiter?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getTypeBan = async (id) => {
    try {
        const res = await httpRequest.get(`api/admin/type-ban?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const setBan = async (userId, typeBan, bannedBy) => {
    try {
        const res = await httpRequest.post(
            `api/admin/ban-user?userId=${userId}&typeBan=${typeBan}&bannedBy=${bannedBy}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const unBan = async (userId) => {
    try {
        const res = await httpRequest.put(`api/admin/unban-user?userId=${userId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
