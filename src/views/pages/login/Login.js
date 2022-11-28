import { useState } from 'react';
import classNames from 'classnames/bind';
import { CFormInput } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd';

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
    const [message, setMessage] = useState('');
    const [messageEmail, setMessageEmail] = useState('');
    const [messagePassword, setMessagePassword] = useState('');

    const fetchApi = async (user) => {
        const result = await loginServices.login(user);
        if (result.userId !== undefined) {
            dispatch({ type: 'set', account: result });
            dispatch({ type: 'set', accountBalance: result.accountBalance });
            dispatch({ type: 'set', accountAvatar: result.avatar });
            dispatch({ type: 'set', isMemberShip: result.isMemberShip });
            dispatch({ type: 'set', currentServiceName: result.currentServiceName });
            dispatch({ type: 'set', currentServiceId: result.currentServiceId });
            localStorage.setItem('userId', result.userId);
            localStorage.setItem('userRole', result.role);
            localStorage.setItem('token', result.tokenType + ' ' + result.accessToken);
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
        } else {
            console.log(result);
            setMessage(result.response.data);
        }
    };
    const handleClick = () => {
        setShow(!show);
    };
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };
    const handleLogin = () => {
        let count = 0;
        if (email === '') {
            setEmailValidate(true);
            setMessageEmail('Vui lòng nhập Email');
        } else if (validateEmail(email) === null) {
            setEmailValidate(true);
            setMessageEmail('Vui lòng kiểm tra lại Email');
        } else {
            setEmailValidate(false);
            setMessageEmail('');
            count++;
        }
        if (password === '') {
            setPassValidate(true);
            setMessagePassword('Vui lòng nhập mật khẩu');
        } else {
            setPassValidate(false);
            setMessagePassword('');
            count++;
        }
        if (count === 2) {
            const user = {
                email,
                password,
            };
            fetchApi(user);
        }
    };
    function enterPress(e) {
        let code = e.keyCode ? e.keyCode : e.which;
        if (code == 13) {
            handleLogin();
        }
    }
    return (
        <div className={cx('wrapper')}>
            {message !== '' && <Alert className={cx('message')} message={message} type="error" />}
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
                            {messageEmail !== '' && (
                                <Alert className={cx('messageError')} message={messageEmail} type="error" />
                            )}
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
                                    onKeyDown={(e) => enterPress(e)}
                                />
                                {messagePassword !== '' && (
                                    <Alert className={cx('messageError')} message={messagePassword} type="error" />
                                )}
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
