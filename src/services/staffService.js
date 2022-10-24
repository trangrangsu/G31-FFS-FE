import * as httpRequest from '../utils/httpRequest';

export const getStaffs = async (name, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/admin/staff?name=${name}&pageIndex=${pageIndex}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addStaff = async (staff) => {
    try {
        const res = await httpRequest.post('api/admin/add-staff', staff);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updateStaff = async (staff) => {
    try {
        const res = await httpRequest.put('add/staff', {
            params: {
                staff,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const banStaff = async (id) => {
    try {
        const res = await httpRequest.put(`api/admin/ban-staff?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteStaff = async (staff) => {
    try {
        const res = await httpRequest.deleteMetohd('add/staff', {
            params: {
                staff,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
