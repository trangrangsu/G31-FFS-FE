import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { CFormInput, CFormCheck } from '@coreui/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { Checkbox } from 'antd';

import Combox from '../Popper/Combox';
import CareerMenu from '../Popper/CareerMenu';
import Button from '../Button';
import styles from './FreelancerBasicInfo.module.scss';
const cx = classNames.bind(styles);

const FreelancerBasicInfo = ({ freelancer, onClick }) => {
    const careers = [
        {
            id: 1,
            name: 'Công nghệ thông tin',
            subCareers: {
                title: 'Công nghệ thông tin',
                data: [
                    {
                        id: 1,
                        name: 'Kỹ thuật phần mềm',
                    },
                    {
                        id: 2,
                        name: 'An toàn thông tin',
                    },
                    {
                        id: 3,
                        name: 'Khoa học máy tính',
                    },
                    {
                        id: 4,
                        name: 'Block chain',
                    },
                    {
                        id: 5,
                        name: 'Internet vạn vật',
                    },
                ],
            },
        },
        {
            id: 2,
            name: 'Thiết kế',
            subCareers: {
                title: 'Thiết kế',
                data: [
                    {
                        id: 6,
                        name: 'Thiết kế đồ họa',
                    },
                    {
                        id: 7,
                        name: 'Thiết kế thương hiệu',
                    },
                    {
                        id: 8,
                        name: 'Thiết kế sáng tạo',
                    },
                    {
                        id: 9,
                        name: 'Thiết kế tương tác',
                    },
                    {
                        id: 10,
                        name: 'Thiết kế đa phương tiện',
                    },
                ],
            },
        },
    ];
    const [name, setName] = useState('');
    const [gender, setGender] = useState(true);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailEdit, setEmailEdit] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('Việt Nam');
    const [subCareerId, setsubCareerID] = useState(1);
    const [subCareer, setSubCareer] = useState('Chọn chuyên ngành');
    const [value, setValue] = useState(dayjs('10-10-2022'));
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
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

    useEffect(() => {
        if (freelancer !== undefined) {
            setName(freelancer.fullName);
            setGender(freelancer.gender);
            setPhone(freelancer.phone);
            setEmail(freelancer.email);
            setAddress(freelancer.address);
            setCity(freelancer.city);
            setCountry(freelancer.country);
            setSubCareer(freelancer.subCareer);
            setValue(dayjs(freelancer.birthdate));
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
        getGender();
        let birthday = value.$y + '-';
        if (value.$M + 1 < 10) {
            birthday += '0' + (value.$M + 1) + '-';
        } else {
            birthday += value.$M + 1 + '-';
        }
        if (value.$D < 10) {
            birthday += '0' + value.$D;
        } else {
            birthday += value.$D;
        }
        const f = {
            fullName: name,
            gender: gender,
            phone: phone,
            address: address,
            city: city,
            country: country,
            email: email,
            birthdate: birthday,
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
    const getGender = () => {
        if (checked1) setGender(true);
        else if (checked2) setGender(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('name', nameValidate ? 'validate' : '')}>
                <label className={cx('label')}>Họ và tên *</label>
                <CFormInput type="text" value={name} spellCheck={false} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={cx('row')}>
                <div className={cx('birthday')}>
                    <label className={cx('label')}>Ngày sinh *</label>
                    <StyledEngineProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={1}>
                                <DesktopDatePicker
                                    className={cx('date-picker')}
                                    value={value}
                                    minDate={'1970-01-01'}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </StyledEngineProvider>
                </div>
                <div className={cx('gender')}>
                    <label className={cx('label')}>Giới tính *</label>
                    <div className={cx('container-gender')}>
                        <CFormCheck
                            type="radio"
                            name="flexRadioDefault"
                            id="male"
                            label="Nam"
                            defaultChecked={gender}
                            onChange={() => setChecked1(!checked1)}
                        />
                        <CFormCheck
                            type="radio"
                            name="flexRadioDefault"
                            id="female"
                            label="Nữ"
                            defaultChecked={gender === '0' ? true : false}
                            onChange={() => setChecked2(!checked2)}
                        />
                    </div>
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
                <CareerMenu careers={careers} onChange={handleMenuChange} hideOnClick>
                    <div className={cx('more-btn')}>
                        <p>{subCareer}</p>
                    </div>
                </CareerMenu>
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
