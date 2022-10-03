import React from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { CFormCheck } from '@coreui/react';
import classNames from 'classnames/bind';

import config from '../../../config';
import Button from '../../../components/Button';
import styles from './Register.module.scss';
const cx = classNames.bind(styles);
const Register = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <div className={cx('title')}>
                    <p>Đăng ký</p>
                </div>
                <div className={cx('container')}>
                    <MDBInput label="Họ và tên *" id="form1" type="text" className={cx('custom')} />
                </div>
                <div className={cx('container')}>
                    <MDBInput label="Mật khẩu *" id="form2" type="password" className={cx('custom')} />
                </div>
                <div className={cx('container')}>
                    <MDBInput label="Xác nhận mật khẩu *" id="form3" type="password" className={cx('custom')} />
                </div>
                <div className={cx('container')}>
                    <MDBInput label="Email *" id="form6" type="email" className={cx('custom')} />
                </div>
                <div className={cx('role-form')}>
                    <label className={cx('label')}>Tôi muốn đăng ký làm</label>
                    <div className={cx('content')}>
                        <CFormCheck
                            type="radio"
                            name="role"
                            id="freelancer"
                            label="Freelancer"
                            className={cx('freelancer')}
                            defaultChecked
                        />
                        <CFormCheck
                            type="radio"
                            name="role"
                            id="recruiter"
                            label="Recruiter"
                            className={cx('recruiter')}
                        />
                    </div>
                    <div className={cx('left-top')}></div>
                    <div className={cx('right-top')}></div>
                </div>
                <Button text rounded to={config.routes.updateFreelancer} className={cx('btn')}>
                    ĐĂNG KÝ
                </Button>
                <span className={cx('text')}>
                    {' '}
                    Đã có tài khoản?
                    <Button text to={config.routes.login} className={cx('link')}>
                        Đăng nhập
                    </Button>
                </span>
            </div>
        </div>
    );
};

export default Register;
