import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSearchParams } from 'react-router-dom';

import * as registerServices from '../../../services/registerServices';
import styles from './VerifyOTP.module.scss';
const cx = classNames.bind(styles);
const VerifyOTP = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const fetchApi = async () => {
        const result = await registerServices.verifyAccount(searchParams.get('code'));
        console.log(result);
        setIsVerified(true);
    };
    useEffect(() => {
        fetchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {isVerified && (
                <div>
                    <p>Tài khoản của bạn đã được xác nhận</p>
                    <p>Hãy đặng nhập để bắt đầu trải nghiệm những dịch vụ tuyệt vời trên lanceddy</p>
                </div>
            )}
        </div>
    );
};

export default VerifyOTP;
