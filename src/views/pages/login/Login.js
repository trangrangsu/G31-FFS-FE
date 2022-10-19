import React from 'react';
import classNames from 'classnames/bind';
import { MDBInput } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import Button from '../../../components/Button';
import config from '../../../config';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);
const Login = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <div className={cx('title')}>
                    <p>Đăng nhập</p>
                </div>
                <div div className={cx('container')}>
                    <MDBInput label="Email *" id="form1" type="text" className={cx('custom')} />
                </div>
                <div div className={cx('container')}>
                    <MDBInput label="Mật khẩu *" id="form2" type="password" className={cx('custom')} />
                </div>

                <Button text rounded className={cx('btn')}>
                    ĐĂNG NHẬP
                </Button>
                <Button text to={config.routes.login} className={cx('forgot-link')}>
                    Quên mật khẩu?
                </Button>
                <span className={cx('text')}>
                    {' '}
                    Chưa có tài khoản?
                    <Button text to={config.routes.login} className={cx('register-link')}>
                        Đăng ký
                    </Button>
                </span>
            </div>
        </div>
    );
};

export default Login;
