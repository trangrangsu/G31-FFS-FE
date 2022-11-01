import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CFormInput } from '@coreui/react';

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

    const handleResetpassword = () => {
        if (email !== '') {
            fetchApi(email);
            console.log(email);
        } else {
            setEmailValidate(true);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <h1>
                        Chào mừng bạn đến với
                        <img src={images.logo} alt="logo" />
                    </h1>
                    <p>Quên mật khẩu?</p>
                    <div className={cx('form')}>
                        <div className={cx('email', emailValidate ? 'validate' : '')}>
                            <label className={cx('label')}>Địa chỉ Email *</label>
                            <CFormInput
                                type="text"
                                value={email}
                                spellCheck={false}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
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
