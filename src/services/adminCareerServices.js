import * as httpRequest from '../utils/httpRequest';

export const getCareers = async (name, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/staff/career?name=${name}&pageIndex=${pageIndex}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getAllCareers = async () => {
    try {
        const res = await httpRequest.get(`api/staff/getAllCareer`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addCareer = async (name) => {
    try {
        const res = await httpRequest.post(`api/staff/career/add?name=${name}`);
        return res;
    } catch (error) {
        return error;
    }
};
export const updateCareer = async (id, name) => {
    try {
        const res = await httpRequest.put(`api/staff/career/update?id=${id}&name=${name}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteCareer = async (id) => {
    try {
        const res = await httpRequest.deleteMetohd(`api/staff/career/delete?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
