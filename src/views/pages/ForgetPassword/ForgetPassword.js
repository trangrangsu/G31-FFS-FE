import { useState } from 'react';
import classNames from 'classnames/bind';
import { CFormInput } from '@coreui/react';
import { Alert } from 'antd';

import * as loginServices from '../../../services/loginServices';
import images from '../../../assets/images';
import Button from '../../../components/Button';
import config from '../../../config';
import styles from './ForgetPassword.module.scss';
const cx = classNames.bind(styles);
const fetchApi = async (email) => {
    const result = await loginServices.forgetPassword(email);
    console.log(result);
};
const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [emailValidate, setEmailValidate] = useState(false);
    const [messageResult, setMessageResult] = useState('');
    const [messageEmail, setMessageEmail] = useState('');

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };
    const handleResetpassword = () => {
        if (email === '') {
            setEmailValidate(true);
            setMessageEmail('Email trống');
            setEmailValidate(true);
            setMessageResult('');
        } else if (validateEmail(email) === null) {
            setEmailValidate(true);
            setMessageEmail('Email không hợp lệ');
            setEmailValidate(true);
            setMessageResult('');
        } else {
            fetchApi(email);
            setEmailValidate(false);
        }
    };
    const handleChangeEmail = (e) => {
        const value = e.target.value;
        if (value.length > 50) {
            return;
        }
        if (!value.startsWith(' ')) {
            setEmail(value);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    {messageResult !== '' && <Alert message={messageResult} type="info" />}
                    <h1>
                        Chào mừng bạn đến với
                        <img src={images.logo} alt="logo" />
                    </h1>
                    <p>Quên mật khẩu?</p>
                    <div className={cx('form')}>
                        <div className={cx('email', emailValidate ? 'validate' : '')}>
                            <label className={cx('label')}>Địa chỉ Email *</label>
                            <CFormInput type="text" value={email} spellCheck={false} onChange={handleChangeEmail} />
                        </div>
                    </div>
                    {messageEmail !== '' && (
                        <Alert className={cx('messageError')} message={messageEmail} type="error" />
                    )}
                    <div className={cx('bottom')}>
                        <Button deny className={cx('btn-reset')} onClick={handleResetpassword}>
                            Lấy lại mật khẩu
                        </Button>
                        <div>
                            <p className={cx('font-size')}>OR</p>
                            <Button to={config.routes.register} className={cx('btn')}>
                                Đăng ký ngay
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <img src={images.toad} alt="reset passwork" />
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
