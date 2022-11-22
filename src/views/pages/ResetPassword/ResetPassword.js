import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CFormInput } from '@coreui/react';
import { useSearchParams } from 'react-router-dom';

import * as loginServices from '../../../services/loginServices';
import images from '../../../assets/images';
import Button from '../../../components/Button';
import styles from './ResetPassword.module.scss';
const cx = classNames.bind(styles);

const ResetPassword = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [messageSuccess, setMessageSuccess] = useState(false);
    const [messageSuccesss, setMessageSuccesss] = useState('');

    const fetchApi = async () => {
        const result = await loginServices.resetPassword(searchParams.get('resetPasswordToken'));
        console.log(result);
        setEmail(result);
    };
    const changePassword = async (user) => {
        const result = await loginServices.changePassword(user);
        setMessageSuccesss(result);
        setMessageSuccess(true);
    };
    useEffect(() => {
        fetchApi();
    });
    const handleResetpassword = () => {
        if (password === '' || passwordConfirm === '') {
            setMessage('Vui lòng không để trống');
        } else if (password.length < 8 || password[0].toUpperCase() !== password[0]) {
            setMessage('Mật khẩu chứa tối thiểu 8 kí tự và chữ cái đầu viết hoa');
        } else if (password !== passwordConfirm) {
            setMessage('Mật khẩu mới không khớp vui lòng nhập lại');
        } else {
            const user = {
                email,
                password,
            };
            changePassword(user);
            console.log(user);
        }
    };
    const handleChangeNewPassword = (e) => {
        const value = e.target.value;
        if (value.length > 16) {
            return;
        }
        if (!value.startsWith(' ')) {
            setPassword(value);
        }
    };
    const handleChangeConfirmNewPassword = (e) => {
        const value = e.target.value;
        if (value.length > 16) {
            return;
        }
        if (!value.startsWith(' ')) {
            setPasswordConfirm(value);
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
                    <p>Đổi mật khẩu</p>
                    <div className={cx('form')}>
                        <div className={cx('email')}>
                            <label className={cx('label')}>Mật khẩu *</label>
                            <CFormInput
                                type="password"
                                value={password}
                                spellCheck={false}
                                onChange={handleChangeNewPassword}
                            />
                        </div>
                        <div className={cx('email')}>
                            <label className={cx('label')}>Xác nhận mật khẩu *</label>
                            <CFormInput
                                type="password"
                                value={passwordConfirm}
                                spellCheck={false}
                                onChange={handleChangeConfirmNewPassword}
                            />
                        </div>
                    </div>
                    {message !== '' && (
                        <div className={cx('error-message')}>
                            <p>{message}</p>
                        </div>
                    )}
                    {messageSuccess && (
                        <div className={cx('success-message')}>
                            <p>{messageSuccesss}</p>
                        </div>
                    )}
                    <div className={cx('bottom')}>
                        <Button deny className={cx('btn-reset')} onClick={handleResetpassword}>
                            Lưu
                        </Button>
                    </div>
                </div>
                <div className={cx('right')}>
                    <img src={images.toad} alt="reset passwork" />
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
