import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, token, options = {}) => {
    httpRequest.defaults.headers.common['Authorization'] = token;
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const getStatisticRecruiter = async (token, recruiterId) => {
    try {
        const res = await httpRequest.get(`api/recruiter/statistic?recruiterId=${recruiterId}`, token);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getStatisticFreelancer = async (token, freelancerId) => {
    try {
        const res = await httpRequest.get(token, `api/freelancer/statistic?freelancerId=${freelancerId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
