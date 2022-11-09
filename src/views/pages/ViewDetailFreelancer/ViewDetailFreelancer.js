import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
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

import * as freelancerProfileServices from '../../../services/freelancerProfileServices';
import images from '../../../assets/images';
import * as firebase from '../../../firebase/firebase';
import Feedback from './Feedback';
import WorkExperiment from './WorkExperiment';
import EducationItem from './EducationItem';
import Image from '../../../components/Image';
import styles from './ViewDetailFreelancer.module.scss';

const cx = classNames.bind(styles);

function ViewDetailFreelancer() {
    const imgRef = useRef();
    const account = useSelector((state) => state.account);
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

    const fetchApi = async () => {
        const result = await freelancerProfileServices.getProfileFreelancer(freelancerId);
        console.log(result);
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

    const handleOnDeleteEducation = (id) => {};
    const handleOnEditEducation = (education) => {};
    const handleOnEditWorkExp = (workExp) => {};
    const handleOnDeleteWorkExp = (id) => {};
    return (
        <div className={cx('wrapper')}>
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
                                {/* <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <p>{phone}</p>
                                </div>
                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <p>{email}</p>
                                </div> */}
                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <p>**********</p>
                                </div>
                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <p>***************</p>
                                </div>

                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    <p>
                                        {address} - {city}
                                    </p>
                                </div>
                            </div>
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
                                            <a href={cvUrl}>{cv}</a>
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
                                        <p>${price} VND/hr</p>
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
        </div>
    );
}

export default ViewDetailFreelancer;
