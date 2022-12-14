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
            dispatch({ type: 'set', durationRemain: result.durationRemain });
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
            setTimeout(() => {
                navigate(to);
            }, 200);
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
            setMessageEmail('Vui l??ng nh???p Email');
        } else if (validateEmail(email) === null) {
            setEmailValidate(true);
            setMessageEmail('Vui l??ng ki???m tra l???i Email');
        } else {
            setEmailValidate(false);
            setMessageEmail('');
            count++;
        }
        if (password === '') {
            setPassValidate(true);
            setMessagePassword('Vui l??ng nh???p m???t kh???u');
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
                        Ch??o m???ng b???n ?????n v???i
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
                                <label className={cx('label', passValidate ? 'validate' : '')}>M???t kh???u *</label>
                                <Button to={config.routes.forgetPassword} className={cx('btn')}>
                                    Qu??n m???t kh???u?
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
                            ????ng nh???p
                        </Button>
                        <p>
                            Kh??ng c?? t??i kho???n?
                            <Button to={config.routes.register} className={cx('btn')}>
                                ????ng k?? ngay
                            </Button>
                        </p>
                    </div>
                </div>
                <div className={cx('right')}>
                    <h2>????ng nh???p ????? truy c???p ng??y v??o h??ng ngh??n b??i ????ng tuy???n v?? ????nh gi??</h2>
                    <ul className={cx('list')}>
                        <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Xem m???c l????ng ????? gi??p b???n th????ng l?????ng ????? ngh??? ho???c t??ng l????ng</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>D??? d??ng t??m hi???u v??? ph??c l???i, v??n h??a c??ng ty qua c??c ????nh gi??</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>D??? d??ng ??p d???ng v???i c??c nh?? tuy???n d???ng ch??? v???i 1 c?? nh???p chu???t</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Login;
