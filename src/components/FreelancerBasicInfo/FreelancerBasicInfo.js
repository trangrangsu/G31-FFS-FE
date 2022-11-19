import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { CFormInput, CFormCheck } from '@coreui/react';
import DatePicker from 'react-datepicker';
import { Checkbox } from 'antd';

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
    const handleSave = () => {
        let count = 0;
        if (name === '') {
            count++;
            setNameValidate(true);
        } else {
            setNameValidate(false);
        }
        if (phone === '') {
            count++;
            setPhoneValidate(true);
        } else {
            setPhoneValidate(false);
        }
        if (address === '') {
            count++;
            setAddressValidate(true);
        } else {
            setAddressValidate(false);
        }
        if (city === '') {
            count++;
            setCityValidate(true);
        } else {
            setCityValidate(false);
        }
        if (email === '') {
            count++;
            setEmailValidate(true);
        } else {
            setEmailValidate(false);
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
            if (password === '' || password !== passwordConfirm) {
                setPasswordValidate(true);
                count++;
            } else {
                setPasswordValidate(false);
            }
        }
        if (count !== 0) return;
        let a = [{ day: '2-digit' }, { month: '2-digit' }, { year: 'numeric' }];
        let s = join(startDate, a, '-');
        console.log(s);
        let aa = [{ year: 'numeric' }, { month: '2-digit' }, { day: '2-digit' }];
        let ss = join(startDate, aa, '-');
        console.log(ss);
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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('name', nameValidate ? 'validate' : '')}>
                <label className={cx('label')}>Họ và tên *</label>
                <CFormInput type="text" value={name} spellCheck={false} onChange={(e) => setName(e.target.value)} />
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
                    <CFormInput
                        type="text"
                        value={phone}
                        spellCheck={false}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className={cx('right', emailValidate ? 'validate' : '')}>
                    <label className={cx('label')}>Email *</label>
                    <CFormInput
                        readOnly={emailEdit}
                        type="text"
                        value={email}
                        spellCheck={false}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            {register && (
                <div className={cx('row')}>
                    <div className={cx('left', phoneValidate ? 'validate' : '')}>
                        <label className={cx('label', passwordValidate ? 'validate' : '')}>Mật khẩu *</label>
                        <CFormInput
                            type="password"
                            value={password}
                            spellCheck={false}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={cx('right', emailValidate ? 'validate' : '')}>
                        <label className={cx('label', passwordValidate ? 'validate' : '')}>Xác nhận mật khẩu *</label>
                        <CFormInput
                            type="password"
                            value={passwordConfirm}
                            spellCheck={false}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </div>
                </div>
            )}
            <div className={cx('margin-top', addressValidate ? 'validate' : '')}>
                <label className={cx('label')}>Địa chỉ *</label>
                <CFormInput
                    type="text"
                    value={address}
                    spellCheck={false}
                    onChange={(e) => setAddress(e.target.value)}
                />
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
                    <Button text href="#" className={cx('rule-btn')}>
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
