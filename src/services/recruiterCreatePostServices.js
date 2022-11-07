import * as httpRequest from '../utils/httpRequest';

export const createPost = async (post) => {
    try {
        const res = await httpRequest.post(`api/recruiter/createPost`, post);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getSkills = async () => {
    try {
        const res = await httpRequest.get(`api/user/skill`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
