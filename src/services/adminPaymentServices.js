import * as httpRequest from '../utils/httpRequest';

export const getPayments = async (keyword, status, pageIndex) => {
    try {
        const res = await httpRequest.get(
            `api/staff/paymentSearch?keyword=${keyword}&status=${status}&pageIndex=${pageIndex}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updatePayment = async (data) => {
    try {
        const res = await httpRequest.put(
            `api/staff/payment/update?id=${data.id}&status=${data.status}&approveBy=${data.approveBy}&responseMessage=${data.responseMessage}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
