import * as httpRequest from '../utils/httpRequest';

export const getPosts = async (name, status, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/staff/post?name=${name}&status=${status}&pageIndex=${pageIndex}`);
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
