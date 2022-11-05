import * as httpRequest from '../utils/httpRequest';

export const getPostDetail = async (postId) => {
    try {
        const res = await httpRequest.get(`api/job/postDetail?id=${postId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
