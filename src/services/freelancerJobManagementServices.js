import * as httpRequest from '../utils/httpRequest';

//freelancerJobManagementServices.js
//year-month-day from,to: null pageNo:0
//http://localhost:8080/api/freelancer/getAllJobRequest?freelancerId=2&status=2

//http://localhost:8080/api/freelancer/getAllJobSaved?freelancerId=2

export const getAllJobRequest = async (freelancerId, status, pageNo) => {
    try {
        const res = await httpRequest.get(
            `api/freelancer/getAllJobRequest?freelancerId=${freelancerId}&status=${status}&pageNo=${pageNo}`,
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
