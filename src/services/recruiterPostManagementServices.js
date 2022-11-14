import * as httpRequest from '../utils/httpRequest';

//career,skill -1, cost: 1-5 searchValue ''

export const getFreelancerApplied = async (keyWord, city, subCareer, skill, pageIndex, jobId, recruiterId, status) => {
    try {
        const res = await httpRequest.get(
            `api/recruiter/getFreelancerApplied?city=${city}&subCareer=${subCareer}&skill=${skill}&keyword=${keyWord}&pageIndex=${pageIndex}&jobId=${jobId}&recruiterId=${recruiterId}&status=${status}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getAllJobPosted = async (keyWord, recruiterId, pageIndex, status) => {
    try {
        const res = await httpRequest.get(
            `api/recruiter/getAllJobPosted?recruiterId=${recruiterId}&pageIndex=${pageIndex}&status=${status}&keyword=${keyWord}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const viewDetailPost = async (recruiterId, jobId) => {
    try {
        const res = await httpRequest.get(`api/recruiter/viewDetailPost?recruiterId=${recruiterId}&jobId=${jobId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const hideJob = async (recruiterId, jobId) => {
    try {
        const res = await httpRequest.put(`api/recruiter/hideJob?recruiterId=${recruiterId}&jobId=${jobId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteJob = async (recruiterId, jobId) => {
    try {
        const res = await httpRequest.deleteMetohd(`api/recruiter/deleteJob?recruiterId=${recruiterId}&jobId=${jobId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const responseJobApply = async (freelancerId, jobId, status) => {
    try {
        const res = await httpRequest.put(
            `api/recruiter/responseJobApply?freelancerId=${freelancerId}&jobId=${jobId}&status=${status}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addFeedback = async (data) => {
    try {
        const res = await httpRequest.post(`api/user/addFeedback`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getProfileFreelancer = async (id, recruiterId) => {
    try {
        const res = await httpRequest.get(`api/recruiter/getProfileFreelancer?id=${id}&recruiterId=${recruiterId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updateAccountBalance = async (userId, fee) => {
    try {
        const res = await httpRequest.put(`api/user/updateAccountBalance?userId=${userId}&fee=${fee}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const pushOnTop = async (userId, jobId) => {
    try {
        const res = await httpRequest.put(`api/recruiter/pushTop?recruiterId=${userId}&jobId=${jobId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
