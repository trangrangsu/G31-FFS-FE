import * as httpRequest from '../utils/httpRequest';

export const getSubCareers = async (careerID, name, pageIndex) => {
    try {
        const res = await httpRequest.get(
            `api/staff/subcareer?careerID=${careerID}&name=${name}&pageIndex=${pageIndex}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addSubCareer = async (careerId, name) => {
    try {
        const res = await httpRequest.post(`api/staff/subcareer/add?career_id=${careerId}&name=${name}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updateSubCareer = async (careerId, id, name) => {
    try {
        const res = await httpRequest.put(`api/staff/subcareer/update?career_id=${careerId}&id=${id}&name=${name}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteSubCareer = async (id) => {
    try {
        const res = await httpRequest.deleteMetohd(`api/staff/subcareer/delete?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
