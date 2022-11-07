import * as httpRequest from '../utils/httpRequest';

//career,skill -1, cost: 1-5 searchValue ''

export const getProfile = async (recruiterId) => {
    try {
        const res = await httpRequest.get(`api/recruiter/getProfileRecruiter?recruiterId=${recruiterId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updateProfile = async (recruiter) => {
    try {
        const res = await httpRequest.put(`api/recruiter/updateProfile`, recruiter);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updateAvatar = async (recruiterId, avatar) => {
    try {
        const res = await httpRequest.put(`api/recruiter/updateAvatar?recruiterId=${recruiterId}&avatar=${avatar}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updateProfileRecruiter = async (recruiter) => {
    try {
        const res = await httpRequest.put(`api/recruiter/updateProfileRecruiter`, recruiter);
        return res;
    } catch (error) {
        console.log(error);
    }
};
