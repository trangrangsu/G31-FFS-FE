import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPenToSquare, faPhone } from '@fortawesome/free-solid-svg-icons';
import { message } from 'antd';
import { useSelector } from 'react-redux';

import * as recruiterProfileServices from '../../../services/recruiterProfileServices';
import CompanyInfoPopup from './CompanyInfoPopup';
import BasicPopup from './BasicPopup';
import Feedback from '../../Freelancer/Profile/Feedback';
import * as firebase from '../../../firebase/firebase';
import Image from '../../../components/Image';
import images from '../../../assets/images';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);

const Profile = () => {
    const imgRef = useRef();
    const account = useSelector((state) => state.account);
    const [image, setImage] = useState(images.defaultAvatar);
    const [recruiter, setRecruiter] = useState({});
    const [showBasicInfo, setShowBasicInfo] = useState(false);
    const [showCompanyInfo, setShowCompanyInfo] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const [website, setWebsite] = useState('');
    const [career, setCareer] = useState({});
    const [companyName, setCompanyName] = useState('');
    const [companyIntro, setCompanyIntro] = useState('');

    const fetchApi = async () => {
        const result = await recruiterProfileServices.getProfile(account.userId);
        console.log(result);
        setRecruiter(result);
        setFullName(result.fullName);
        setEmail(result.email);
        setPhone(result.phone);
        setAddress(result.address);
        setCity(result.city);
        setCountry(result.country);
        setTaxNumber(result.taxNumber);
        setWebsite(result.website);
        if (result.career !== null) {
            setCareer(result.career);
        }
        setCompanyName(result.companyName);
        setCompanyIntro(result.companyIntro);
        if (result.avatar !== null) {
            setAvatar(result.avatar);
        }
    };
    const updateProfileApi = async (recruiter) => {
        const result = await recruiterProfileServices.updateProfile(recruiter);
        console.log(result);
        if (result) {
            message.success('c???p nh???t th??nh c??ng');
        } else {
            message.error('c???p nh???t th???t b???i');
        }
    };
    const updateAvatarApi = async (avatar) => {
        const result = await recruiterProfileServices.updateAvatar(account.userId, avatar);
        console.log(result);
        if (result) {
            message.success('c???p nh???t th??nh c??ng');
        } else {
            message.error('c???p nh???t th???t b???i');
        }
    };
    const updateProfileRecruiterApi = async (recruiter) => {
        const result = await recruiterProfileServices.updateProfileRecruiter(recruiter);
        console.log(result);
        if (result) {
            message.success('c???p nh???t th??nh c??ng');
        } else {
            message.error('c???p nh???t th???t b???i');
        }
    };
    useEffect(() => {
        fetchApi();
    }, []);
    useEffect(() => {
        if (avatar !== '') firebase.downloadFile(account.userId, 'avatar', avatar, setImage);
    }, [avatar]);
    function previewFile() {
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            imgRef.current.src = reader.result;
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            imgRef.current.src = '';
        }
    }
    const handleShowBasicInfo = () => {
        setShowBasicInfo(true);
    };
    const handleCallBack = (recruiter) => {
        setShowBasicInfo(false);
        recruiter.id = account.userId;
        updateProfileApi(recruiter);
        setTimeout(() => {
            fetchApi();
        }, 400);
    };
    const handleCallCompanyInfo = (companyInfo) => {
        setShowCompanyInfo(false);
        updateProfileRecruiterApi(companyInfo);
        setTimeout(() => {
            fetchApi();
        }, 400);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('person-info')}>
                    <div className={cx('label')}>
                        <p>Th??ng tin c?? nh??n</p>
                        <FontAwesomeIcon icon={faPenToSquare} onClick={handleShowBasicInfo} />
                    </div>
                    <div className={cx('container-info')}>
                        <div className={cx('avatar')}>
                            <div className={cx('avatar-container')}>
                                <div className={cx('avatar-img')}>
                                    <Image src={image} alt="avatar" ref={imgRef} />
                                </div>
                                <div className={cx('avatar-upload')}>
                                    <label htmlFor="myfile1">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </label>
                                    <input
                                        type="file"
                                        id="myfile1"
                                        name="myfile"
                                        onChange={(e) => {
                                            console.log(e.target.files[0].name);
                                            updateAvatarApi(e.target.files[0].name);
                                            firebase.upLoadFile(account.userId, 'avatar', e.target.files[0]);
                                            previewFile();
                                        }}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className={cx('person-name')}>
                            <p>{fullName}</p>
                        </div>
                        <div className={cx('column')}>
                            <div className={cx('email')}>
                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <p>{email}</p>
                                </div>
                            </div>
                            <div className={cx('phone')}>
                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <p>{phone}</p>
                                </div>
                            </div>
                            <div className={cx('address')}>
                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    <p>
                                        {address} - {city} - {country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('company-info')}>
                    <div className={cx('label')}>
                        <p>Th??ng tin c??ng ty</p>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            onClick={() => {
                                setShowCompanyInfo(true);
                            }}
                        />
                    </div>
                    <div className={cx('container-info')}>
                        <div className={cx('left')}>
                            <div className={cx('info-item2')}>
                                <label>M?? s??? thu???: </label>
                                <p>{taxNumber}</p>
                            </div>
                            <div className={cx('info-item2')}>
                                <label>Website: </label>
                                {website !== null && (
                                    <a href={website} target="_blank">
                                        {website.split('/')[2]}
                                    </a>
                                )}
                            </div>
                            <div className={cx('info-item2')}>
                                <label>Ng??nh ngh???: </label>
                                <p>{career.name}</p>
                            </div>
                        </div>
                        <div className={cx('right')}>
                            {companyName !== null && <h1 className={cx('company-name')}>{companyName}</h1>}
                            {companyName === null && <p>ch??a c?? th??ng tin c??ng ty</p>}
                            <p>{companyIntro}</p>
                        </div>
                    </div>
                </div>
                <div className={cx('feedback')}>
                    <Feedback userId={account.userId} />
                </div>
            </div>
            {showBasicInfo && (
                <BasicPopup recruiter={recruiter} callback={handleCallBack} onclose={() => setShowBasicInfo(false)} />
            )}
            {showCompanyInfo && (
                <CompanyInfoPopup
                    companyInfo={recruiter}
                    callback={handleCallCompanyInfo}
                    onclose={() => setShowCompanyInfo(false)}
                />
            )}
        </div>
    );
};

export default Profile;
