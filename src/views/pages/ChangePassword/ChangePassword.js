import { useState } from 'react';
import classNames from 'classnames/bind';
import { CFormInput } from '@coreui/react';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { Alert } from 'antd';

import * as loginServices from '../../../services/loginServices';
import images from '../../../assets/images';
import Button from '../../../components/Button';
import styles from './ChangePassword.module.scss';
const cx = classNames.bind(styles);
const ChangePassword = () => {
    const account = useSelector((state) => state.account);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [messagePassword, setMessagePassword] = useState('');
    const changePasswordApi = async (data) => {
        const result = await loginServices.changePassword(data);
        if (result) {
            message.success('Đổi mật khẩu thành công');
        } else {
            message.error('Mật khẩu không chính xác');
        }
    };
    const handleChangePassword = () => {
        if (oldPassword === '' || newPassword === '' || newPasswordConfirm === '') {
            setMessagePassword('Vui lòng không để trống');
        } else if (newPassword.length < 8 || newPassword[0].toUpperCase() !== newPassword[0]) {
            setMessagePassword('Mật khẩu chứa tối thiểu 8 kí tự và chữ cái đầu viết hoa');
        } else if (newPassword !== newPasswordConfirm) {
            setMessagePassword('Mật khẩu mới không khớp vui lòng nhập lại');
        } else {
            const data = {};
            data.email = account.email;
            data.oldPassword = oldPassword;
            data.password = newPassword;
            changePasswordApi(data);
        }
    };
    const handleChangeOldPassword = (e) => {
        const value = e.target.value;
        if (value.length > 16) {
            return;
        }
        if (!value.startsWith(' ')) {
            setOldPassword(value);
        }
    };
    const handleChangeNewPassword = (e) => {
        const value = e.target.value;
        if (value.length > 16) {
            return;
        }
        if (!value.startsWith(' ')) {
            setNewPassword(value);
        }
    };
    const handleChangeConfirmNewPassword = (e) => {
        const value = e.target.value;
        if (value.length > 16) {
            return;
        }
        if (!value.startsWith(' ')) {
            setNewPasswordConfirm(value);
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
                    <p>Đổi mật khẩu ?</p>
                    <div className={cx('form')}>
                        <div className={cx('email')}>
                            <label className={cx('label')}>Địa chỉ Email *</label>
                            <CFormInput readOnly type="text" value={account.email} spellCheck={false} />
                        </div>
                        <div className={cx('password')}>
                            <label className={cx('label')}>Mật khẩu cũ *</label>
                            <CFormInput
                                type="password"
                                value={oldPassword}
                                spellCheck={false}
                                onChange={handleChangeOldPassword}
                            />
                        </div>
                        <div className={cx('password')}>
                            <label className={cx('label')}>Mật khẩu mới *</label>
                            <CFormInput
                                type="password"
                                value={newPassword}
                                spellCheck={false}
                                onChange={handleChangeNewPassword}
                            />
                        </div>
                        <div className={cx('password')}>
                            <label className={cx('label')}>Nhập lại mật khẩu mới *</label>
                            <CFormInput
                                type="password"
                                value={newPasswordConfirm}
                                spellCheck={false}
                                onChange={handleChangeConfirmNewPassword}
                            />
                        </div>
                    </div>
                    {messagePassword !== '' && (
                        <Alert className={cx('messageError')} message={messagePassword} type="error" />
                    )}
                    <div className={cx('bottom')}>
                        <Button className={cx('btn-forgot')} onClick={handleChangePassword}>
                            Đổi mật khẩu
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

export default ChangePassword;
