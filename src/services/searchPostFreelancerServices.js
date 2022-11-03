import * as httpRequest from '../utils/httpRequest';

export const getPosts = async (userId, area, keyword, subCareerId, paymentType, pageIndex) => {
    try {
        const res = await httpRequest.get(
            `api/freelancer/findingJob?userId=${userId}&area=${area}&keyword=${keyword}&sub_career_id=${subCareerId}&paymentType=${paymentType}&pageIndex=${pageIndex}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addJobSaved = async (freelancerId, jobId) => {
    try {
        const res = await httpRequest.post(`api/freelancer/addJobSaved?freelancerId=${freelancerId}&jobId=${jobId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addJobRequest = async (freelancerId, jobId) => {
    try {
        const res = await httpRequest.post(`api/freelancer/addJobRequest?freelancerId=${freelancerId}&jobId=${jobId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
