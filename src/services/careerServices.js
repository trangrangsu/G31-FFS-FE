import * as httpRequest from '../utils/httpRequest';

export const getCareers = async () => {
    try {
        const res = await httpRequest.get('api/staff/getCareerTitle');
        return res;
    } catch (error) {
        console.log(error);
    }
};
