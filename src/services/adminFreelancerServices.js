import * as httpRequest from '../utils/httpRequest';

export const getFreelancers = async (name, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/admin/freelancer?name=${name}&pageIndex=${pageIndex}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getFreelancer = async (id) => {
    try {
        const res = await httpRequest.get(`api/admin/detail-freelancer?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addStaff = async (staff) => {
    try {
        const res = await httpRequest.post('add/staff', {
            params: {
                staff,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
