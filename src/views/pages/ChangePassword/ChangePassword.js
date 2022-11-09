import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CFormInput } from '@coreui/react';
import { message } from 'antd';
import { useSelector } from 'react-redux';

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
    const changePasswordApi = async (data) => {
        const result = await loginServices.changePassword(data);
        if (result) {
            message.success('Đổi mật khẩu thành công');
        } else {
            message.error('Mật khẩu không chính xác');
        }
    };
    const handleChangePassword = () => {
        if (newPassword !== newPasswordConfirm) {
            message.error('Mật khẩu mới không trùng nhau');
            return;
        }
        const data = {};
        data.email = account.email;
        data.oldPassword = oldPassword;
        data.password = newPassword;
        changePasswordApi(data);
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
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('password')}>
                            <label className={cx('label')}>Mật khẩu mới *</label>
                            <CFormInput
                                type="password"
                                value={newPassword}
                                spellCheck={false}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('password')}>
                            <label className={cx('label')}>Nhập lại mật khẩu mới *</label>
                            <CFormInput
                                type="password"
                                value={newPasswordConfirm}
                                spellCheck={false}
                                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                            />
                        </div>
                    </div>
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
