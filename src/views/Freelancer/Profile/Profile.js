import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCakeCandles,
    faCircleMinus,
    faClipboardUser,
    faEnvelope,
    faFileLines,
    faLocationDot,
    faPenToSquare,
    faPhone,
    faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { notification } from 'antd';
import { useSelector } from 'react-redux';

import * as freelancerProfileServices from '../../../services/freelancerProfileServices';
import images from '../../../assets/images';
import * as firebase from '../../../firebase/firebase';
import WorkExpPopup from './WorkExpPopup';
import PricePopup from './PricePopup';
import DescriptionPopup from './DescriptionPopup';
import SkillPopup from './SkillPopup';
import EducationPopup from './EducationPopup';
import BasicPopup from './BasicPopup';
import Feedback from './Feedback';
import WorkExperiment from './WorkExperiment';
import EducationItem from './EducationItem';
import Image from '../../../components/Image';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);
const openNotificationWithIcon = (type) => {
    notification[type]({
        placement: 'top',
        message: `Không hỗ trợ định dạng file`,
        description: 'Vui lòng chọn file png hoặc jpg',
    });
};
const Profile = () => {
    const imgRef = useRef();
    const account = useSelector((state) => state.account);
    const [freelancer, setFreelancer] = useState({});
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
    const [showBasicInfo, setShowBasicInfo] = useState(false);
    const [showEducation, setShowEducation] = useState(false);
    const [showPrice, setShowPrice] = useState(false);
    const [price, setPrice] = useState('');
    const [showDescription, setShowDescription] = useState(false);
    const [description, setDescription] = useState('');
    const [education, setEducation] = useState({});
    const [educations, setEducations] = useState([]);
    const [showSkill, setShowSkill] = useState(false);
    const [skills, setSkills] = useState([]);
    const [showWorkEpx, setShowWorkEpx] = useState(false);
    const [workExp, setWorkExp] = useState({});
    const [workExps, setWorkExps] = useState([]);
    const [gender, setGender] = useState('Nam');
    const [image, setImage] = useState(images.defaultAvatar);
    const handleShowBasicInfo = () => {
        setShowBasicInfo(true);
    };
    const fetchApi = async () => {
        const result = await freelancerProfileServices.getProfileFreelancer(account.userId);
        console.log(result);
        setFreelancer(result);
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
    const editPopupApi = async (freelancer) => {
        const result = await freelancerProfileServices.editByPopup(freelancer);
        console.log(result);
    };
    const addSkillApi = async (skill) => {
        const result = await freelancerProfileServices.addSkill(account.userId, skill);
        console.log(result);
    };
    const deleteSkillApi = async (skill) => {
        const result = await freelancerProfileServices.deleteSkill(account.userId, skill);
        console.log(result);
    };
    const addEducationApi = async (education) => {
        const result = await freelancerProfileServices.addEducation(account.userId, education);
        console.log(result);
        fetchApi();
    };
    const updateEducationApi = async (education) => {
        const result = await freelancerProfileServices.updateEducation(education);
        console.log(result);
    };
    const deleteEducationApi = async (id) => {
        const result = await freelancerProfileServices.deleteEducation(id);
        console.log(result);
    };
    const addWorkExpApi = async (workExp) => {
        const result = await freelancerProfileServices.addWorkExp(account.userId, workExp);
        console.log(result);
        fetchApi();
    };
    const updateWorkExpApi = async (workExp) => {
        const result = await freelancerProfileServices.updateWorkExp(workExp);
        console.log(result);
    };
    const deleteWorkExpApi = async (id) => {
        const result = await freelancerProfileServices.deleteWorkExp(id);
        console.log(result);
    };
    const editByFieldApi = async (fieldName, value) => {
        const result = await freelancerProfileServices.editByField(account.userId, fieldName, value);
        console.log(result);
    };
    useEffect(() => {
        fetchApi();
    }, []);
    useEffect(() => {
        console.log(avatar);
        if (avatar !== '') firebase.downloadFile(account.userId, 'avatar', avatar, setImage);
    }, [avatar]);
    useEffect(() => {
        if (cv !== '') firebase.downloadFile(account.userId, 'cv', cv, setCvUrl);
    }, [cv]);
    const setGenderBy = (gender) => {
        if (gender === true) {
            setGender('Nam');
        } else if (gender === false) {
            setGender('Nữ');
        }
    };
    const handleCallBack = (freelance) => {
        setShowBasicInfo(false);
        setFullName(freelance.fullName);
        setBirthdate(freelance.birthdayFormat);
        setSubCareer(freelance.subCareerName);
        setPhone(freelance.phone);
        setEmail(freelance.email);
        setAddress(freelance.address);
        setCity(freelance.city);
        setGenderBy(freelance.gender);
        freelancer.fullName = freelance.fullName;
        freelancer.birthDate = freelance.birthdayFormat;
        freelancer.gender = freelance.gender;
        freelancer.phone = freelance.phone;
        freelancer.address = freelance.address;
        freelancer.city = freelance.city;
        freelancer.country = freelance.country;
        freelancer.subCareer = freelance.subCareerName;
        freelancer.subCareerId = freelance.subCareer;

        editPopupApi(freelance);
    };
    const handleCallBackEducation = (education) => {
        setShowEducation(false);
        const index = educations.findIndex((edu) => edu.id === education.id);
        setEducations((pre) => {
            if (index > -1) {
                pre[index] = education;
                updateEducationApi(education);
                return [...pre];
            } else {
                console.log(education);
                addEducationApi(education);
                return [...pre, education];
            }
        });
    };
    const handleCallBackWorkExp = (workExp) => {
        setShowWorkEpx(false);
        const index = workExps.findIndex((work) => work.id === workExp.id);
        setWorkExps((pre) => {
            if (index > -1) {
                updateWorkExpApi(workExp);
                pre[index] = workExp;
                return [...pre];
            } else {
                addWorkExpApi(workExp);
                return [...pre, workExp];
            }
        });
    };
    const handleOnDeleteEducation = (id) => {
        const index = educations.findIndex((edu) => edu.id === id);
        deleteEducationApi(id);
        setEducations((pre) => {
            pre.splice(index, 1);
            return [...pre];
        });
    };
    const handleOnEditEducation = (education) => {
        setShowEducation(true);
        setEducation(education);
    };
    const handleCallBackSkill = (skills) => {
        setShowSkill(false);
        addSkillApi(skills);
        setSkills((prev) => {
            return [...prev, ...skills];
        });
    };
    const handleDeleteSkill = (skill) => {
        console.log(skill);
        deleteSkillApi(skill.id);
        setSkills((prev) => {
            return prev.filter((s) => s.id !== skill.id);
        });
    };
    const handleCallBackDescription = (description) => {
        setShowDescription(false);
        setDescription(description);
        editByFieldApi('description', description);
    };
    const handleCallBackPrice = (price) => {
        setShowPrice(false);
        setPrice(price);
        editByFieldApi('costPerHour', price);
    };
    const handleOnEditWorkExp = (workExp) => {
        console.log(workExp);
        setShowWorkEpx(true);
        setWorkExp(workExp);
    };
    const handleOnDeleteWorkExp = (id) => {
        const index = workExps.findIndex((work) => work.id === id);
        console.log(id);
        deleteWorkExpApi(id);
        setWorkExps((pre) => {
            pre.splice(index, 1);
            return [...pre];
        });
    };
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
    const handleDeleteCV = () => {
        editByFieldApi('cv', '');
        setCv('');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('greeting')}>
                    <p className={cx('greeting-title')}>Chào mừng bạn đến với lanceddy!</p>
                    <p className={cx('greeting-content')}>
                        Vui lòng tạo hồ sơ để tham gia tìm việc freelance trên lanceddy. Nhà tuyển dụng sẽ nhìn vào hồ
                        sơ để đưa ra quyết định khi bạn ứng cử vào công việc của họ. Vì vậy hãy dành chút thời gian để
                        điền đầy đủ thông tin trong form bên dưới
                    </p>
                </div>
                <div className={cx('profile')}>
                    <div className={cx('profile-basic')}>
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
                                            if (
                                                e.target.files[0].name.endsWith('.png') ||
                                                e.target.files[0].name.endsWith('.jpg')
                                            ) {
                                                editByFieldApi('avatar', e.target.files[0].name);
                                                firebase.upLoadFile(account.userId, 'avatar', e.target.files[0]);
                                                previewFile();
                                            } else {
                                                openNotificationWithIcon('warning');
                                            }
                                        }}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('info-left')}>
                                <div className={cx('info-name')}>
                                    <p>{fullName}</p>
                                    <FontAwesomeIcon icon={faPenToSquare} onClick={handleShowBasicInfo} />
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
                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <p>{phone}</p>
                                </div>
                                <div className={cx('info-item')}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <p>{email}</p>
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
                                    <FontAwesomeIcon
                                        icon={faSquarePlus}
                                        onClick={() => {
                                            setEducation({});
                                            setShowEducation(true);
                                        }}
                                    />
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
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        onClick={() => {
                                            setShowSkill(true);
                                        }}
                                    />
                                </div>
                                {skills.map((skill) => (
                                    <div className={cx('skill')} key={skill.id}>
                                        <p>{skill.name}</p>
                                        <FontAwesomeIcon
                                            icon={faCircleMinus}
                                            onClick={() => handleDeleteSkill(skill)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className={cx('cv')}>
                                <div className={cx('cv-title')}>
                                    <p>CV</p>
                                    <label htmlFor="myfile">
                                        <FontAwesomeIcon icon={faSquarePlus} />
                                    </label>
                                    <input
                                        type="file"
                                        id="myfile"
                                        name="myfile"
                                        onChange={(e) => {
                                            console.log(e.target.files[0]);
                                            firebase.upLoadFile(account.userId, 'cv', e.target.files[0]);
                                            setCv(e.target.files[0].name);
                                            editByFieldApi('cv', e.target.files[0].name);
                                        }}
                                    ></input>
                                </div>
                                <div className={cx('cv-content')}>
                                    <div className={cx('cv-left')}>
                                        <FontAwesomeIcon icon={faFileLines} />
                                    </div>
                                    {cv !== '' && (
                                        <div className={cx('cv-right')}>
                                            <a href={cvUrl} target="_blank">
                                                {cv}
                                            </a>
                                            <FontAwesomeIcon icon={faTrashCan} onClick={handleDeleteCV} />
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
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            onClick={() => {
                                                setShowDescription(true);
                                            }}
                                        />
                                    </div>
                                    <div className={cx('title')}>
                                        <p>${price} VND/hr</p>
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            onClick={() => {
                                                setShowPrice(true);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={cx('content')}>
                                    <p>{description}</p>
                                </div>
                            </div>
                            <div className={cx('complicate-workExp')}>
                                <div className={cx('title', 'font-size')}>
                                    <p>Kinh nghiệm</p>
                                    <FontAwesomeIcon
                                        icon={faSquarePlus}
                                        onClick={() => {
                                            setWorkExp({});
                                            setShowWorkEpx(true);
                                        }}
                                    />
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
                        <Feedback userId={account.userId} />
                    </div>
                </div>
            </div>
            {showBasicInfo && (
                <BasicPopup freelancer={freelancer} callback={handleCallBack} onclose={() => setShowBasicInfo(false)} />
            )}
            {showEducation && (
                <EducationPopup
                    education={education}
                    callback={handleCallBackEducation}
                    onclose={() => setShowEducation(false)}
                />
            )}
            {showSkill && (
                <SkillPopup
                    userID={account.userId}
                    callback={handleCallBackSkill}
                    onclose={() => setShowSkill(false)}
                />
            )}
            {showDescription && (
                <DescriptionPopup
                    description={description}
                    callback={handleCallBackDescription}
                    onclose={() => setShowDescription(false)}
                />
            )}
            {showPrice && (
                <PricePopup price={price} callback={handleCallBackPrice} onclose={() => setShowPrice(false)} />
            )}
            {showWorkEpx && (
                <WorkExpPopup
                    workExp={workExp}
                    callback={handleCallBackWorkExp}
                    onclose={() => setShowWorkEpx(false)}
                />
            )}
        </div>
    );
};
export default Profile;
