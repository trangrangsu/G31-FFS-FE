import * as httpRequest from '../utils/httpRequest';

export const getPosts = async (name, status, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/staff/post?status=${status}&pageIndex=${pageIndex}&keyword=${name}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getDetailPost = async (id) => {
    try {
        const res = await httpRequest.get(`api/staff/postDetail?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updatePost = async (data) => {
    try {
        const res = await httpRequest.put(
            `api/staff/post/update?id=${data.id}&status=${data.status}&approveBy=${data.approveBy}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
