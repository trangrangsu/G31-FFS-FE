import * as httpRequest from '../utils/httpRequest';

export const getPostDetail = async (postId, freelancerId) => {
    try {
        const res = await httpRequest.get(`api/job/postDetail?id=${postId}&freelancerId=${freelancerId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
