import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { CFormInput } from '@coreui/react';
import { Checkbox } from 'antd';

import Combox from '../Popper/Combox';
import Button from '../Button';
import styles from './RecruiterBasicInfo.module.scss';
const cx = classNames.bind(styles);

const RecruiterBasicInfo = ({ recruiter, onClick }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailEdit, setEmailEdit] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('Việt Nam');
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
    const [passwordValidate, setPasswordValidate] = useState(false);
    const [ruleValidate, setRuleValidate] = useState(false);

    const countries = useSelector((state) => state.country);
    const cities = useSelector((state) => state.city);
    useEffect(() => {
        if (recruiter !== undefined) {
            setName(recruiter.fullName);
            setPhone(recruiter.phone);
            setEmail(recruiter.email);
            setAddress(recruiter.address);
            setCity(recruiter.city);
            setCountry(recruiter.country);
            setTitleBtn('Lưu');
            setRegister(false);
            setEmailEdit(true);
        }
    }, []);
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
        if (recruiter === undefined) {
            if (checked4 === false) {
                count++;
                setRuleValidate(true);
            } else {
                setRuleValidate(false);
            }
            if (password === '' || password !== passwordConfirm) {
                setPasswordValidate(true);
                count++;
            } else {
                setPasswordValidate(false);
            }
        }

        if (count !== 0) return;

        const f = {
            fullName: name,
            phone: phone,
            address: address,
            city: city,
            country: country,
            email: email,
            password: password,
        };
        if (recruiter !== undefined) {
            f.id = recruiter.id;
        }
        onClick(f);
    };
    const handleCoutryChange = (value) => {
        setCountry(value);
    };
    const handleCityChange = (value) => {
        setCity(value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('name', nameValidate ? 'validate' : '')}>
                <label className={cx('label')}>Họ và tên *</label>
                <CFormInput type="text" value={name} spellCheck={false} onChange={(e) => setName(e.target.value)} />
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

export default RecruiterBasicInfo;
