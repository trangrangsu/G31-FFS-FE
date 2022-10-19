import * as httpRequest from '../utils/httpRequest';

export const getStaffs = async (pageIndex) => {
    try {
        const res = await httpRequest.get('admin/staff/' + pageIndex);
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
