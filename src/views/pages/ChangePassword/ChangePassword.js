import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CFormInput } from '@coreui/react';

import images from '../../../assets/images';
import Button from '../../../components/Button';
import styles from './ChangePassword.module.scss';
const cx = classNames.bind(styles);
const ChangePassword = () => {
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
                            <CFormInput readOnly type="text" />
                        </div>
                        <div className={cx('password')}>
                            <label className={cx('label')}>Mật khẩu cũ *</label>
                            <CFormInput />
                        </div>
                        <div className={cx('password')}>
                            <label className={cx('label')}>Mật khẩu mới *</label>
                            <CFormInput />
                        </div>
                        <div className={cx('password')}>
                            <label className={cx('label')}>Nhập lại mật khẩu mới *</label>
                            <CFormInput />
                        </div>
                    </div>
                    <div className={cx('bottom')}>
                        <Button className={cx('btn-forgot')}>Đổi mật khẩu</Button>
                        <p>
                            Nhấn
                            <a href="http://localhost:3000/login"> Vào đây </a>
                            để trở lại màn hình đăng nhập
                        </p>
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
