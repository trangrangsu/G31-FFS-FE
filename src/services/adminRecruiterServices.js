import * as httpRequest from '../utils/httpRequest';

export const getRecruiters = async (name, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/admin/recruiter?name=${name}&pageIndex=${pageIndex}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getRecruiter = async (id) => {
    try {
        const res = await httpRequest.get(`api/admin/detail-recruiter?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
