import * as httpRequest from '../utils/httpRequest';

export const getProfileFreelancer = async (id) => {
    try {
        const res = await httpRequest.get(`api/freelancer/getProfileFreelancer?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getListSkillsFreelancer = async (id, skill) => {
    try {
        const res = await httpRequest.get(`api/freelancer/skill?freelancerId=${id}&skill=${skill}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addSkill = async (id, skill) => {
    try {
        const res = await httpRequest.post(`api/freelancer/add-skill?freelancerId=${id}`, skill);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteSkill = async (id, skill) => {
    try {
        const res = await httpRequest.deleteMetohd(`api/freelancer/delete-skill?freelancerId=${id}&skillId=${skill}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addEducation = async (id, education) => {
    try {
        const res = await httpRequest.post(`api/freelancer/add-education?freelancerId=${id}`, education);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updateEducation = async (education) => {
    try {
        const res = await httpRequest.put(`api/freelancer/update-education`, education);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteEducation = async (id) => {
    try {
        const res = await httpRequest.deleteMetohd(`api/freelancer/delete-education?educationId=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addWorkExp = async (id, workExp) => {
    try {
        const res = await httpRequest.post(`api/freelancer/add-exp?freelancerId=${id}`, workExp);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updateWorkExp = async (workExp) => {
    try {
        const res = await httpRequest.put(`api/freelancer/update-exp`, workExp);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteWorkExp = async (id) => {
    try {
        const res = await httpRequest.deleteMetohd(`api/freelancer/delete-exp?expId=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const editByField = async (freelancerId, fieldName, value) => {
    try {
        const res = await httpRequest.put(
            `api/freelancer/update-profile?freelancerId=${freelancerId}&field=${fieldName}&value=${value}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const editByPopup = async (freelancer) => {
    try {
        const res = await httpRequest.put(`api/freelancer/update-profiles`, freelancer);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getFeedbacks = async (id, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/user/feedback?id=${id}&pageIndex=${pageIndex}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addFeedback = async (feedback) => {
    try {
        const res = await httpRequest.post(`api/user/addFeedback`, feedback);
        return res;
    } catch (error) {
        console.log(error);
    }
};
