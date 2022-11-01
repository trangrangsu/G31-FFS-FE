import * as httpRequest from '../utils/httpRequest';

export const getTransactionHistory = async (userId, from, to, pageNo) => {
    try {
        const res = await httpRequest.get(
            `api/user/transaction-history?userId=${userId}&from=${from}&to=${to}&pageNo=${pageNo}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const rechargeMoney = async (data) => {
    try {
        const res = await httpRequest.put(`api/user/recharge-money`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};
