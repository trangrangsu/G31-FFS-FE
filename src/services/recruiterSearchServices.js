import * as httpRequest from '../utils/httpRequest';

//career,skill -1, cost: 1-5 searchValue ''

export const searchFreelancer = async (keyWord, costOption, address, subCareer, skill, pageIndex) => {
    try {
        const res = await httpRequest.get(
            `api/recruiter/findFreelancer?keyWord=${keyWord}&costOption=${costOption}&address=${address}&subCareer=${subCareer}&skill=${skill}&pageIndex=${pageIndex}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
