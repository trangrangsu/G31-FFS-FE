import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { CFormInput, CFormCheck } from '@coreui/react';
import DatePicker from 'react-datepicker';
import { Checkbox, Alert } from 'antd';

import config from '../../config';
import * as careerServices from '../../services/careerServices';
import Combox from '../Popper/Combox';
import CareerMenu from '../Popper/CareerMenu';
import Button from '../Button';
import styles from './FreelancerBasicInfo.module.scss';
const cx = classNames.bind(styles);

const FreelancerBasicInfo = ({ freelancer, onClick }) => {
    const [careers, setCareers] = useState([]);
    const [name, setName] = useState('');
    const [gender, setGender] = useState(true);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailEdit, setEmailEdit] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('Việt Nam');
    const [subCareerId, setsubCareerID] = useState(-1);
    const [subCareer, setSubCareer] = useState('Chọn chuyên ngành');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [checked4, setChecked4] = useState(false);
    const [titleBtn, setTitleBtn] = useState('Đăng ký');
    const [register, setRegister] = useState(true);
    const [nameValidate, setNameValidate] = useState(false);
    const [phoneValidate, setPhoneValidate] = useState(false);
    const [emailValidate, setEmailValidate] = useState(false);
    const [addressValidate, setAddressValidate] = useState(false);
    const [cityValidate, setCityValidate] = useState(false);
    const [subCareerValidate, setSubCareerValidate] = useState(false);
    const [passwordValidate, setPasswordValidate] = useState(false);
    const [ruleValidate, setRulsValidate] = useState(false);
    const countries = useSelector((state) => state.country);
    const cities = useSelector((state) => state.city);
    const [startDate, setStartDate] = useState(new Date());
    const [messageName, setMessageName] = useState('');
    const [messagePhone, setMessagePhone] = useState('');
    const [messageEmail, setMessageEmail] = useState('');
    const [messagePassword, setMessagePassword] = useState('');
    const [messageAddress, setMessageAddress] = useState('');
    const [messageCity, setMessageCity] = useState('');

    const getCareeersApi = async () => {
        const result = await careerServices.getCareers();
        console.log(result);
        setCareers(result);
    };
    useEffect(() => {
        getCareeersApi();
        if (freelancer !== undefined) {
            setName(freelancer.fullName);
            setGender(freelancer.gender);
            setPhone(freelancer.phone);
            setEmail(freelancer.email);
            setAddress(freelancer.address);
            setCity(freelancer.city);
            setCountry(freelancer.country);
            setSubCareer(freelancer.subCareer);
            setsubCareerID(freelancer.subCareerId);
            setStartDate(new Date(formatDate(freelancer.birthDate)));
            setTitleBtn('Lưu');
            setRegister(false);
            setEmailEdit(true);
            console.log(freelancer);
        }
    }, []);

    const formatDate = (date) => {
        const y = date.slice(6, 10);
        const m = date.slice(3, 5);
        const d = date.slice(0, 2);
        const dateFormat = y + '-' + m + '-' + d;
        return dateFormat;
    };
    const validateName = (name) => {
        return name.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/);
    };
    const validatePhone = (phone) => {
        return phone.match(/^[0-9]*$/);
    };
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };
    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }
    const handleSave = () => {
        let count = 0;
        if (name === '') {
            count++;
            setNameValidate(true);
            setMessageName('Họ và tên trống');
        } else if (validateName(name) !== null) {
            count++;
            setNameValidate(true);
            setMessageName('Họ tên không hợp lệ');
        } else {
            setNameValidate(false);
            setMessageName('');
        }
        if (phone === '') {
            count++;
            setPhoneValidate(true);
            setMessagePhone('Số điện thoại trống');
        } else if (validatePhone(phone) === null || phone.length < 10 || phone[0] !== '0') {
            count++;
            setPhoneValidate(true);
            setMessagePhone('Vui lòng nhập đủ 10 chữ số và bắt đầu là số 0');
        } else {
            setPhoneValidate(false);
            setMessagePhone('');
        }
        if (address === '') {
            count++;
            setAddressValidate(true);
            setMessageAddress('Địa chỉ trống');
        } else {
            setAddressValidate(false);
            setMessageAddress('');
        }
        if (city === '') {
            count++;
            setCityValidate(true);
            setMessageCity('Tỉnh thành trống');
        } else {
            setCityValidate(false);
            setMessageCity('');
        }
        if (email === '') {
            count++;
            setEmailValidate(true);
            setMessageEmail('Email trống');
        } else if (validateEmail(email) === null) {
            count++;
            setEmailValidate(true);
            setMessageEmail('Email không hợp lệ');
        } else {
            setEmailValidate(false);
            setMessageEmail('');
        }
        if (subCareer === 'Chọn chuyên ngành') {
            count++;
            setSubCareerValidate(true);
        } else {
            setSubCareerValidate(false);
        }
        if (freelancer === undefined) {
            if (checked4 === false) {
                count++;
                setRulsValidate(true);
            } else {
                setRulsValidate(false);
            }
            if (password === '') {
                setPasswordValidate(true);
                count++;
                setMessagePassword('Mật khẩu mới trống');
            } else if (password.length < 8 || password[0].toUpperCase() !== password[0]) {
                setPasswordValidate(true);
                count++;
                setMessagePassword('Mật khẩu chứa tối thiểu 8 kí tự và chữ cái đầu viết hoa');
            } else if (hasWhiteSpace(password)) {
                setPasswordValidate(true);
                count++;
                setMessagePassword('Mật khẩu không chứa dấu cách');
            } else if (password !== passwordConfirm) {
                setPasswordValidate(true);
                count++;
                setMessagePassword('Mật khẩu không khớp vui lòng nhập lại');
            } else {
                setPasswordValidate(false);
                setMessagePassword('');
            }
        }
        if (count !== 0) return;
        let a = [{ day: '2-digit' }, { month: '2-digit' }, { year: 'numeric' }];
        let s = join(startDate, a, '-');
        let aa = [{ year: 'numeric' }, { month: '2-digit' }, { day: '2-digit' }];
        let ss = join(startDate, aa, '-');
        const f = {
            fullName: name,
            gender: gender,
            phone: phone,
            address: address,
            city: city,
            country: country,
            email: email,
            birthdate: ss,
            birthdayFormat: s,
            subCareer: subCareerId,
            subCareerName: subCareer,
            password: password,
        };
        if (freelancer !== undefined) {
            f.id = freelancer.id;
        }
        onClick(f);
    };
    const handleCoutryChange = (value) => {
        setCountry(value);
    };
    const handleCityChange = (value) => {
        setCity(value);
    };
    const handleMenuChange = (careerItem) => {
        setsubCareerID(careerItem.id);
        setSubCareer(careerItem.name);
    };
    function join(t, a, s) {
        function format(m) {
            let f = new Intl.DateTimeFormat('en', m);
            return f.format(t);
        }
        return a.map(format).join(s);
    }
    const handleChangeName = (e) => {
        const value = e.target.value;
        if (value.length > 30) {
            return;
        }
        if (!value.startsWith(' ')) {
            setName(value);
        }
    };
    const handleChangePhone = (e) => {
        const value = e.target.value;
        if (value.length > 15) {
            return;
        }
        if (!value.startsWith(' ')) {
            setPhone(value);
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
    const handleChangePassword = (e) => {
        const value = e.target.value;
        if (value.length > 16) {
            return;
        }
        if (!value.startsWith(' ')) {
            setPassword(value);
        }
    };
    const handleChangeConfirmPassword = (e) => {
        const value = e.target.value;
        if (value.length > 16) {
            return;
        }
        if (!value.startsWith(' ')) {
            setPasswordConfirm(value);
        }
    };
    const handleChangeAddress = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            return;
        }
        if (!value.startsWith(' ')) {
            setAddress(value);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('name', nameValidate ? 'validate' : '')}>
                <label className={cx('label')}>Họ và tên *</label>
                <CFormInput type="text" value={name} spellCheck={false} onChange={handleChangeName} />
                {messageName !== '' && <Alert className={cx('messageError')} message={messageName} type="error" />}
            </div>
            <div className={cx('row')}>
                <div className={cx('birthday')}>
                    <label className={cx('label')}>Ngày sinh *</label>
                    <DatePicker
                        className={cx('date-picker')}
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                        }}
                    />
                </div>
                <div className={cx('gender')}>
                    <label className={cx('label')}>Giới tính *</label>
                    {freelancer !== undefined ? (
                        <div className={cx('container-gender')}>
                            <CFormCheck
                                type="radio"
                                name="flexRadioDefault"
                                id="male"
                                label="Nam"
                                defaultChecked={freelancer.gender}
                                onClick={() => setGender(true)}
                            />
                            <CFormCheck
                                type="radio"
                                name="flexRadioDefault"
                                id="female"
                                label="Nữ"
                                defaultChecked={!freelancer.gender}
                                onClick={() => setGender(false)}
                            />
                        </div>
                    ) : (
                        <div className={cx('container-gender')}>
                            <CFormCheck
                                type="radio"
                                name="flexRadioDefault"
                                id="male"
                                label="Nam"
                                defaultChecked={true}
                                onClick={() => setGender(true)}
                            />
                            <CFormCheck
                                type="radio"
                                name="flexRadioDefault"
                                id="female"
                                label="Nữ"
                                defaultChecked={false}
                                onClick={() => setGender(false)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('left', phoneValidate ? 'validate' : '')}>
                    <label className={cx('label')}>Số điện thoại *</label>
                    <CFormInput type="text" value={phone} spellCheck={false} onChange={handleChangePhone} />
                    {messagePhone !== '' && (
                        <Alert className={cx('messageError')} message={messagePhone} type="error" />
                    )}
                </div>
                <div className={cx('right', emailValidate ? 'validate' : '')}>
                    <label className={cx('label')}>Email *</label>
                    <CFormInput
                        readOnly={emailEdit}
                        type="text"
                        value={email}
                        spellCheck={false}
                        onChange={handleChangeEmail}
                    />
                    {messageEmail !== '' && (
                        <Alert className={cx('messageError')} message={messageEmail} type="error" />
                    )}
                </div>
            </div>
            {register && (
                <div className={cx('row')}>
                    <div className={cx('left', passwordValidate ? 'validate' : '')}>
                        <label className={cx('label', passwordValidate ? 'validate' : '')}>Mật khẩu *</label>
                        <CFormInput
                            type="password"
                            value={password}
                            spellCheck={false}
                            onChange={handleChangePassword}
                        />
                        {messagePassword !== '' && (
                            <Alert className={cx('messageError')} message={messagePassword} type="error" />
                        )}
                    </div>
                    <div className={cx('right', passwordValidate ? 'validate' : '')}>
                        <label className={cx('label', passwordValidate ? 'validate' : '')}>Xác nhận mật khẩu *</label>
                        <CFormInput
                            type="password"
                            value={passwordConfirm}
                            spellCheck={false}
                            onChange={handleChangeConfirmPassword}
                        />
                    </div>
                </div>
            )}
            <div className={cx('margin-top', addressValidate ? 'validate' : '')}>
                <label className={cx('label')}>Địa chỉ *</label>
                <CFormInput type="text" value={address} spellCheck={false} onChange={handleChangeAddress} />
                {messageAddress !== '' && (
                    <Alert className={cx('messageError')} message={messageAddress} type="error" />
                )}
            </div>
            <div className={cx('row')}>
                <div className={cx('left')}>
                    <label className={cx('label')}>Quốc gia *</label>
                    <Combox array={countries} onChange={handleCoutryChange} hideOnClick>
                        <div className={cx('city-btn')}>
                            <p>{country}</p>
                        </div>
                    </Combox>
                </div>
                <div className={cx('right', cityValidate ? 'validate' : '')}>
                    <label className={cx('label')}>Tỉnh thành *</label>
                    <Combox array={cities} onChange={handleCityChange} hideOnClick>
                        <div className={cx('city-btn')}>
                            <p>{city}</p>
                        </div>
                    </Combox>
                    {messageCity !== '' && <Alert className={cx('messageError')} message={messageCity} type="error" />}
                </div>
            </div>
            <div className={cx('margin-top')}>
                <label className={cx('label', subCareerValidate ? 'validate' : '')}>Chuyên ngành của bạn *</label>
                <div>
                    {careers.length !== 0 && (
                        <CareerMenu careers={careers} onChange={handleMenuChange} hideOnClick>
                            <div className={cx('more-btn')}>
                                <p>{subCareer}</p>
                            </div>
                        </CareerMenu>
                    )}
                </div>
            </div>
            {register && (
                <div className={cx('rule', ruleValidate ? 'validate' : '')}>
                    <Checkbox onChange={() => setChecked4(!checked4)}></Checkbox>
                    <span className={cx('rule-text')}>Vâng, tôi hiểu và đồng ý với </span>
                    <Button text to={config.routes.rules} className={cx('rule-btn')}>
                        các điều khoản
                    </Button>
                    <span> của lanceddy</span>
                </div>
            )}
            <Button primary onClick={handleSave} className={cx('save-btn')}>
                {titleBtn}
            </Button>
        </div>
    );
};

export default FreelancerBasicInfo;
