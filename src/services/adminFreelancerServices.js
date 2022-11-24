import * as httpRequest from '../utils/httpRequest';

export const getFreelancers = async (name, pageIndex, status) => {
    try {
        const res = await httpRequest.get(`api/admin/freelancer?name=${name}&pageIndex=${pageIndex}&status=${status}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getTop5 = async (name) => {
    try {
        const res = await httpRequest.get(`api/admin/top5-freelancer?name=${name}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getFreelancer = async (id) => {
    try {
        const res = await httpRequest.get(`api/admin/detail-freelancer?id=${id}`);
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
        const res = await httpRequest.put(
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
