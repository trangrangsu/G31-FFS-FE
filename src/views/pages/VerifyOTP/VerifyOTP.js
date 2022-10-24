import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBInput } from 'mdb-react-ui-kit';
import classNames from 'classnames/bind';

import config from '../../../config';
import Button from '../../../components/Button';
import styles from './VerifyOTP.module.scss';
const cx = classNames.bind(styles);
const VerifyOTP = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <div>
                    <p className={cx('title')}>Xác nhận mã OTP</p>
                    <div className={cx('message')}>
                        <p>
                            Chúng tôi đã gửi mã OTP tới tài khoản email của bạn <b>tuyennh@gmail.com</b>
                        </p>
                    </div>
                </div>
                <div className={cx('input')}>
                    <MDBInput label="Nhập mã OTP *" id="form1" type="text" className={cx('custom')} />
                </div>
                <span className={cx('text')}>
                    {' '}
                    Lưu ý: Mã OTP chỉ tồn tại trong 2 phút
                    <Button text className={cx('link')}>
                        nhấp vào đây
                    </Button>
                    để gửi lại
                </span>
                <Button rounded to={config.routes.updateFreelancer} className={cx('btn')}>
                    Xác nhận
                </Button>
            </div>
        </div>
    );
};

export default VerifyOTP;
