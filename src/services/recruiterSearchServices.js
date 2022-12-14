import * as httpRequest from '../utils/httpRequest';

//career,skill -1, cost: 1-5 searchValue ''

export const searchFreelancer = async (keyWord, costOption, city, subCareer, skill, isMemberShip, pageIndex) => {
    try {
        const res = await httpRequest.get(
            `api/recruiter/findFreelancer?costOption=${costOption}&city=${city}&subCareer=${subCareer}&skill=${skill}&keyword=${keyWord}&isMemberShip=${isMemberShip}&pageIndex=${pageIndex}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
