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
    const [gender, setGender] = useState('1');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [subCareer, setSubCareer] = useState('chọn chuyên ngành');
    const [value, setValue] = useState(dayjs('10-10-2022'));
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const countries = useSelector((state) => state.country);
    const cities = useSelector((state) => state.city);

    useEffect(() => {
        if (freelancer.id !== undefined) {
            setName(freelancer.fullName);
            setGender(freelancer.gender);
            setPhone(freelancer.phone);
            setEmail(freelancer.email);
            setAddress(freelancer.address);
            setCity(freelancer.city);
            setCountry(freelancer.country);
            setSubCareer(freelancer.subCareer);
            setValue(dayjs(freelancer.birthdate));
        }
    }, []);
    const handleSave = () => {
        getGender();
        const f = {
            id: freelancer.id,
            fullName: name,
            gender: gender,
            phone: phone,
            address: address,
            city: city,
            country: country,
            email: email,
            birthdate: value.$D + '-' + (value.$M + 1) + '-' + value.$y,
            subCareer: subCareer,
        };
        onClick(f);
    };
    const handleCoutryChange = (value) => {
        setCountry(value);
    };
    const handleCityChange = (value) => {
        setCity(value);
    };
    const handleMenuChange = (careerItem) => {
        setSubCareer(careerItem.name);
    };
    const getGender = () => {
        if (checked1) setGender('1');
        else if (checked2) setGender('0');
        else setGender('2');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('name')}>
                <label className={cx('label')}>Họ và tên *</label>
                <CFormInput type="text" value={name} spellCheck={false} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={cx('row')}>
                <div className={cx('birthday')}>
                    <label className={cx('label')}>Ngày sinh của bạn *</label>
                    <StyledEngineProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={1}>
                                <DesktopDatePicker
                                    className={cx('date-picker')}
                                    value={value}
                                    minDate={'2017-01-01'}
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
                    <label className={cx('label')}>Ngày sinh của bạn *</label>
                    <div className={cx('container-gender')}>
                        <CFormCheck
                            type="radio"
                            name="flexRadioDefault"
                            id="male"
                            label="Nam"
                            defaultChecked={gender === '1' ? true : false}
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
                        <CFormCheck
                            type="radio"
                            name="flexRadioDefault"
                            id="other"
                            label="Khác"
                            defaultChecked={gender === '2' ? true : false}
                            onChange={() => setChecked3(!checked3)}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('left')}>
                    <label className={cx('label')}>Số điện thoại *</label>
                    <CFormInput
                        type="text"
                        value={phone}
                        spellCheck={false}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className={cx('right')}>
                    <label className={cx('label')}>Email *</label>
                    <CFormInput
                        type="text"
                        value={email}
                        spellCheck={false}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className={cx('margin-top')}>
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
                <div className={cx('right')}>
                    <label className={cx('label')}>Tỉnh thành *</label>
                    <Combox array={cities} onChange={handleCityChange} hideOnClick>
                        <div className={cx('city-btn')}>
                            <p>{city}</p>
                        </div>
                    </Combox>
                </div>
            </div>
            <div className={cx('margin-top')}>
                <label className={cx('label')}>Chuyên ngành của bạn *</label>
                <CareerMenu careers={careers} onChange={handleMenuChange} hideOnClick>
                    <div className={cx('more-btn')}>
                        <p>{subCareer}</p>
                    </div>
                </CareerMenu>
            </div>
            <Button primary onClick={handleSave} className={cx('save-btn')}>
                Lưu
            </Button>
        </div>
    );
};

export default FreelancerBasicInfo;
