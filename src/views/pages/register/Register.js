import { useState } from 'react';
import { CFormCheck } from '@coreui/react';
import classNames from 'classnames/bind';
import { LoadingOutlined } from '@ant-design/icons';
import { message, Spin } from 'antd';

import * as registerServices from '../../../services/registerServices';
import FreelancerBasicInfo from '../../../components/FreelancerBasicInfo';
import RecruiterBasicInfo from '../../../components/RecruiterBasicInfo/RecruiterBasicInfo';
import config from '../../../config';
import Button from '../../../components/Button';
import styles from './Register.module.scss';
const cx = classNames.bind(styles);
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);
const Register = () => {
    const [isFreelancer, setIsFreelancer] = useState(false);
    const [isRecruiter, setIsRecruiter] = useState(false);
    const [isProcess, setIsProcess] = useState(false);
    const fetchApi = async (freelancer) => {
        const result = await registerServices.register(freelancer);
        setIsProcess(false);
        if (result.response) {
            message.error(result.response.data, 3);
        } else {
            message.success(result, 3);
        }
    };
    const handleCallBack = (user) => {
        setIsProcess(true);
        if (isFreelancer) {
            user.role = 'freelancer';
        } else {
            user.role = 'recruiter';
        }
        console.log(user);
        fetchApi(user);
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
                        onChange={() => {
                            setIsRecruiter(true);
                            setIsFreelancer(false);
                        }}
                    />
                    <CFormCheck
                        type="radio"
                        name="role"
                        id="recruiter"
                        label="Tôi muốn tìm việc"
                        className={cx('recruiter')}
                        onChange={() => {
                            setIsFreelancer(true);
                            setIsRecruiter(false);
                        }}
                    />
                </div>
                {isFreelancer && <FreelancerBasicInfo onClick={handleCallBack} />}
                {isRecruiter && <RecruiterBasicInfo onClick={handleCallBack} />}
                {isProcess && <Spin indicator={antIcon} />}
            </div>
        </div>
    );
};

export default Register;
