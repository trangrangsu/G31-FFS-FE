import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CFormInput } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as loginServices from '../../../services/loginServices';
import images from '../../../assets/images';
import Button from '../../../components/Button';
import config from '../../../config';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValidate, setEmailValidate] = useState(false);
    const [passValidate, setPassValidate] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch({ type: 'set', account: {} });
        sessionStorage.setItem('token', '');
    }, []);

    const fetchApi = async (user) => {
        const result = await loginServices.login(user);
        console.log(result);
        if (typeof result === 'object') {
            dispatch({ type: 'set', account: result });
            dispatch({ type: 'set', accountBalance: result.accountBalance });
            sessionStorage.setItem('userId', result.userId);
            sessionStorage.setItem('token', result.tokenType + ' ' + result.accessToken);
            let to = {};
            switch (result.role) {
                case 'freelancer':
                    to = {
                        pathname: config.routes.searchJob,
                    };
                    break;
                case 'recruiter':
                    to = {
                        pathname: config.routes.postManagement,
                    };
                    break;
                case 'admin':
                    to = {
                        pathname: config.routes.dashboard,
                    };
                    break;
                case 'staff':
                    to = {
                        pathname: config.routes.freelancer,
                    };
                    break;
                default:
            }
            navigate(to);
        }
    };
    const handleClick = () => {
        setShow(!show);
    };
    const handleLogin = () => {
        if (email !== '' && password !== '') {
            const user = {
                email,
                password,
            };
            fetchApi(user);
        } else {
            if (email === '') setEmailValidate(true);
            else setEmailValidate(false);
            if (password === '') setPassValidate(true);
            else setPassValidate(false);
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
                    <div className={cx('form')}>
                        <div className={cx('email', emailValidate ? 'validate' : '')}>
                            <label className={cx('label')}>Email *</label>
                            <CFormInput
                                type="text"
                                value={email}
                                spellCheck={false}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className={cx('container-password')}>
                                <label className={cx('label', passValidate ? 'validate' : '')}>Mật khẩu *</label>
                                <Button to={config.routes.forgetPassword} className={cx('btn')}>
                                    Quên mật khẩu?
                                </Button>
                            </div>
                            <div className={cx('input', passValidate ? 'validate' : '')}>
                                <CFormInput
                                    type={show ? 'text' : 'password'}
                                    value={password}
                                    spellCheck={false}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {show ? (
                                    <FontAwesomeIcon icon={faEye} className={cx('input-icon')} onClick={handleClick} />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faEyeSlash}
                                        className={cx('input-icon')}
                                        onClick={handleClick}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx('bottom')}>
                        <Button className={cx('btn-login')} onClick={handleLogin}>
                            Đăng nhập
                        </Button>
                        <p>
                            Không có tài khoản?
                            <Button to={config.routes.register} className={cx('btn')}>
                                Đăng ký ngay
                            </Button>
                        </p>
                    </div>
                </div>
                <div className={cx('right')}>
                    <h2>Đăng nhập để truy cập ngày vào hàng nghìn bài đăng tuyển và đánh giá</h2>
                    <ul className={cx('list')}>
                        <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Xem mức lương để giúp bạn thương lượng đề nghị hoặc tăng lương</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Dễ dàng tìm hiểu về phúc lợi, văn hóa công ty qua các đánh giá</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Dễ dàng áp dụng với các nhà tuyển dụng chỉ với 1 cú nhấp chuột</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Login;
