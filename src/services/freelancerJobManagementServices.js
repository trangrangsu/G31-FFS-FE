import * as httpRequest from '../utils/httpRequest';

export const getAllJobRequest = async (freelancerId, status, pageIndex) => {
    try {
        const res = await httpRequest.get(
            `api/freelancer/getAllJobRequest?freelancerId=${freelancerId}&status=${status}&pageIndex=${pageIndex}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getAllJobSaved = async (freelancerId, pageNo) => {
    try {
        const res = await httpRequest.get(
            `api/freelancer/getAllJobSaved?freelancerId=${freelancerId}&pageNo=${pageNo}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
