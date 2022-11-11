import * as httpRequest from '../utils/httpRequest';

export const getPostDetail = async (postId, freelancerId) => {
    try {
        const res = await httpRequest.get(`api/job/postDetail?id=${postId}&freelancerId=${freelancerId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addJobRequest = async (postId, freelancerId) => {
    try {
        const res = await httpRequest.post(`api/freelancer/addJobRequest?freelancerId=${freelancerId}&jobId=${postId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteJobRequest = async (postId, freelancerId) => {
    try {
        const res = await httpRequest.deleteMetohd(
            `api/freelancer/deleteJobRequest?freelancerId=${freelancerId}&jobId=${postId}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
