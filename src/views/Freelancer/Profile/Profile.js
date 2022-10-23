import PropTypes from 'prop-types';
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
import { ref, getDownloadURL, listAll } from 'firebase/storage';

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
import images from '../../../assets/images';
import Image from '../../../components/Image';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);
const Profile = ({ freelancerId }) => {
    const freelancer = {
        id: '1',
        gender: '1',
        phone: '0337177679',
        fullName: 'Nguyễn Hữu Tuyên',
        address: 'SN02/07 ngõ 18 Tân Xã - Thạch Thất',
        city: 'Hà Nội',
        country: 'Việt Nam',
        skills: [
            { id: 1, name: 'Java' },
            { id: 2, name: 'SQL' },
            { id: 3, name: 'C++' },
        ],
        costPerHour: '200.000',
        email: 'congbv@fpt.edu.vn',
        description:
            'Tôi là một lập trình viên tiềm năng, hãy tuyển tôi,tôi có kĩ năng làm việc trong nhiều tập đoàn lớn, với hoài bão và ý chí, có kiến thức về lập trình backend và các thể loại khác',
        cv: 'tuyen.pdf',
        educations: [
            {
                id: '1',
                university: 'Đại học FPT',
                major: 'Kỹ thuật phần mềm',
                level: 'Cử nhân',
                from: '2018',
                to: '2022',
            },
            {
                id: '2',
                university: 'Đại học Kinh Công',
                major: 'Thiết kế đồ họa',
                level: 'Kỹ sư',
                from: '2018',
                to: '2022',
            },
        ],
        workExps: [
            {
                id: '1',
                companyName: 'FPT Software',
                position: 'Intern',
                from: '2016',
                to: '2018',
                description: 'Tôi triển khai làm front-end sản phẩm website giới thiệu',
            },
            {
                id: '2',
                companyName: 'FPT Software',
                position: 'Intern',
                from: '2016',
                to: '2018',
                description: 'Tôi triển khai làm front-end sản phẩm website giới thiệu',
            },
        ],
        star: '5',
        birthdate: '15-10-2022',
        subCareer: 'Lập Trình viên',
    };
    const imgRef = useRef();
    const [fullName, setFullName] = useState();
    const [birthdate, setBirthdate] = useState();
    const [subCareer, setSubCareer] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
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
    const [image, setImage] = useState('');
    const handleShowBasicInfo = () => {
        setShowBasicInfo(true);
    };
    const downloadFile = async (userId, type) => {
        const ImageService = ref(firebase.storage, `${userId}/${type}`);
        await listAll(ImageService)
            .then((res) => {
                res.items.forEach(async (itemRef) => {
                    await getDownloadURL(ref(firebase.storage, itemRef._location.path_)).then((url) => {
                        console.log(url);
                        imgRef.current.src = url;
                    });
                });
            })
            .catch((error) => {
                console.log('Lỗi');
            });
    };
    useEffect(() => {
        setFullName(freelancer.fullName);
        setBirthdate(freelancer.birthdate);
        setSubCareer(freelancer.subCareer);
        setPhone(freelancer.phone);
        setEmail(freelancer.email);
        setAddress(freelancer.address);
        setCity(freelancer.city);
        setPrice(freelancer.costPerHour);
        setDescription(freelancer.description);
        setGenderBy(freelancer.gender);
        setEducations(freelancer.educations);
        setSkills(freelancer.skills);
        setWorkExps(freelancer.workExps);
        downloadFile(freelancer.id, 'avatar');
        //firebase.downloadFile(freelancer.id, 'avatar', imgRef.current.src);
    }, []);
    const setGenderBy = (gender) => {
        if (gender === '1') {
            setGender('Nam');
        } else if (gender === '0') {
            setGender('Nữ');
        } else {
            setGender('Khác');
        }
    };
    const handleCallBack = (freelance) => {
        setShowBasicInfo(false);
        console.log(freelance);
        setFullName(freelance.fullName);
        setBirthdate(freelance.birthdate);
        setSubCareer(freelance.subCareer);
        setPhone(freelance.phone);
        setEmail(freelance.email);
        setAddress(freelance.address);
        setCity(freelance.city);
        setGenderBy(freelance.gender);
    };
    const handleCallBackEducation = (education) => {
        setShowEducation(false);
        const index = educations.findIndex((edu) => edu.id === education.id);
        setEducations((pre) => {
            if (index > -1) {
                pre[index] = education;
                return [...pre];
            } else return [...pre, education];
        });
    };
    const handleCallBackWorkExp = (workExp) => {
        setShowWorkEpx(false);
        const index = workExps.findIndex((work) => work.id === workExp.id);
        setWorkExps((pre) => {
            if (index > -1) {
                pre[index] = workExp;
                return [...pre];
            } else return [...pre, workExp];
        });
    };
    const handleOnDeleteEducation = (id) => {
        const index = educations.findIndex((edu) => edu.id === id);
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
        console.log(skills);
        setSkills((prev) => {
            return [...prev, ...skills];
        });
    };
    const handleDeleteSkill = (skill) => {
        setSkills((prev) => {
            return prev.filter((s) => s.id !== skill.id);
        });
    };
    const handleCallBackDescription = (description) => {
        setShowDescription(false);
        setDescription(description);
    };
    const handleCallBackPrice = (price) => {
        setShowPrice(false);
        setPrice(price);
    };
    const handleOnEditWorkExp = (workExp) => {
        setShowWorkEpx(true);
        setWorkExp(workExp);
    };
    const handleOnDeleteWorkExp = (id) => {
        const index = workExps.findIndex((work) => work.id === id);
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
                                    <label htmlFor="myfile">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </label>
                                    <input
                                        type="file"
                                        id="myfile"
                                        name="myfile"
                                        onChange={(e) => {
                                            console.log(e.target.files[0]);
                                            firebase.upLoadFile(freelancer.id, 'avatar', e.target.files[0]);
                                            previewFile();
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
                                    <input type="file" id="myfile" name="myfile"></input>
                                </div>
                                <div className={cx('cv-content')}>
                                    <div className={cx('cv-left')}>
                                        <FontAwesomeIcon icon={faFileLines} />
                                    </div>
                                    <div className={cx('cv-right')}>
                                        <p>{freelancer.cv}</p>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </div>
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
                        <Feedback userId="1" />
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
                <SkillPopup userID={freelancer.id} callback={handleCallBackSkill} onclose={() => setShowSkill(false)} />
            )}
            {showDescription && (
                <DescriptionPopup
                    description={freelancer.description}
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
Profile.propTypes = {
    freelancerId: PropTypes.string.isRequired,
};
export default Profile;
