import { useState } from 'react';
import { CFormCheck } from '@coreui/react';
import classNames from 'classnames/bind';

import * as registerServices from '../../../services/registerServices';
import FreelancerBasicInfo from '../../../components/FreelancerBasicInfo';
import config from '../../../config';
import Button from '../../../components/Button';
import styles from './Register.module.scss';
const cx = classNames.bind(styles);

const fetchApi = async (freelancer) => {
    const result = await registerServices.register(freelancer);
    console.log(result);
};
const Register = () => {
    const [isFreelancer, setIsFreelancer] = useState(false);
    const [isRecruiter, setIsRecruiter] = useState(false);

    const handleCallBack = (freelance) => {
        if (isFreelancer) {
            freelance.role = 'freelancer';
        } else {
            freelance.role = 'recruiter';
        }
        console.log(freelance);
        fetchApi(freelance);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Đăng ký</h1>
                <p className={cx('under-title')}>
                    <span className={cx('gray-500')}>Đã có tài khoản?</span>
                    <Button text to={config.routes.login} className={cx('link')}>
                        Đăng nhập
                    </Button>
                </p>
                <div className={cx('role')}>
                    <CFormCheck
                        type="radio"
                        name="role"
                        id="freelancer"
                        label="Tôi muốn tuyển dụng"
                        className={cx('freelancer')}
                        onChange={() => setIsFreelancer(!isFreelancer)}
                    />
                    <CFormCheck
                        type="radio"
                        name="role"
                        id="recruiter"
                        label="Tôi muốn tìm việc"
                        className={cx('recruiter')}
                        onChange={() => setIsRecruiter(!isRecruiter)}
                    />
                </div>
                {isFreelancer && <FreelancerBasicInfo onClick={handleCallBack} />}
            </div>
        </div>
    );
};

export default Register;
