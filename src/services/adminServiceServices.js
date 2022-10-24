import * as httpRequest from '../utils/httpRequest';

export const getServices = async (roleId, name, pageIndex) => {
    try {
        const res = await httpRequest.get(`api/admin/service?roleId=${roleId}&name=${name}&pageIndex=${pageIndex}`);
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
export const deleteService = async (id) => {
    try {
        const res = await httpRequest.deleteMetohd(`api/admin/delete-service?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
