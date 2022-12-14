import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Popconfirm, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCakeCandles,
    faClipboardUser,
    faEnvelope,
    faFileLines,
    faLocationDot,
    faPhone,
    faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';

import * as recruiterPostManagementServices from '../../../services/recruiterPostManagementServices';
import images from '../../../assets/images';
import * as firebase from '../../../firebase/firebase';
import Feedback from './Feedback';
import WorkExperiment from './WorkExperiment';
import EducationItem from './EducationItem';
import Image from '../../../components/Image';
import styles from './ViewDetailFreelancer.module.scss';

const cx = classNames.bind(styles);
const openNotificationWithIcon = (type) => {
    notification[type]({
        message: 'Thông báo',
        description: 'Tài khoản không còn đủ số dư. Vui lòng nạp thêm tiền',
    });
};
function ViewDetailFreelancer() {
    const imgRef = useRef();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const accountBalance = useSelector((state) => state.accountBalance);
    const isMemberShip = useSelector((state) => state.isMemberShip);
    const [searchParams, setSearchParams] = useSearchParams();
    const [freelancerId, setFreelancerId] = useState(searchParams.get('id'));
    const [fullName, setFullName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [subCareer, setSubCareer] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [avatar, setAvatar] = useState('');
    const [cv, setCv] = useState('');
    const [cvUrl, setCvUrl] = useState('#');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [workExps, setWorkExps] = useState([]);
    const [gender, setGender] = useState('Nam');
    const [image, setImage] = useState(images.defaultAvatar);
    const [buyService, setBuyService] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const text = 'Phí xem thông tin là ' + account.feeViewProfile + '$';
    const [isValidFreelancer, setIsValidFreelancer] = useState(true);

    const fetchApi = async () => {
        const result = await recruiterPostManagementServices.getProfileFreelancer(freelancerId, account.userId);
        console.log(result);
        if (result !== undefined && result !== '' && result !== null) {
            setFullName(result.fullName);
            setBirthdate(result.birthDate);
            setSubCareer(result.subCareer);
            setPhone(result.phone);
            setEmail(result.email);
            setAddress(result.address);
            setCity(result.city);
            setPrice(result.costPerHour);
            setDescription(result.description);
            setGenderBy(result.gender);
            setIsApplied(result.isApplied);
            if (result.educations !== null) {
                setEducations(result.educations);
            }
            if (result.skills !== null) {
                setSkills(result.skills);
            }
            if (result.workExps !== null) {
                setWorkExps(result.workExps);
            }
            if (result.cv !== null) {
                setCv(result.cv);
            }
            if (result.avatar !== null) {
                setAvatar(result.avatar);
            }
        } else {
            setIsValidFreelancer(false);
        }
    };
    const updateAccountBalanceApi = async () => {
        const result = await recruiterPostManagementServices.updateAccountBalance(
            account.userId,
            account.feeViewProfile,
        );
        if (result) {
            setBuyService(true);
            dispatch({ type: 'set', accountBalance: accountBalance - account.feeViewProfile });
        }
    };
    useEffect(() => {
        fetchApi();
    }, []);
    useEffect(() => {
        console.log(avatar);
        if (avatar !== '') firebase.downloadFile(freelancerId, 'avatar', avatar, setImage);
    }, [avatar]);
    useEffect(() => {
        if (cv !== '') firebase.downloadFile(freelancerId, 'cv', cv, setCvUrl);
    }, [cv]);
    const setGenderBy = (gender) => {
        if (gender === true) {
            setGender('Nam');
        } else if (gender === false) {
            setGender('Nữ');
        }
    };
    const handleSubmit = () => {
        if (accountBalance - account.feeViewProfile > 0) {
            updateAccountBalanceApi();
        } else {
            openNotificationWithIcon('warning');
        }
    };
    const handleOnDeleteEducation = (id) => {};
    const handleOnEditEducation = (education) => {};
    const handleOnEditWorkExp = (workExp) => {};
    const handleOnDeleteWorkExp = (id) => {};
    return (
        <div className={cx('wrapper')}>
            {isValidFreelancer ? (
                <div className={cx('container')}>
                    <div className={cx('profile')}>
                        <div className={cx('profile-basic')}>
                            <div className={cx('avatar')}>
                                <div className={cx('avatar-container')}>
                                    <div className={cx('avatar-img')}>
                                        <Image src={image} alt="avatar" ref={imgRef} />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('info-left')}>
                                    <div className={cx('info-name')}>
                                        <p>{fullName}</p>
                                    </div>
                                    <div className={cx('info-item')}>
                                        <FontAwesomeIcon icon={faVenusMars} />
                                        <p>{gender}</p>
                                    </div>
                                    <div className={cx('info-item')}>
                                        <FontAwesomeIcon icon={faCakeCandles} />
                                        <p>{birthdate}</p>
                                    </div>
                                    <div className={cx('info-item')}>
                                        <FontAwesomeIcon icon={faClipboardUser} />
                                        <p>{subCareer}</p>
                                    </div>
                                </div>
                                <div className={cx('info-right')}>
                                    <div className={cx('info-space')}></div>
                                    {(isApplied || isMemberShip || buyService) && (
                                        <>
                                            <div className={cx('info-item')}>
                                                <FontAwesomeIcon icon={faPhone} />
                                                <p>{phone}</p>
                                            </div>
                                            <div className={cx('info-item')}>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                                <p>{email}</p>
                                            </div>
                                        </>
                                    )}
                                    {!isApplied && !isMemberShip && !buyService && (
                                        <>
                                            <div className={cx('info-item')}>
                                                <FontAwesomeIcon icon={faPhone} />
                                                <p>**********</p>
                                            </div>
                                            <div className={cx('info-item')}>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                                <p>***************</p>
                                            </div>
                                        </>
                                    )}

                                    <div className={cx('info-item')}>
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        <p>
                                            {address} - {city}
                                        </p>
                                    </div>
                                </div>
                                {!isApplied && !isMemberShip && !buyService && (
                                    <div>
                                        <Popconfirm
                                            placement="top"
                                            title={text}
                                            onConfirm={handleSubmit}
                                            okText="Xem thông tin"
                                            cancelText="Hủy"
                                        >
                                            <Button type="primary" size="large">
                                                Thông tin liên hệ
                                            </Button>
                                        </Popconfirm>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={cx('profile-complicate')}>
                            <div className={cx('complicate-left')}>
                                <div className={cx('educations')}>
                                    <div className={cx('title')}>
                                        <p>Giáo dục</p>
                                    </div>
                                    {educations.map((education, index) => (
                                        <EducationItem
                                            education={education}
                                            key={index}
                                            onEdit={handleOnEditEducation}
                                            onDelete={handleOnDeleteEducation}
                                        />
                                    ))}
                                </div>
                                <div className={cx('skills')}>
                                    <div className={cx('title')}>
                                        <p>Kỹ năng</p>
                                    </div>
                                    {skills.map((skill) => (
                                        <div className={cx('skill')} key={skill.id}>
                                            <p>{skill.name}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className={cx('cv')}>
                                    <div className={cx('cv-title')}>
                                        <p>CV</p>
                                    </div>
                                    <div className={cx('cv-content')}>
                                        <div className={cx('cv-left')}>
                                            <FontAwesomeIcon icon={faFileLines} />
                                        </div>
                                        {cv !== '' && (
                                            <div className={cx('cv-right')}>
                                                <a href={cvUrl}>Xem CV</a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('complicate-right')}>
                                <div className={cx('complicate-description')}>
                                    <div className={cx('description-header')}>
                                        <div className={cx('title', 'font-size')}>
                                            <p>Giới thiệu</p>
                                        </div>
                                        <div className={cx('title')}>
                                            <p>{new Intl.NumberFormat('de-DE').format(price)} VND/hr</p>
                                        </div>
                                    </div>
                                    <div className={cx('content')}>
                                        <p>{description}</p>
                                    </div>
                                </div>
                                <div className={cx('complicate-workExp')}>
                                    <div className={cx('title', 'font-size')}>
                                        <p>Kinh nghiệm</p>
                                    </div>
                                    {workExps.map((workExp, index) => (
                                        <WorkExperiment
                                            workExp={workExp}
                                            key={index}
                                            onEdit={handleOnEditWorkExp}
                                            onDelete={handleOnDeleteWorkExp}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={cx('feedback')}>
                            <Feedback userId={freelancerId} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('container')}>
                    <p className={cx('message-Invalid')}>Freelancer không tồn tại</p>
                </div>
            )}
        </div>
    );
}

export default ViewDetailFreelancer;
