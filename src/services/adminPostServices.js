import * as httpRequest from '../utils/httpRequest';

export const getPosts = async (name, status, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/job/post?status=${status}&pageIndex=${pageIndex}&keyword=${name}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getDetailPost = async (id) => {
    try {
        const res = await httpRequest.get(`api/job/postDetailAdmin?jobId=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updatePost = async (data) => {
    try {
        const res = await httpRequest.put(
            `api/job/update?jobId=${data.id}&status=${data.status}&staffId=${data.approveBy}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
