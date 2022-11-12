import * as httpRequest from '../utils/httpRequest';

export const getRecruiterActives = async (name, pageIndex, status) => {
    try {
        const res = await httpRequest.get(
            `api/admin/recruiterActivated?pageIndex=${pageIndex}&status=${status}&keyword=${name}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getRecruiterNotActives = async (name, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/admin/recruiterNotActivated?pageIndex=${pageIndex}&keyword=${name}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getTop5 = async (name, isActive) => {
    try {
        const res = await httpRequest.get(`api/admin/top5-recruiter?name=${name}&isActive=${isActive}`);
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
export const approveRecruiter = async (userId) => {
    try {
        const res = await httpRequest.put(`api/admin/approveRecruiter?userId=${userId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
