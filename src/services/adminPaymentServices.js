import * as httpRequest from '../utils/httpRequest';

export const getPayments = async (keyword, status, pageIndex) => {
    try {
        const res = await httpRequest.get(
            `api/staff/payment?keyword=${keyword}&status=${status}&pageIndex=${pageIndex}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getBenefits = async () => {
    try {
        const res = await httpRequest.get(`api/admin/benefit`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getBenefitService = async (id) => {
    try {
        const res = await httpRequest.get(`api/admin/benefits-service?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addService = async (service) => {
    try {
        const res = await httpRequest.post(`api/admin/add-service`, service);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updateStaff = async (service) => {
    try {
        const res = await httpRequest.put('api/admin/update-service', service);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteStaff = async (id) => {
    try {
        const res = await httpRequest.deleteMetohd(`admin/delete-service?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
